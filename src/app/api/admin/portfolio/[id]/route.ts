import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";
import { ObjectId } from "mongodb";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const { bucket } = await connectToDatabase();
    const item = await Portfolio.findById(id);
    
    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    // Delete image from GridFS
    try {
      if (ObjectId.isValid(item.imageId)) {
        await bucket.delete(new ObjectId(item.imageId));
      }
    } catch (e) {
      console.warn("Could not delete image from GridFS", e);
    }

    await Portfolio.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE portfolio error:", error);
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
