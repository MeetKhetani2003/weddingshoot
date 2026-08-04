import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import OurStoryConfig from "@/models/OurStoryConfig";

export async function GET() {
  try {
    await connectToDatabase();
    let config = await OurStoryConfig.findById("our-story");
    if (!config) {
      config = await OurStoryConfig.create({ _id: "our-story" });
    }
    return NextResponse.json(config);
  } catch (error) {
    console.error("Failed to fetch our story config:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase();
    const data = await req.json();
    
    const config = await OurStoryConfig.findByIdAndUpdate(
      "our-story",
      { $set: data },
      { new: true, upsert: true }
    );
    
    return NextResponse.json(config);
  } catch (error) {
    console.error("Failed to update our story config:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
