// Helper script to replace Unsplash URLs with picsum.photos
const fs = require('fs');

const filePath = 'c:\\Projects\\ofertiko\\frontend\\App.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace all Unsplash URLs with picsum.photos
// Pattern: https://images.unsplash.com/photo-XXXXX?...
let counter = 100; // Starting seed for variety
content = content.replace(/https:\/\/images\.unsplash\.com\/[^"]+/g, () => {
    const seed = counter++;
    return `https://picsum.photos/seed/${seed}/400/300`;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully replaced Unsplash URLs with picsum.photos');
