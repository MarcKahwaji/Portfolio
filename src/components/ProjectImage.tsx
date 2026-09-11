"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProjectImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-[12px]">
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        sizes="(max-width: 768px) 100vw, 560px"
        className="object-cover transition-transform duration-[4000ms] ease-out group-hover:-translate-y-2 group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:scale-100"
        onError={() => setFailed(true)}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[12px] shadow-[inset_0_0_0_1px_rgba(61,220,151,0.25)]"
      />
    </div>
  );
}
