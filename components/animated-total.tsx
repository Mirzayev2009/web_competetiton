"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { formatSom } from "@/lib/tools";

gsap.registerPlugin(useGSAP);

export function AnimatedTotal({ total }: { total: number | null }) {
  const valueRef = useRef<HTMLElement>(null);
  const previous = useRef<number | null | undefined>(undefined);

  useGSAP(() => {
    const oldValue = previous.current;
    previous.current = total;
    if (oldValue === undefined || oldValue === total || total === null || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(valueRef.current, { y: 6, autoAlpha: 0.62 }, { y: 0, autoAlpha: 1, duration: 0.3, ease: "power2.out" });
  }, { dependencies: [total], scope: valueRef, revertOnUpdate: true });

  return <strong ref={valueRef} aria-live="polite" aria-atomic="true">{total === null ? "—" : formatSom(total)}</strong>;
}
