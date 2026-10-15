"use client";

import { useState } from "react";

export function ShareButton({ title, path }: { title: string; path: string }) {
  const [label, setLabel] = useState("Share");

  function markCopied() {
    setLabel("Copied");
    window.setTimeout(() => setLabel("Share"), 1600);
  }

  function copyWithField(url: string) {
    const field = document.createElement("textarea");
    field.value = url;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.top = "0";
    field.style.left = "0";
    document.body.appendChild(field);
    field.focus();
    field.select();
    const copied = document.execCommand("copy");
    field.remove();
    return copied;
  }

  function share() {
    setLabel("Copying");
    const url = `${window.location.origin}${path}`;
    try {
      if (copyWithField(url)) {
        markCopied();
        return;
      }
    } catch {
      // Fall through to the clipboard API.
    }
    const clipboard = navigator.clipboard;
    if (!clipboard) {
      setLabel("Copy the link from the address bar");
      return;
    }
    clipboard.writeText(url).then(markCopied).catch(() => {
      setLabel("Copy the link from the address bar");
    });
  }

  return (
    <button type="button" className="share" onClick={share}>
      {label}
    </button>
  );
}
