"use client";

import { useState } from "react";

export function ShareButton({ title, path }: { title: string; path: string }) {
  const [label, setLabel] = useState("Share");

  async function share() {
    const url = `${window.location.origin}${path}`;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setLabel("Copied");
      window.setTimeout(() => setLabel("Share"), 1600);
    } catch {
      setLabel("Share");
    }
  }

  return (
    <button type="button" className="share" onClick={share}>
      {label}
    </button>
  );
}
