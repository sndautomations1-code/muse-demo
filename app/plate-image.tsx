"use client";

import { useState } from "react";

export default function PlateImage({ src, alt }: { src: string; alt: string }) {
  const [missing, setMissing] = useState(false);

  if (missing) {
    return <div className="plate-fallback" aria-hidden="true" />;
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element -- plain <img> required: the plate treatments come from CSS filters/blend on the raw element */
    <img
      src={src}
      alt={alt}
      onError={() => setMissing(true)}
      ref={(el) => {
        // Catch failures that fired before hydration attached onError.
        if (el && el.complete && el.naturalWidth === 0) setMissing(true);
      }}
    />
  );
}
