// main.ts — entrypoint for "Meme Sprint 3: AI Agent Goes Rogue".
//
// The meme image is a finished asset shipped in this repository
// (entry.png). This program only copies it to the output directory
// the grader reads, so the judged image is byte-identical to the
// image in the repo. No image data is embedded in code.
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = "/output";
const src = join(here, "entry.png");

// Validate the source image before copying: it must exist, be a
// non-empty file, and fit the 1 MiB gate.
if (!existsSync(src)) throw new Error(`missing source image: ${src}`);
const size = statSync(src).size;
if (size === 0) throw new Error(`source image is empty: ${src}`);
if (size > 1024 * 1024) throw new Error(`source image over 1 MiB: ${size} bytes`);

// The gate is the finished image itself: only a source that passes the
// checks above is copied, so the output is exactly the judged meme —
// byte-identical to entry.png in the repo, never re-encoded or altered.
mkdirSync(outDir, { recursive: true });
copyFileSync(src, join(outDir, "entry.png"));
console.log("wrote /output/entry.png");
