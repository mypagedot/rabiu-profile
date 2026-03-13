"use client";

import { useEffect, useRef } from "react";

export default function TypingEffect() {
  const typedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!typedRef.current) return;
    const targetText = "Software Engineer";
    let charIndex = 0;
    typedRef.current.textContent = "";

    const type = () => {
      if (charIndex < targetText.length) {
        typedRef.current!.textContent += targetText.charAt(charIndex);
        charIndex++;
        setTimeout(type, 300);
      }
    };
    type();
  }, []);

  return <span className="highlight" ref={typedRef}></span>;
}