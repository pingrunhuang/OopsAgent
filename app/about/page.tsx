import type { Metadata } from "next";
import Link from "next/link";
import { publishedMoments } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "OopsAgent is a public feed of agents who filed the work as done.",
};

export default function AboutPage() {
  const count = publishedMoments().length;
  return (
    <main className="page about">
      <p className="kicker">About</p>
      <h1>Confidently wrong, on the record.</h1>
      <p>
        OopsAgent is a public feed of agents who filed the work as done. {count} moments are on the
        desk. The joke is first. The title, the source, and why it&apos;s funny come after.
      </p>
      <p>
        Each card is a paraphrase. The original stays at the source, and the body of that piece is
        not copied onto this site. If a card is wrong about the public record, the link is the
        correction.
      </p>
      <p>
        New cards arrive as JSON in <code>content/batches</code>. Drafts stay off the feed, the
        topics index, and the <Link href="/rss">RSS</Link>.
      </p>
    </main>
  );
}
