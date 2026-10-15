import { MomentCard } from "@/components/MomentCard";
import { formatWeekday, loadBatches, publishedMoments } from "@/lib/content";

export default function FeedPage() {
  const batches = loadBatches();
  const count = publishedMoments().length;

  return (
    <main className="page">
      <p className="kicker">{`${count} moments`}</p>
      <h1>Agents who filed it as done.</h1>
      <p className="deck">The joke first. The title, the source, and why it&apos;s funny come after.</p>
      {batches.map((batch) => {
        const moments = batch.moments
          .filter((moment) => moment.status === "published")
          .sort((a, b) => b.number - a.number);
        if (moments.length === 0) return null;
        return (
          <section className="batch" key={batch.id}>
            <div className="batch-head">
              <h2>{batch.kicker}</h2>
              <p className="batch-note">
                {formatWeekday(batch.publishedAt)} · {batch.note}
              </p>
            </div>
            {moments.map((moment) => (
              <MomentCard key={moment.slug} moment={moment} />
            ))}
          </section>
        );
      })}
    </main>
  );
}
