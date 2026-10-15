import fs from "fs";
import path from "path";
import type { Batch, Moment } from "./types";

const batchesDir = path.join(process.cwd(), "content", "batches");

export function topicSlug(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function loadBatches(): Batch[] {
  const files = fs
    .readdirSync(batchesDir)
    .filter((name) => name.endsWith(".json"))
    .sort();

  const batches = files.map((name) => {
    const raw = fs.readFileSync(path.join(batchesDir, name), "utf8");
    return JSON.parse(raw) as Batch;
  });

  return batches.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function publishedMoments(): Moment[] {
  return loadBatches()
    .flatMap((batch) => batch.moments)
    .filter((moment) => moment.status === "published")
    .sort((a, b) => b.number - a.number);
}

export function momentBySlug(slug: string): Moment | undefined {
  return publishedMoments().find((moment) => moment.slug === slug);
}

export function allTopics(): { label: string; slug: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const moment of publishedMoments()) {
    for (const topic of moment.topics) {
      counts.set(topic, (counts.get(topic) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([label, count]) => ({ label, slug: topicSlug(label), count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export function momentsForTopic(slug: string): Moment[] {
  return publishedMoments().filter((moment) =>
    moment.topics.some((topic) => topicSlug(topic) === slug),
  );
}

export function topicLabel(slug: string): string | undefined {
  return allTopics().find((topic) => topic.slug === slug)?.label;
}

const day = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const weekday = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDay(iso: string): string {
  return day.format(new Date(`${iso}T00:00:00Z`));
}

export function formatWeekday(iso: string): string {
  return weekday.format(new Date(`${iso}T00:00:00Z`));
}

export function formatNumber(number: number): string {
  return `No. ${String(number).padStart(3, "0")}`;
}
