import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Story from "@/models/Story";
import { ObjectId } from "mongodb";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const { bucket } = await connectToDatabase();
    const story = await Story.findById(id);
    
    if (!story) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    try {
      if (ObjectId.isValid(story.imageId)) {
        await bucket.delete(new ObjectId(story.imageId));
      }
    } catch (e) {
      console.warn("Could not delete image from GridFS", e);
    }

    await Story.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE story error:", error);
    return NextResponse.json({ error: "Failed to delete story" }, { status: 500 });
  }
}
