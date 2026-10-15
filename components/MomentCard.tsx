import Link from "next/link";
import { formatDay, formatNumber, topicSlug } from "@/lib/content";
import type { Moment } from "@/lib/types";
import { ShareButton } from "./ShareButton";

export function MomentCard({ moment }: { moment: Moment }) {
  const href = `/moments/${moment.slug}`;
  return (
    <article className="card">
      <p className="punch">
        <Link href={href} className="hl">
          {moment.punchline}
        </Link>
      </p>
      <h3>
        <Link href={href}>{moment.title}</Link>
      </h3>
      <p className="meta">
        <a href={moment.source.url}>{moment.source.name}</a>
        <span className="meta-sep">·</span>
        {formatDay(moment.publishedOn)}
        <span className="meta-sep">·</span>
        {formatNumber(moment.number)}
        <span className="meta-sep">·</span>
        <span className="pill">{moment.kind}</span>
        {moment.sponsor ? (
          <>
            <span className="meta-sep">·</span>
            <span className="pill sponsor">Sponsor</span>
          </>
        ) : null}
        {moment.topics.map((topic) => (
          <span key={topic}>
            <span className="meta-sep">·</span>
            <Link href={`/topics/${topicSlug(topic)}`}>{topic}</Link>
          </span>
        ))}
      </p>
      <div className="card-actions">
        <Link className="why-link" href={`${href}#why`}>
          Why it&apos;s funny
        </Link>
        <ShareButton title={moment.title} path={href} />
      </div>
    </article>
  );
}
