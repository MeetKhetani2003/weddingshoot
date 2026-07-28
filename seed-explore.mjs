// seed-explore.mjs
// Uploads the 4 service images from public/Explore photos/ into the DB
// and adds them as Explore Our World items in the home config.
// Run with: node seed-explore.mjs
// The Next.js dev server must be running on localhost:3000

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL  = "http://localhost:3000";

// The admin cookie value is just the password (see /api/login/route.ts)
const ADMIN_COOKIE = "admin_token=EternalAdmin@2026";

// Detected from the images:
// IMG_8440.PNG → "PHOTOGRAPHY"      → Wedding & Event Photography
// IMG_8441.PNG → "PLANNING"         → Wedding & Event Planning
// IMG_8442.PNG → "DECOR & DESIGN"   → Decor & Design
// IMG_8443.PNG → "ARTIST MANAGEMENT"→ Artist Management
const EXPLORE_ITEMS = [
  { file: "Explore photos/IMG_8440.PNG", label: "Photography",      href: "/portfolio?category=photography" },
  { file: "Explore photos/IMG_8441.PNG", label: "Planning",         href: "/portfolio?category=planning" },
  { file: "Explore photos/IMG_8442.PNG", label: "Decor & Design",   href: "/portfolio?category=decor" },
  { file: "Explore photos/IMG_8443.PNG", label: "Artist Management",href: "/portfolio?category=artist-management" },
];

async function uploadImage(filePath) {
  const absPath = path.join(__dirname, "public", filePath);
  const filename = path.basename(filePath);
  const buffer   = fs.readFileSync(absPath);

  const formData = new FormData();
  const blob     = new Blob([buffer], { type: "image/png" });
  formData.append("image", blob, filename);

  const res = await fetch(`${BASE_URL}/api/admin/upload`, {
    method: "POST",
    headers: { Cookie: ADMIN_COOKIE },
    body: formData,
  });

  const text = await res.text();
  if (!res.ok) throw new Error(`Upload failed for ${filename}: ${res.status} — ${text}`);

  const { imageId } = JSON.parse(text);
  return imageId;
}

async function main() {
  console.log("🚀 Seeding Explore Our World items...\n");

  // 1. Upload all images
  const uploaded = [];
  for (const item of EXPLORE_ITEMS) {
    process.stdout.write(`  Uploading "${item.label}"... `);
    try {
      const imageId = await uploadImage(item.file);
      uploaded.push({ ...item, imageId });
      console.log(`✓  imageId: ${imageId}`);
    } catch (err) {
      console.log(`✗  ${err.message}`);
    }
  }

  if (uploaded.length === 0) {
    console.error("\n❌ No images uploaded successfully.");
    process.exit(1);
  }

  // 2. Fetch current home config
  console.log("\n📦 Fetching home config...");
  const configRes = await fetch(`${BASE_URL}/api/admin/home-config`, {
    headers: { Cookie: ADMIN_COOKIE },
  });
  if (!configRes.ok) throw new Error(`Failed to fetch config: ${configRes.status}`);
  const config = await configRes.json();

  // 3. Merge — skip labels that already exist
  const existingLabels = new Set(
    (config.explore?.items || []).map((i) => i.label?.toLowerCase())
  );

  const newItems = uploaded
    .filter((item) => !existingLabels.has(item.label.toLowerCase()))
    .map((item) => ({
      label:       item.label,
      href:        item.href,
      imageId:     item.imageId,
      orientation: "vertical",   // all 4 are portrait images
    }));

  if (newItems.length === 0) {
    console.log("⚠️  All items already exist — nothing to add.");
    return;
  }

  const updatedConfig = {
    ...config,
    explore: {
      ...config.explore,
      items: [...(config.explore?.items || []), ...newItems],
    },
  };

  // 4. Save
  console.log(`💾 Saving ${newItems.length} new item(s)...`);
  const saveRes = await fetch(`${BASE_URL}/api/admin/home-config`, {
    method:  "PUT",
    headers: { "Content-Type": "application/json", Cookie: ADMIN_COOKIE },
    body:    JSON.stringify(updatedConfig),
  });
  if (!saveRes.ok) throw new Error(`Save failed: ${saveRes.status}`);

  console.log("\n✅ Done! Added:");
  newItems.forEach((i) => console.log(`   • ${i.label}  →  ${i.href}`));
  console.log("\n👉 Go to Admin → Homepage Settings to verify and reorder.");
}

main().catch((err) => {
  console.error("\n❌ Error:", err.message);
  process.exit(1);
});
