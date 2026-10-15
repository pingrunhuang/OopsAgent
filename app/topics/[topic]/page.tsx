import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MomentCard } from "@/components/MomentCard";
import { allTopics, momentsForTopic, topicLabel } from "@/lib/content";

type Params = { topic: string };

export function generateStaticParams() {
  return allTopics().map((topic) => ({ topic: topic.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { topic } = await params;
  const label = topicLabel(topic);
  return { title: label ?? "Topic" };
}

export default async function TopicPage({ params }: { params: Promise<Params> }) {
  const { topic } = await params;
  const label = topicLabel(topic);
  if (!label) notFound();
  const moments = momentsForTopic(topic);

  return (
    <main className="page">
      <p className="kicker">Topics</p>
      <h1>{label}</h1>
      <p className="deck">
        {moments.length} moment{moments.length === 1 ? "" : "s"} filed here.
      </p>
      <div className="batch">
        {moments.map((moment) => (
          <MomentCard key={moment.slug} moment={moment} />
        ))}
      </div>
    </main>
  );
}
