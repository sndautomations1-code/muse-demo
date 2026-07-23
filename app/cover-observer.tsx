"use client";

import { useEffect } from "react";

export default function CoverObserver() {
  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) =>
        document.body.classList.toggle("over-hero", entry.isIntersecting),
      { rootMargin: "-60px 0px 0px 0px" },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);
  return null;
}
