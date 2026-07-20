import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');
const srcDir = path.join(process.cwd(), 'src');

const allFiles = fs.readdirSync(publicDir);
const imageFiles = allFiles.filter(f => 
  (f.toLowerCase().endsWith('.jpg') || 
   f.toLowerCase().endsWith('.jpeg') || 
   f.toLowerCase().endsWith('.png')) && 
  f !== 'only name.PNG' && 
  f !== 'teb logo.png' && 
  !f.includes('.svg')
);

let imgIndex = 0;
function getNextImage() {
  if (imgIndex >= imageFiles.length) {
    imgIndex = 0;
  }
  return `/${imageFiles[imgIndex++]}`;
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const updated = content.replace(/(["'`])\/images\/[^"'\`]+\.jpg\1/g, () => {
        return `"${getNextImage()}"`;
      });
      
      if (content !== updated) {
        fs.writeFileSync(fullPath, updated, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

walkDir(srcDir);
console.log('Finished updating all hardcoded image paths in src/');
