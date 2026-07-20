import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');
const dataFile = path.join(process.cwd(), 'src/lib/data.ts');

const allFiles = fs.readdirSync(publicDir);
const imageFiles = allFiles.filter(f => 
  (f.toLowerCase().endsWith('.jpg') || 
   f.toLowerCase().endsWith('.jpeg') || 
   f.toLowerCase().endsWith('.png')) && 
  f !== 'only name.PNG' && 
  f !== 'teb logo.png' && 
  !f.includes('.svg')
);

console.log(`Found ${imageFiles.length} images.`);

let dataContent = fs.readFileSync(dataFile, 'utf8');

// We have 69 images.
// We need images for:
// services: 8 items
// highlights: 13 items
// journal: 3 items
// portfolio: The rest!

let imgIndex = 0;
function getNextImage() {
  if (imgIndex >= imageFiles.length) {
    imgIndex = 0; // Wrap around if we run out, though we shouldn't for the first 24
  }
  return `/${imageFiles[imgIndex++]}`;
}

// 1. Replace images in services, highlights, journal
dataContent = dataContent.replace(/image:\s*"\/images\/[^"]+"/g, () => {
  return `image: "${getNextImage()}"`;
});

// Now we want to expand the portfolio.
// Let's find the portfolio array in the file.
const portfolioMatch = dataContent.match(/export const portfolio = \[\s*([\s\S]*?)\s*\];/);

if (portfolioMatch) {
  let newPortfolioItems = '';
  // Let's take the first item as a template
  const template = `{ title: "Wedding Celebration", place: "Luxury Destination", image: "IMG_URL", tag: "Wedding" }`;
  
  const remainingImages = imageFiles.slice(imgIndex);
  console.log(`Adding ${remainingImages.length} images to portfolio.`);
  
  const tags = ["Wedding", "Destination", "Photography", "Decor", "Films", "Maternity", "Newborn", "Family"];
  
  for (let i = 0; i < remainingImages.length; i++) {
    const img = `/${remainingImages[i]}`;
    const tag = tags[i % tags.length];
    newPortfolioItems += `  { title: "Beautiful Memory ${i + 1}", place: "Celebration", image: "${img}", tag: "${tag}" },\n`;
  }
  
  // Replace the entire portfolio array with the existing + the new ones
  const updatedPortfolio = `export const portfolio = [\n${portfolioMatch[1]},\n${newPortfolioItems}];`;
  
  dataContent = dataContent.replace(portfolioMatch[0], updatedPortfolio);
}

fs.writeFileSync(dataFile, dataContent, 'utf8');
console.log('Successfully updated data.ts with all images!');
