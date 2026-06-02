import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STORE_PUBLIC = join(__dirname, "../../store/public");

const targets = [
  { src: "hero-bg.png", out: "hero-bg.webp", width: 1920, quality: 80 },
  { src: "can-front.png", out: "can-front.webp", width: 800, quality: 85 },
];

for (const { src, out, width, quality } of targets) {
  const s = join(STORE_PUBLIC, src), o = join(STORE_PUBLIC, out);
  await sharp(s).resize(width, null, { withoutEnlargement: true }).webp({ quality }).toFile(o);
  const { statSync } = await import("fs");
  console.log(`${src} → ${out}: ${Math.round(statSync(o).size/1024)}KB`);
}
