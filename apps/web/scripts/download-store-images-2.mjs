import sharp from "sharp";
import { writeFile } from "fs/promises";
import { existsSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "../../store/public");

const IMAGES = [
  { id: "f8a6GyL", ext: "jpeg", out: "blog-featured.webp",  w: 1200, q: 82 },
  { id: "d0nlyo5", ext: "png",  out: "blog-2.webp",         w: 800,  q: 82 },
  { id: "qCYobqP", ext: "png",  out: "blog-3.webp",         w: 800,  q: 82 },
  { id: "XJwgah6", ext: "png",  out: "blog-4.webp",         w: 800,  q: 82 },
  { id: "wKngvLJ", ext: "png",  out: "quiz-bg.webp",        w: 1200, q: 78 },
  { id: "IOMVKF7", ext: "png",  out: "compare-redbull.webp",w: 600,  q: 82 },
  { id: "1f6wCBo", ext: "png",  out: "compare-energy.webp", w: 600,  q: 82 },
  { id: "b5qCx4B", ext: "png",  out: "compare-bang.webp",   w: 600,  q: 82 },
  { id: "nGsStwV", ext: "png",  out: "compare-celsius.webp",w: 600,  q: 82 },
];

for (const img of IMAGES) {
  const outPath = join(OUT, img.out);
  if (existsSync(outPath)) { console.log(`SKIP  ${img.out}`); continue; }
  try {
    const res = await fetch(`https://i.imgur.com/${img.id}.${img.ext}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await sharp(buf).resize(img.w, null, { withoutEnlargement: true }).webp({ quality: img.q }).toFile(outPath);
    console.log(`OK    ${img.out}  ${Math.round(statSync(outPath).size/1024)}KB`);
  } catch (e) {
    console.error(`FAIL  ${img.out}: ${e.message}`);
  }
}
console.log("Done");
