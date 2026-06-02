// Run: node apps/web/scripts/download-imgur.mjs
// Downloads all Imgur-hosted images to apps/web/public/images/
import { mkdir, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "../public/images");

const IMAGES = [
  "5MkTH2X.png","FMFbsOt.jpeg","leiwjJb.jpeg","VgrLert.jpeg",
  "AEIUJHB.png","kYPx0Iq.png","8c5LETH.jpeg","gEIplVu.png",
  "rpVPAkh.png","nvAT7oB.png","KuporTg.jpeg","E8Ar62i.jpeg",
  "1QM0Ftl.jpeg","neezm7W.jpeg","iNlpKmp.jpeg","wwWEBds.jpeg",
  "rNpkyRW.jpeg","lNQFzkJ.jpeg","jVBBgud.jpeg","6ww6nzp.jpeg",
  "c8nCGNy.jpeg","YmYGdcf.jpeg","07axSRl.png","vRKtmNC.png",
  "kGmaCL7.png","opC81Wx.png","KIVrOVW.jpeg","a339hLi.png",
  "foWY70O.jpeg","5Y6M3fG.png","GiL99mI.png","2tENthv.jpeg",
  "H43dZi2.jpeg","MIapoa8.png","p4iy3vq.jpeg","5oFWKa4.png",
  "uARXRtG.png","r4yd2z5.jpeg","AnRHOue.jpeg","XrNhE2G.png",
  "krNGOh7.jpeg","nBujlj7.png","i6XOdah.png","3D3shvu.jpeg",
  "7rF3Rd5.jpeg","xOlsna0.jpeg","giDeBcH.jpeg","4JfT8q9.jpeg",
];

if (!existsSync(OUT_DIR)) await mkdir(OUT_DIR, { recursive: true });

let ok = 0, fail = 0;
for (const file of IMAGES) {
  const url = `https://i.imgur.com/${file}`;
  const dest = join(OUT_DIR, file);
  if (existsSync(dest)) { console.log(`SKIP  ${file}`); ok++; continue; }
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    console.log(`OK    ${file}`);
    ok++;
  } catch (e) {
    console.error(`FAIL  ${file}: ${e.message}`);
    fail++;
  }
}
console.log(`\nDone: ${ok} OK, ${fail} failed`);
