import { formatNumber, publishedMoments } from "@/lib/content";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const moments = publishedMoments();
  const items = moments
    .map((moment) => {
      const link = `${origin}/moments/${moment.slug}`;
      const description = `${moment.punchline} ${moment.why}`;
      return `    <item>
      <title>${escapeXml(moment.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid>${escapeXml(link)}</guid>
      <pubDate>${new Date(`${moment.publishedOn}T12:00:00Z`).toUTCString()}</pubDate>
      <category>${escapeXml(formatNumber(moment.number))}</category>
      <description>${escapeXml(description)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>OopsAgent</title>
    <link>${escapeXml(origin)}</link>
    <description>Agents who filed it as done. Punchline first. Each card is a paraphrase.</description>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}
