import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";
import { Readable } from "stream";
import Category from "@/models/Category"; // ensure model is registered

export async function GET() {
  try {
    await connectToDatabase();
    // Populate category to get the name if needed, but we also save 'tag'
    const items = await Portfolio.find({}).populate('categoryId').sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (error) {
    console.error("GET portfolio error:", error);
    return NextResponse.json({ error: "Failed to fetch portfolio items" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const place = formData.get("place") as string;
    const categoryId = formData.get("categoryId") as string;
    const image = formData.get("image") as File;

    if (!title || !place || !categoryId || !image) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const { bucket } = await connectToDatabase();

    // Get category name for the 'tag' field
    const category = await Category.findById(categoryId);
    const tag = category ? category.name : "Uncategorized";

    // Convert Web File to Node.js Readable stream
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

    const portfolioItem = await Portfolio.create({
      title,
      place,
      tag,
      categoryId,
      imageId
    });

    return NextResponse.json(portfolioItem, { status: 201 });
  } catch (error) {
    console.error("POST portfolio error:", error);
    return NextResponse.json({ error: "Failed to create portfolio item" }, { status: 500 });
  }
}
