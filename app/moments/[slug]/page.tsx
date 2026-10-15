import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShareButton } from "@/components/ShareButton";
import {
  formatDay,
  formatNumber,
  momentBySlug,
  publishedMoments,
  topicSlug,
} from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams() {
  return publishedMoments().map((moment) => ({ slug: moment.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const moment = momentBySlug(slug);
  if (!moment) return { title: "Missing moment" };
  return { title: moment.title, description: moment.punchline };
}

export default async function MomentPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const moment = momentBySlug(slug);
  if (!moment) notFound();

  const more = publishedMoments()
    .filter((item) => item.slug !== moment.slug)
    .slice(0, 3);

  return (
    <main className="page moment">
      <p className="kicker">Moments</p>
      <p className="punch moment-punch">
        <span className="hl">{moment.punchline}</span>
      </p>
      <h1>{moment.title}</h1>
      <p className="moment-meta">
        <a href={moment.source.url}>{moment.source.name}</a>
        <span className="meta-sep">·</span>
        <span>{formatDay(moment.publishedOn)}</span>
        <span className="meta-sep">·</span>
        <span>{formatNumber(moment.number)}</span>
        <span className="meta-sep">·</span>
        <span className="pill">{moment.kind}</span>
        {moment.topics.map((topic) => (
          <span key={topic}>
            <span className="meta-sep">·</span>
            <Link href={`/topics/${topicSlug(topic)}`}>{topic}</Link>
          </span>
        ))}
      </p>
      <hr className="rule" />
      <h2 className="section-label" id="why">
        Why it&apos;s funny
      </h2>
      <p className="why-body">{moment.why}</p>
      <p className="disclaimer">
        Written as a paraphrase of a public source. The original body is not copied onto this page.
      </p>
      <div className="button-row">
        <ShareButton title={moment.title} path={`/moments/${moment.slug}`} />
        <a className="original" href={moment.source.url}>
          Read the original <span aria-hidden="true">↗</span>
        </a>
      </div>
      <hr className="rule" />
      <h2 className="section-label">Topics</h2>
      <div className="topic-row">
        {moment.topics.map((topic) => (
          <Link key={topic} className="topic-pill" href={`/topics/${topicSlug(topic)}`}>
            {topic}
          </Link>
        ))}
      </div>
      <hr className="rule" />
      <h2 className="section-label">More moments</h2>
      <ul className="more-list">
        {more.map((item) => (
          <li key={item.slug}>
            <Link href={`/moments/${item.slug}`}>
              <span className="hl">{item.punchline}</span>
              <span className="more-title">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
