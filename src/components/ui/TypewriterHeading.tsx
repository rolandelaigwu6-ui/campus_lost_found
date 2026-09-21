"use client";

import { useEffect, useState } from "react";

/**
 * A heading whose text types itself out once on mount, then stops.
 *
 * The full text is rendered twice up front: one copy is invisible and
 * reserves the final layout so nothing below the heading jumps as the
 * characters appear, the other is the one being typed into. Screen readers
 * get the finished sentence immediately from the sr-only copy — the
 * animated copy is aria-hidden so they don't hear it character by character.
 *
 * Typing is skipped entirely for visitors who ask for reduced motion.
 */
export default function TypewriterHeading({
  text,
  speed = 45,
  className = "",
}: {
  text: string;
  speed?: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const done = count >= text.length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      return;
    }

    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) clearInterval(id);
    }, speed);

    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <h1 className={`grid ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {text}
      </span>
      <span aria-hidden="true" className="col-start-1 row-start-1">
        {text.slice(0, count)}
        {!done && (
          <span className="ml-1 inline-block h-[0.8em] w-[0.08em] animate-pulse rounded-full bg-primary" />
        )}
      </span>
    </h1>
  );
}
