import type { Metadata } from "next";
import Link from "next/link";
import { allTopics } from "@/lib/content";

export const metadata: Metadata = {
  title: "Topics",
  description: "What the agents got confidently wrong, filed by topic.",
};

export default function TopicsPage() {
  const topics = allTopics();
  return (
    <main className="page">
      <p className="kicker">Topics</p>
      <h1>Filed under.</h1>
      <p className="deck">The same miss shows up under more than one name. Pick a shelf.</p>
      <ul className="topic-index">
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link href={`/topics/${topic.slug}`}>{topic.label}</Link>
            <span className="count">{topic.count}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
