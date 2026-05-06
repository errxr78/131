import fs from 'fs';
import path from 'path';

const images = [
  '/images/product-1.jpg',
  '/images/product-2.jpeg',
  '/images/product-3.jpeg',
  '/images/product-4.jpg',
  '/images/product-5.jpg',
  '/images/product-6.jpg',
  '/images/product-7.jpg',
  '/images/product-8.jpg',
  '/images/product-9.jpg',
];

const filesToProcess = [
  './src/lib/products.ts',
  './src/app/page.tsx'
];

let imageIndex = 0;

function replaceUnsplash(content) {
  // Regex to match any https://images.unsplash.com/photo-... URL
  const regex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+\?w=\d+&q=\d+/g;
  
  return content.replace(regex, (match) => {
    const img = images[imageIndex % images.length];
    imageIndex++;
    return img;
  });
}

for (const file of filesToProcess) {
  const filePath = path.resolve(file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const newContent = replaceUnsplash(content);
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Replaced images in ${file}`);
  } else {
    console.log(`File not found: ${file}`);
  }
}
