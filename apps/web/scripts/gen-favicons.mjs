// Rasterizes public/icon.svg into the full favicon set (browsers, Safari,
// Android/PWA). Run from repo root: node apps/web/scripts/gen-favicons.mjs
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const pub = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
const svg = readFileSync(join(pub, "icon.svg"));

const render = (size) =>
  sharp(svg, { density: 512 })
    .resize(size, size, { fit: "contain" })
    .png()
    .toBuffer();

// PNG icons: desktop favicon (32), apple-touch (180), Android/PWA (192, 512).
const pngTargets = [
  ["icon-32.png", 32],
  ["apple-icon.png", 180],
  ["icon-192.png", 192],
  ["icon-512.png", 512],
];
for (const [name, size] of pngTargets) {
  writeFileSync(join(pub, name), await render(size));
}

// favicon.ico with 16 + 32 + 48 px frames (48 satisfies Google rich results).
const icoSizes = [16, 32, 48];
const icoPngs = await Promise.all(icoSizes.map(render));
writeFileSync(join(pub, "favicon.ico"), buildIco(icoSizes, icoPngs));

console.log("Generated favicon.ico (16/32/48) + icon-32/180/192/512 PNGs");

function buildIco(sizes, pngs) {
  const count = sizes.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);
  const entries = [];
  let offset = 6 + count * 16;
  for (let i = 0; i < count; i++) {
    const s = sizes[i];
    const e = Buffer.alloc(16);
    e.writeUInt8(s >= 256 ? 0 : s, 0);
    e.writeUInt8(s >= 256 ? 0 : s, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(pngs[i].length, 8);
    e.writeUInt32LE(offset, 12);
    offset += pngs[i].length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...pngs]);
}
