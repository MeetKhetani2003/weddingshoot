import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import HomeConfig from "@/models/HomeConfig";

export async function GET() {
  try {
    await connectToDatabase();
    let config = await HomeConfig.findById("home");
    if (!config) {
      config = await HomeConfig.create({ _id: "home" });
    }
    return NextResponse.json(config);
  } catch (error) {
    console.error("Failed to fetch home config:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase();
    const data = await req.json();
    
    const config = await HomeConfig.findByIdAndUpdate(
      "home",
      { $set: data },
      { new: true, upsert: true }
    );
    
    return NextResponse.json(config);
  } catch (error) {
    console.error("Failed to update home config:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
