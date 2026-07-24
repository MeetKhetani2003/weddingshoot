import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Story from "@/models/Story";
import { Readable } from "stream";

export async function GET() {
  try {
    await connectToDatabase();
    const stories = await Story.find({}).sort({ createdAt: -1 });
    return NextResponse.json(stories);
  } catch (error) {
    console.error("GET stories error:", error);
    return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const date = formData.get("date") as string;
    const category = formData.get("category") as string;
    const bodyStr = formData.get("body") as string;
    const image = formData.get("image") as File;

    if (!title || !slug || !excerpt || !date || !category || !bodyStr || !image) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    let body = [];
    try {
      // Allow passing JSON string array or just newline separated
      if (bodyStr.startsWith('[')) {
        body = JSON.parse(bodyStr);
      } else {
        body = bodyStr.split('\n').filter(p => p.trim() !== '');
      }
    } catch {
      body = bodyStr.split('\n').filter(p => p.trim() !== '');
    }

    const { bucket } = await connectToDatabase();

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const stream = Readable.from(buffer);

    const uploadStream = bucket.openUploadStream(image.name, {
      contentType: image.type,
    });

    const imageId = uploadStream.id.toString();

    await new Promise((resolve, reject) => {
      stream.pipe(uploadStream)
        .on('error', reject)
        .on('finish', resolve);
    });

    const story = await Story.create({
      title,
      slug,
      excerpt,
      date,
      category,
      body,
      imageId
    });

    return NextResponse.json(story, { status: 201 });
  } catch (error) {
    console.error("POST story error:", error);
    return NextResponse.json({ error: "Failed to create story" }, { status: 500 });
  }
}
