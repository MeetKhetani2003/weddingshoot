import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import FeaturedGallery from "@/models/FeaturedGallery";
import { ObjectId } from "mongodb";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await params;
    const { bucket } = await connectToDatabase();
    const item = await FeaturedGallery.findById(id);

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    // Remove image from GridFS
    try {
      if (ObjectId.isValid(item.imageId)) {
        await bucket.delete(new ObjectId(item.imageId));
      }
    } catch (e) {
      console.warn("Could not delete image from GridFS", e);
    }

    await FeaturedGallery.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE featured gallery error:", error);
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    await connectToDatabase();
    const updated = await FeaturedGallery.findByIdAndUpdate(id, { $set: body }, { new: true });

    if (!updated) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH featured gallery error:", error);
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
  }
}
