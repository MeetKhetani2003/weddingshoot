import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import ThemeConfig from "@/models/ThemeConfig";

export async function GET() {
  try {
    await connectToDatabase();
    let config = await ThemeConfig.findById("theme").lean();
    
    if (!config) {
      config = await ThemeConfig.create({ _id: "theme" });
    }
    
    return NextResponse.json(config);
  } catch (error) {
    console.error("Error fetching theme config:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await connectToDatabase();
    
    const updatedConfig = await ThemeConfig.findByIdAndUpdate(
      "theme",
      { $set: data },
      { new: true, upsert: true }
    );
    
    return NextResponse.json(updatedConfig);
  } catch (error) {
    console.error("Error updating theme config:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
