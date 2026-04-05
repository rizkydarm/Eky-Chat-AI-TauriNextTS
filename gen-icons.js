
import sharp from 'sharp';

const iconSvg = '<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="24" fill="#2563eb"/><text x="64" y="76" text-anchor="middle" font-size="56" fill="white" font-family="sans-serif">E</text></svg>';
const icon = sharp(Buffer.from(iconSvg));

await icon.resize(32,32).png().toFile('apps/native/src-tauri/icons/32x32.png');
await icon.resize(128,128).png().toFile('apps/native/src-tauri/icons/128x128.png');
await icon.resize(256,256).png().toFile('apps/native/src-tauri/icons/128x128@2x.png');

console.log('✅ Required Tauri icons generated');
