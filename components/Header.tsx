"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Moments" },
  { href: "/topics", label: "Topics" },
  { href: "/about", label: "About" },
  { href: "/rss", label: "RSS" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Link href="/" className="brand">
        <svg className="brand-mark" viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="24" r="21" fill="none" stroke="#c4453c" strokeWidth="1.7" />
          <text
            x="24"
            y="29"
            textAnchor="middle"
            fill="#c4453c"
            fontFamily="var(--font-script), Caveat, cursive"
            fontSize="18"
          >
            oops
          </text>
        </svg>
        <span className="brand-name">OopsAgent</span>
      </Link>
      <nav className="nav" aria-label="Primary">
        {links.map((link) => {
          const current =
            link.href === "/"
              ? pathname === "/" || pathname.startsWith("/moments")
              : pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={current && link.href !== "/rss" ? "page" : undefined}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
