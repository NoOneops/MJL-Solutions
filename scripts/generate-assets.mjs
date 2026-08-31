import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDirectory = path.resolve("assets/brand");
const outputDirectory = path.resolve("public");

await mkdir(outputDirectory, { recursive: true });
await copyFile(
  path.join(sourceDirectory, "favicon.svg"),
  path.join(outputDirectory, "favicon.svg"),
);

const favicon = sharp(path.join(sourceDirectory, "favicon.svg"));

await Promise.all([
  favicon
    .clone()
    .resize(16, 16)
    .png()
    .toFile(path.join(outputDirectory, "favicon-16x16.png")),
  favicon
    .clone()
    .resize(32, 32)
    .png()
    .toFile(path.join(outputDirectory, "favicon-32x32.png")),
  favicon
    .clone()
    .resize(180, 180)
    .png()
    .toFile(path.join(outputDirectory, "apple-touch-icon.png")),
  favicon
    .clone()
    .resize(192, 192)
    .png()
    .toFile(path.join(outputDirectory, "icon-192.png")),
  favicon
    .clone()
    .resize(512, 512)
    .png()
    .toFile(path.join(outputDirectory, "icon-512.png")),
  sharp(path.join(sourceDirectory, "og-card.svg"))
    .png()
    .toFile(path.join(outputDirectory, "og-image.png")),
  sharp(path.join(sourceDirectory, "og-card.svg"))
    .webp({ quality: 82 })
    .toFile(path.join(outputDirectory, "og-image.webp")),
]);

console.log("Generated favicon and social preview assets.");
