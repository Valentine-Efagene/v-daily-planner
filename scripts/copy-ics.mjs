import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(dir, "..", "..", "Valentine_Weekly_Schedule.ics");
const dest = path.join(dir, "..", "public", "Valentine_Weekly_Schedule.ics");
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.copyFileSync(src, dest);
console.log("Copied ICS to public/");
