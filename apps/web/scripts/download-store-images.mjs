// Downloads Figma design images for apps/store and converts to WebP
import sharp from "sharp";
import { writeFile, mkdir } from "fs/promises";
import { existsSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "../../store/public");

const IMAGES = [
  { id: "VzCUpeT", ext: "png",  out: "hero-desk.webp",      w: 1920, q: 75 },
  { id: "Ps32UHT", ext: "png",  out: "reviews-bg.webp",     w: 1920, q: 75 },
  { id: "2kEymfr", ext: "png",  out: "social-card.webp",    w: 600,  q: 82 },
  { id: "KK84F9r", ext: "png",  out: "product-main.webp",   w: 800,  q: 85 },
  { id: "jaYNqNB", ext: "png",  out: "afternoon-model.webp",w: 900,  q: 82 },
  { id: "opEN1j8", ext: "jpeg", out: "ingredients.webp",    w: 800,  q: 82 },
  { id: "vs3fowk", ext: "png",  out: "badge-electrolytes.webp", w: 200, q: 85 },
  { id: "guTl0lK", ext: "png",  out: "badge-sugar.webp",    w: 200,  q: 85 },
  { id: "DCLjzhJ", ext: "png",  out: "badge-caffeine.webp", w: 200,  q: 85 },
];

for (const img of IMAGES) {
  const outPath = join(OUT, img.out);
  if (existsSync(outPath)) { console.log(`SKIP  ${img.out}`); continue; }
  try {
    const url = `https://i.imgur.com/${img.id}.${img.ext}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await sharp(buf).resize(img.w, null, { withoutEnlargement: true }).webp({ quality: img.q }).toFile(outPath);
    const kb = Math.round(statSync(outPath).size / 1024);
    console.log(`OK    ${img.out}  ${kb}KB`);
  } catch (e) {
    console.error(`FAIL  ${img.out}: ${e.message}`);
  }
}
console.log("Done");
