import { connectToDatabase } from "./src/lib/mongodb";
import Category from "./src/models/Category";
import Portfolio from "./src/models/Portfolio";
import Story from "./src/models/Story";
import { portfolio, journal } from "./src/lib/data";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function migrate() {
  const { conn, bucket } = await connectToDatabase();
  console.log("Connected to MongoDB");

  // Helper to upload image to GridFS
  async function uploadImage(imagePath: string): Promise<string | null> {
    // Remove leading slash if present
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    const fullPath = path.join(process.cwd(), "public", cleanPath);
    
    if (!fs.existsSync(fullPath)) {
      console.warn(`Image not found: ${fullPath}`);
      return null;
    }
    const filename = path.basename(cleanPath);
    const stream = fs.createReadStream(fullPath);
    const uploadStream = bucket.openUploadStream(filename);
    
    return new Promise((resolve, reject) => {
      stream.pipe(uploadStream)
        .on('error', reject)
        .on('finish', () => resolve(uploadStream.id.toString()));
    });
  }

  // Categories
  console.log("Extracting and creating categories...");
  const categoryNames = new Set([
    ...portfolio.map(p => p.tag),
    ...journal.map(j => j.category)
  ]);

  const categoryMap = new Map();
  for (const name of categoryNames) {
    if (!name) continue;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    let cat = await Category.findOne({ slug });
    if (!cat) {
      cat = await Category.create({ name, slug });
      console.log(`Created category: ${name}`);
    } else {
      console.log(`Category already exists: ${name}`);
    }
    categoryMap.set(name, cat._id);
  }

  // Portfolio
  console.log("Migrating portfolio items...");
  for (const p of portfolio) {
    if (!p.title || !p.image) continue;
    const existing = await Portfolio.findOne({ title: p.title });
    if (existing) {
      console.log(`Skipping portfolio item (already exists): ${p.title}`);
      continue;
    }

    const imageId = await uploadImage(p.image);
    if (!imageId) {
      console.log(`Skipping portfolio item due to missing image: ${p.title}`);
      continue;
    }

    await Portfolio.create({
      title: p.title,
      place: p.place || "Unknown Location",
      tag: p.tag || "Uncategorized",
      categoryId: categoryMap.get(p.tag),
      imageId
    });
    console.log(`Migrated portfolio: ${p.title}`);
  }

  // Journal (Stories)
  console.log("Migrating stories...");
  for (const j of journal) {
    if (!j.title || !j.image) continue;
    const existing = await Story.findOne({ slug: j.slug });
    if (existing) {
      console.log(`Skipping story (already exists): ${j.title}`);
      continue;
    }

    const imageId = await uploadImage(j.image);
    if (!imageId) {
      console.log(`Skipping story due to missing image: ${j.title}`);
      continue;
    }

    await Story.create({
      title: j.title,
      slug: j.slug,
      excerpt: j.excerpt,
      date: j.date,
      category: j.category,
      body: j.body,
      imageId
    });
    console.log(`Migrated story: ${j.title}`);
  }

  console.log("Migration complete");
  process.exit(0);
}

migrate().catch(console.error);
