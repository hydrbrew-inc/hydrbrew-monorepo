// Rasterizes app/icon.svg into the formats Safari needs (it ignores SVG
// favicons): a real multi-size favicon.ico and an apple-touch-icon PNG.
// Run from repo root: node apps/web/scripts/gen-favicons.mjs
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const appDir = join(dirname(fileURLToPath(import.meta.url)), "..", "app");
const svg = readFileSync(join(appDir, "icon.svg"));

const render = (size) =>
  sharp(svg, { density: 512 }).resize(size, size, { fit: "contain" }).png().toBuffer();

// apple-touch-icon — Safari / iOS bookmarks + home screen
writeFileSync(join(appDir, "apple-icon.png"), await render(180));

// favicon.ico with 16 + 32 px frames (PNG-embedded ICO) — replaces the stale
// default so Safari's fallback shows the real mark.
const sizes = [16, 32];
const pngs = await Promise.all(sizes.map(render));
writeFileSync(join(appDir, "favicon.ico"), buildIco(sizes, pngs));

console.log("Generated apple-icon.png + favicon.ico from icon.svg");

function buildIco(sizes, pngs) {
  const count = sizes.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4); // image count
  const entries = [];
  let offset = 6 + count * 16;
  for (let i = 0; i < count; i++) {
    const s = sizes[i];
    const e = Buffer.alloc(16);
    e.writeUInt8(s >= 256 ? 0 : s, 0); // width
    e.writeUInt8(s >= 256 ? 0 : s, 1); // height
    e.writeUInt8(0, 2); // palette count
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // color planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(pngs[i].length, 8); // data size
    e.writeUInt32LE(offset, 12); // data offset
    offset += pngs[i].length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...pngs]);
}
