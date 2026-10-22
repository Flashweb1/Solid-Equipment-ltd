import { mkdirSync, writeFileSync } from "node:fs";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36";

const families = [
  { name: "Montserrat", weights: [700, 800, 900] },
  { name: "Inter", weights: [400, 500, 600, 700] },
  { name: "IBM Plex Mono", weights: [400, 500, 600] },
];

mkdirSync("public/fonts", { recursive: true });

for (const fam of families) {
  for (const weight of fam.weights) {
    const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
      fam.name
    ).replace(/%20/g, "+")}:wght@${weight}&display=swap`;
    const css = await (await fetch(url, { headers: { "User-Agent": UA } })).text();
    const faces = css.split("@font-face").slice(1);
    const latin = faces.find((f) => f.includes("U+0000-00FF"));
    const match = (latin || faces[0])?.match(/url\((https:[^)]+)\)/);
    if (!match) {
      console.error("MISS", fam.name, weight);
      continue;
    }
    const buf = Buffer.from(await (await fetch(match[1])).arrayBuffer());
    const file = `public/fonts/${fam.name.toLowerCase().replace(/ /g, "-")}-${weight}.woff2`;
    writeFileSync(file, buf);
    console.log("OK", file, buf.length, "bytes");
  }
}
