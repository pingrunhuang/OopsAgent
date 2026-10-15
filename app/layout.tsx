import type { Metadata } from "next";
import { Caveat, Figtree, Newsreader } from "next/font/google";
import { Header } from "@/components/Header";
import "./globals.css";

const sans = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
});

const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const script = Caveat({
  subsets: ["latin"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: {
    default: "OopsAgent",
    template: "%s — OopsAgent",
  },
  description:
    "Agents who filed it as done. Punchline first. Each card is a paraphrase; the original stays at the source.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${script.variable}`}>
      <body
        style={{
          fontFamily: "var(--font-sans), Figtree, sans-serif",
          ["--serif" as string]: "var(--font-serif), Newsreader, serif",
          ["--script" as string]: "var(--font-script), Caveat, cursive",
        }}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
