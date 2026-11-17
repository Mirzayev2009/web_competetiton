"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export function MotionCard({ className, children }: { className: string; children: ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(cardRef.current, { y: 18, autoAlpha: 0.65 }, { y: 0, autoAlpha: 1, duration: 0.56, ease: "power3.out" });
    const symbol = cardRef.current?.querySelector(".success-symbol");
    if (symbol) gsap.fromTo(symbol, { scale: 0.72 }, { scale: 1, duration: 0.48, delay: 0.16, ease: "back.out(1.4)" });
  }, { scope: cardRef });

  return <div ref={cardRef} className={className}>{children}</div>;
}
