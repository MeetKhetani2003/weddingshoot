import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import FeaturedGallery from "@/models/FeaturedGallery";
import { Readable } from "stream";

export async function GET() {
  try {
    await connectToDatabase();
    const items = await FeaturedGallery.find({}).sort({ order: 1, createdAt: 1 });
    return NextResponse.json(items);
  } catch (error) {
    console.error("GET featured gallery error:", error);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title         = formData.get("title") as string;
    const categoryLabel = formData.get("categoryLabel") as string;
    const location      = formData.get("location") as string;
    const orientation   = (formData.get("orientation") as string) || "auto";
    const image         = formData.get("image") as File;

    if (!title || !categoryLabel || !location || !image) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
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
      stream.pipe(uploadStream).on("error", reject).on("finish", resolve);
    });

    // Count existing to set order
    const count = await FeaturedGallery.countDocuments();
    const item = await FeaturedGallery.create({
      title, categoryLabel, location, imageId, orientation, order: count,
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("POST featured gallery error:", error);
    return NextResponse.json({ error: "Failed to create item" }, { status: 500 });
  }
}
