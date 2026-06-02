// Run: node apps/web/scripts/resize-images.mjs
// Converts ALL images in public/images to WebP at max 1200px wide
import sharp from "sharp";
import { readdirSync, statSync } from "fs";
import { join, dirname, extname, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMG_DIR = join(__dirname, "../public/images");

const EXTS = new Set([".png", ".jpeg", ".jpg"]);
const files = readdirSync(IMG_DIR).filter(f => EXTS.has(extname(f).toLowerCase()));

let totalBefore = 0, totalAfter = 0;

for (const file of files) {
  const srcPath = join(IMG_DIR, file);
  const outName = basename(file, extname(file)) + ".webp";
  const outPath = join(IMG_DIR, outName);
  if (outName === file) { console.log(`SKIP  ${file} (already webp)`); continue; }

  const before = statSync(srcPath).size;
  totalBefore += before;

  await sharp(srcPath)
    .resize(1200, null, { withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(outPath);

  const after = statSync(outPath).size;
  totalAfter += after;
  const saving = (((before - after) / before) * 100).toFixed(0);
  console.log(`OK    ${file.padEnd(22)} ${(before/1024).toFixed(0).padStart(5)}KB → ${(after/1024).toFixed(0).padStart(4)}KB  (-${saving}%)`);
}

console.log(`\nTotal: ${(totalBefore/1024/1024).toFixed(1)}MB → ${(totalAfter/1024/1024).toFixed(1)}MB  (saved ${((totalBefore-totalAfter)/1024/1024).toFixed(1)}MB)`);
