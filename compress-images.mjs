import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public');

const allFiles = fs.readdirSync(publicDir);
const imageFiles = allFiles.filter(f => 
  (f.toLowerCase().endsWith('.jpg') || 
   f.toLowerCase().endsWith('.jpeg') || 
   f.toLowerCase().endsWith('.png')) && 
  f !== 'only name.PNG' && 
  f !== 'teb logo.png'
);

console.log(`Starting compression for ${imageFiles.length} images...`);

async function processImages() {
  for (const file of imageFiles) {
    const filePath = path.join(publicDir, file);
    const tempPath = path.join(publicDir, `temp_${file}`);
    
    try {
      const stats = fs.statSync(filePath);
      // Only process files larger than 1MB
      if (stats.size > 1024 * 1024) {
        console.log(`Compressing ${file} (${(stats.size / 1024 / 1024).toFixed(2)} MB)...`);
        
        await sharp(filePath)
          .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 75, force: false }) // Use JPEG compression if it's a jpeg
          .png({ quality: 75, force: false })
          .toFile(tempPath);
          
        // Replace original with compressed
        fs.unlinkSync(filePath);
        fs.renameSync(tempPath, filePath);
      }
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }
    }
  }
  console.log('Finished compressing images.');
}

processImages();
