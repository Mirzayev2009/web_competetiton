"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HomeMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    let startIntro: (() => void) | undefined;

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const intro = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      intro
        .from(".hero h1", { y: 34, autoAlpha: 0, duration: 0.72 })
        .from(".hero-copy > p:not(.hero-note)", { y: 16, autoAlpha: 0, duration: 0.54 }, "-=0.42")
        .from(".hero-actions > *", { y: 14, autoAlpha: 0, stagger: 0.08, duration: 0.45, clearProps: "transform,opacity,visibility" }, "-=0.34")
        .from(".hero-note", { autoAlpha: 0, duration: 0.45 }, "-=0.2")
        .from(".hero-visual", { x: 28, autoAlpha: 0, duration: 0.7 }, 0.16)
        .from(".hero-artwork img", { x: 26, scale: 0.91, rotation: -3, autoAlpha: 0, duration: 0.84 }, 0.32)
        .from(".hero-visual-top, .hero-visual-bottom", { y: 9, autoAlpha: 0, stagger: 0.12, duration: 0.42 }, 0.45);
      startIntro = () => {
        if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches && !intro.isActive() && intro.progress() === 0) intro.play();
      };

      gsap.fromTo(".catalog-rail", { scaleX: 0, transformOrigin: "left center" }, {
        scaleX: 1, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: ".section-heading", start: "top 82%", once: true },
      });
      if (document.documentElement.dataset.loaderDone === "true") startIntro();
      return () => { startIntro = undefined; };
    });

    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const stage = root.current?.querySelector<HTMLElement>(".hero-visual");
      const artwork = root.current?.querySelector<HTMLElement>(".hero-artwork");
      if (!stage || !artwork) return;
      const moveX = gsap.quickTo(artwork, "x", { duration: 0.55, ease: "power2.out" });
      const moveY = gsap.quickTo(artwork, "y", { duration: 0.55, ease: "power2.out" });
      const onMove = (event: PointerEvent) => {
        const bounds = stage.getBoundingClientRect();
        moveX(((event.clientX - bounds.left) / bounds.width - 0.5) * 18);
        moveY(((event.clientY - bounds.top) / bounds.height - 0.5) * 14);
      };
      const onLeave = () => { moveX(0); moveY(0); };
      stage.addEventListener("pointermove", onMove);
      stage.addEventListener("pointerleave", onLeave);
      return () => {
        stage.removeEventListener("pointermove", onMove);
        stage.removeEventListener("pointerleave", onLeave);
      };
    });

    let fallbackTimer: number | undefined;
    function onLoaderDone() {
      if (fallbackTimer !== undefined) window.clearTimeout(fallbackTimer);
      startIntro?.();
    }
    if (document.documentElement.dataset.loaderDone === "true") onLoaderDone();
    else {
      window.addEventListener("asbob:loader-done", onLoaderDone, { once: true });
      fallbackTimer = window.setTimeout(onLoaderDone, 1800);
    }

    return () => {
      if (fallbackTimer !== undefined) window.clearTimeout(fallbackTimer);
      window.removeEventListener("asbob:loader-done", onLoaderDone);
      media.revert();
    };
  }, { scope: root });

  return <main id="main-content" ref={root}>{children}</main>;
}
