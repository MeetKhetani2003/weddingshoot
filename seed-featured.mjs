// seed-featured.mjs
// Uploads the 8 default featured gallery photos to the DB.
// Run with: node seed-featured.mjs
// The Next.js dev server must be running on localhost:3000

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL  = "http://localhost:3000";
const COOKIE    = "admin_token=EternalAdmin@2026";

// The 8 original hardcoded items from HomeImageGallery.tsx
const ITEMS = [
  { file: "DSC_0603.JPG",                       title: "The Royal Udaipur Vows",     categoryLabel: "Wedding",        location: "Jagmandir Island Palace, Udaipur", orientation: "vertical" },
  { file: "DSC_0635 copy.jpg",                   title: "Goa Sunset Pheras",          categoryLabel: "Destination",    location: "Taj Exotica, Goa",                 orientation: "vertical" },
  { file: "DSC_0640.jpg",                        title: "The Redveil Editorial",      categoryLabel: "Bridal Portrait", location: "Studio Curation",                  orientation: "vertical" },
  { file: "DSC_0724.jpg",                        title: "A Thousand Roses Decor",     categoryLabel: "Decor & Design", location: "The Oberoi, New Delhi",            orientation: "horizontal" },
  { file: "DSC-1288-Original Final copy.jpg",    title: "Golden Hour Maternity",      categoryLabel: "Maternity",      location: "TEB Private Studio",               orientation: "vertical" },
  { file: "1A7A1555.JPG",                        title: "Newborn Pure Moments",       categoryLabel: "Newborn",        location: "Certified Safe Posing",            orientation: "horizontal" },
  { file: "DSC_1679.JPG",                        title: "Eternal Royal Heritage",     categoryLabel: "Wedding",        location: "Udaipur Palace",                   orientation: "horizontal" },
  { file: "DSC_1725.JPG",                        title: "Candlelit Evening Reception", categoryLabel: "Decor",          location: "The Leela Palace, Jaipur",         orientation: "horizontal" },
];

async function uploadAndCreate(item, order) {
  const absPath = path.join(__dirname, "public", item.file);
  if (!fs.existsSync(absPath)) {
    console.log(`  ⚠ File not found: ${item.file} — skipped`);
    return false;
  }

  const buffer = fs.readFileSync(absPath);
  const ext = path.extname(item.file).toLowerCase();
  const mime = ext === ".png" ? "image/png" : "image/jpeg";

  // 1. Upload image to GridFS
  const formData = new FormData();
  formData.append("image", new Blob([buffer], { type: mime }), path.basename(item.file));

  const uploadRes = await fetch(`${BASE_URL}/api/admin/upload`, {
    method: "POST",
    headers: { Cookie: COOKIE },
    body: formData,
  });
  if (!uploadRes.ok) {
    const t = await uploadRes.text();
    console.log(`  ✗ Upload failed for "${item.title}": ${uploadRes.status} — ${t}`);
    return false;
  }
  const { imageId } = await uploadRes.json();

  // 2. Create featured gallery item via the featured API
  const createForm = new FormData();
  createForm.append("title", item.title);
  createForm.append("categoryLabel", item.categoryLabel);
  createForm.append("location", item.location);
  createForm.append("orientation", item.orientation);
  createForm.append("image", new Blob([buffer], { type: mime }), path.basename(item.file));

  const createRes = await fetch(`${BASE_URL}/api/admin/featured`, {
    method: "POST",
    headers: { Cookie: COOKIE },
    body: createForm,
  });
  if (!createRes.ok) {
    const t = await createRes.text();
    console.log(`  ✗ Create failed for "${item.title}": ${createRes.status} — ${t}`);
    return false;
  }

  console.log(`  ✓ "${item.title}" — ${item.categoryLabel} (${item.orientation})`);
  return true;
}

async function main() {
  console.log("🖼️  Seeding Featured Gallery with 8 default photos...\n");

  let success = 0;
  for (let i = 0; i < ITEMS.length; i++) {
    const ok = await uploadAndCreate(ITEMS[i], i);
    if (ok) success++;
  }

  console.log(`\n✅ Done! ${success}/${ITEMS.length} items added to Featured Gallery.`);
  console.log("👉 Go to Admin → Featured Gallery to verify and reorder.");
}

main().catch((err) => {
  console.error("\n❌ Error:", err.message);
  process.exit(1);
});
