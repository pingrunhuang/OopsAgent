import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "content", "batches");
const files = fs.readdirSync(dir).filter((name) => name.endsWith(".json")).sort();
const moments = files.flatMap((name) => JSON.parse(fs.readFileSync(path.join(dir, name), "utf8")).moments);
const published = moments.filter((moment) => moment.status === "published");

const slugs = new Set();
const numbers = new Set();
const problems = [];

if (published.length !== 8) {
  problems.push(`expected 8 published moments, found ${published.length}`);
}

for (const moment of published) {
  if (slugs.has(moment.slug)) problems.push(`duplicate slug ${moment.slug}`);
  if (numbers.has(moment.number)) problems.push(`duplicate number ${moment.number}`);
  slugs.add(moment.slug);
  numbers.add(moment.number);
  for (const field of ["title", "punchline", "why", "publishedOn"]) {
    if (!moment[field] || !String(moment[field]).trim()) {
      problems.push(`${moment.slug} missing ${field}`);
    }
  }
  if (!moment.source?.url?.startsWith("https://")) {
    problems.push(`${moment.slug} missing https source`);
  }
}

for (let n = 1; n <= 8; n += 1) {
  if (!numbers.has(n)) problems.push(`missing moment number ${n}`);
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

console.log(`ok: ${published.length} published moments in ${files.length} batches`);
