"use client";

import { useEffect, useState } from "react";
import { openingCopy } from "@/content/opening";

export function SkipIntro() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById("journey");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHidden(entry.isIntersecting);
      },
      { threshold: 0.15 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  if (hidden) return null;

  return (
    <a href="#journey" className="skip-intro-fixed">
      {openingCopy.skipIntro}
    </a>
  );
}
