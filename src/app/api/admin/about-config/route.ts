import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import AboutConfig from "@/models/AboutConfig";

export async function GET() {
  try {
    await connectToDatabase();
    let config = await AboutConfig.findById("about");
    if (!config) {
      config = await AboutConfig.create({ _id: "about" });
    }
    return NextResponse.json(config);
  } catch (error) {
    console.error("Failed to fetch about config:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase();
    const data = await req.json();
    
    const config = await AboutConfig.findByIdAndUpdate(
      "about",
      { $set: data },
      { new: true, upsert: true }
    );
    
    return NextResponse.json(config);
  } catch (error) {
    console.error("Failed to update about config:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
