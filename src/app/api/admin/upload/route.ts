import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Readable } from "stream";

export async function POST(req: NextRequest) {
  try {
    const { bucket } = await connectToDatabase();
    
    const formData = await req.formData();
    const image = formData.get("image") as File;
    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    
    return new Promise<NextResponse>((resolve) => {
      const uploadStream = bucket.openUploadStream(image.name, {
        contentType: image.type,
      });

      const readableStream = new Readable();
      readableStream.push(buffer);
      readableStream.push(null);

      readableStream.pipe(uploadStream)
        .on('error', (err: any) => {
          console.error("GridFS Upload Error:", err);
          resolve(NextResponse.json({ error: "Upload failed" }, { status: 500 }));
        })
        .on('finish', () => {
          resolve(NextResponse.json({ imageId: uploadStream.id.toString() }));
        });
    });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
