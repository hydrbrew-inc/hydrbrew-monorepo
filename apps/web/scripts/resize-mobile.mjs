// Run: node apps/web/scripts/resize-mobile.mjs
// Generates 600px-wide mobile variants of the largest images
import sharp from "sharp";
import { readdirSync, statSync } from "fs";
import { join, dirname, extname, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMG_DIR = join(__dirname, "../public/images");

// Only generate mobile variants for images shown large on screen
// Small thumbnails don't need a mobile variant
const THRESHOLD_KB = 80;

const files = readdirSync(IMG_DIR).filter(f => extname(f) === ".webp" && !f.endsWith("-mobile.webp"));

let count = 0;
for (const file of files) {
  const srcPath = join(IMG_DIR, file);
  const sizeKb = statSync(srcPath).size / 1024;
  if (sizeKb < THRESHOLD_KB) { console.log(`SKIP  ${file} (${sizeKb.toFixed(0)}KB — under threshold)`); continue; }

  const outName = basename(file, ".webp") + "-mobile.webp";
  const outPath = join(IMG_DIR, outName);

  await sharp(srcPath).resize(600, null, { withoutEnlargement: true }).webp({ quality: 80 }).toFile(outPath);
  const outKb = statSync(outPath).size / 1024;
  console.log(`OK    ${file} → ${outName}  ${sizeKb.toFixed(0)}KB → ${outKb.toFixed(0)}KB`);
  count++;
}
console.log(`\nGenerated ${count} mobile variants`);
