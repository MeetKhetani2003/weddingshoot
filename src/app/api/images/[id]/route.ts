import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    // Await params for Next 15 compatibility
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const { bucket } = await connectToDatabase();
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid image ID" }, { status: 400 });
    }

    const _id = new ObjectId(id);
    const files = await bucket.find({ _id }).toArray();
    
    if (files.length === 0) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    const file = files[0];
    const stream = bucket.openDownloadStream(_id);
    
    // Transform Node.js readable stream to Web ReadableStream
    const readableStream = new ReadableStream({
      start(controller) {
        stream.on('data', (chunk: any) => controller.enqueue(chunk));
        stream.on('end', () => controller.close());
        stream.on('error', (err: any) => controller.error(err));
      }
    });

    return new NextResponse(readableStream as any, {
      headers: {
        'Content-Type': file.metadata?.contentType || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });

  } catch (error) {
    console.error("Error fetching image:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
