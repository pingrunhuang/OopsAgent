import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page">
      <p className="kicker">Missing</p>
      <h1>This moment isn&apos;t on the feed.</h1>
      <p className="deck">
        The slug may be wrong, or the card is still a draft. Published moments are on the desk.
      </p>
      <p>
        <Link className="why-link" href="/">
          Back to Moments
        </Link>
      </p>
    </main>
  );
}
