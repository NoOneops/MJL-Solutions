import { access, readFile } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("dist");
const basePath = "/MJL-Solutions/";
const pages = ["index.html", "404.html"];
const failures = [];

const exists = async (filePath) => {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
};

for (const page of pages) {
  const pagePath = path.join(outputDirectory, page);
  const html = await readFile(pagePath, "utf8");
  const ids = new Set(
    [...html.matchAll(/\sid=["']([^"']+)["']/g)].map((match) => match[1]),
  );
  const references = [
    ...html.matchAll(/\s(?:href|src|action)=["']([^"']+)["']/g),
  ].map((match) => match[1]);

  for (const reference of references) {
    if (reference.startsWith("#")) {
      if (reference.length > 1 && !ids.has(reference.slice(1))) {
        failures.push(`${page}: missing fragment ${reference}`);
      }
      continue;
    }

    if (/^(?:https?:|mailto:)/.test(reference)) {
      try {
        new URL(reference);
      } catch {
        failures.push(`${page}: invalid URL ${reference}`);
      }
      continue;
    }

    const cleanReference = reference.split(/[?#]/)[0];
    const relativeReference = cleanReference.startsWith(basePath)
      ? cleanReference.slice(basePath.length)
      : cleanReference.replace(/^\//, "");
    const target = relativeReference.endsWith("/")
      ? path.join(outputDirectory, relativeReference, "index.html")
      : path.join(outputDirectory, relativeReference);

    if (!(await exists(target))) {
      failures.push(`${page}: missing file ${reference}`);
    }
  }
}

const robots = await readFile(path.join(outputDirectory, "robots.txt"), "utf8");
const sitemap = await readFile(
  path.join(outputDirectory, "sitemap.xml"),
  "utf8",
);
const canonical = "https://nooneops.github.io/MJL-Solutions/";

if (!robots.includes(`Sitemap: ${canonical}sitemap.xml`)) {
  failures.push("robots.txt: missing the canonical sitemap declaration");
}

if (!sitemap.includes(`<loc>${canonical}</loc>`)) {
  failures.push(
    "sitemap.xml: canonical URL is missing or has incorrect casing",
  );
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `Checked ${pages.length} built pages: all local links and published paths resolve.`,
  );
}
