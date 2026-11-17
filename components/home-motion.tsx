"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HomeMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useGSAP((_, contextSafe) => {
    const media = gsap.matchMedia();
    let startIntro: (() => void) | undefined;

    media.add("(prefers-reduced-motion: no-preference)", () => {
      let heroVisible = false;
      let introComplete = false;
      const drill = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.6 });
      drill
        .to(".drill-assembly", { x: -18, duration: 0.58, ease: "power2.inOut" })
        .fromTo(".drill-flute", { scaleY: 1 }, { scaleY: 0.5, transformOrigin: "center center", duration: 0.065, repeat: 7, yoyo: true, ease: "none" }, 0.48)
        .to(".drill-assembly", { x: -21, duration: 0.07, repeat: 3, yoyo: true, ease: "sine.inOut" }, 0.58)
        .fromTo(".drill-dust", { x: 0, y: 0, autoAlpha: 0 }, { x: -10, y: -15, autoAlpha: 1, duration: 0.3, ease: "power2.out" }, 0.58)
        .to(".drill-hole", { autoAlpha: 0.85, duration: 0.12 }, 0.64)
        .to(".drill-dust", { autoAlpha: 0, duration: 0.28 }, 0.88)
        .to(".drill-assembly", { x: 0, duration: 0.65, ease: "power2.inOut" }, 1.14)
        .to(".drill-hole", { autoAlpha: 0, duration: 0.25 }, 1.35);
      const syncDrill = () => {
        if (heroVisible && introComplete) drill.play();
        else drill.pause();
      };
      const intro = gsap.timeline({
        paused: true, defaults: { ease: "power3.out" },
        onComplete: () => { introComplete = true; syncDrill(); },
      });
      intro
        .from(".hero .eyebrow", { y: 12, autoAlpha: 0, duration: 0.38 })
        .from(".hero h1", { y: 34, autoAlpha: 0, duration: 0.72 }, "-=0.16")
        .from(".hero-copy > p:not(.hero-note)", { y: 16, autoAlpha: 0, duration: 0.54 }, "-=0.42")
        .from(".hero-actions > *", { y: 14, autoAlpha: 0, stagger: 0.08, duration: 0.45, clearProps: "transform,opacity,visibility" }, "-=0.34")
        .from(".hero-note", { autoAlpha: 0, duration: 0.45 }, "-=0.2")
        .from(".hero-visual", { x: 28, autoAlpha: 0, duration: 0.7 }, 0.16)
        .from(".hero-tool-stage", { x: 30, scale: 0.94, autoAlpha: 0, duration: 0.85, clearProps: "transform,opacity,visibility" }, 0.32)
        .from(".hero-art-inset", { x: 16, autoAlpha: 0, duration: 0.52 }, 0.66)
        .from(".hero-visual-top, .hero-visual-bottom", { y: 9, autoAlpha: 0, stagger: 0.12, duration: 0.42 }, 0.45);
      startIntro = () => {
        if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches && !intro.isActive() && intro.progress() === 0) intro.play();
      };

      gsap.fromTo(".catalog-rail", { scaleX: 0, transformOrigin: "left center" }, {
        scaleX: 1, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: ".catalog-section .section-heading", start: "top 82%", once: true },
      });

      const reveal = (trigger: string, targets: string, stagger = 0.1) => {
        gsap.from(targets, {
          y: 34, autoAlpha: 0, duration: 0.72, stagger, ease: "power3.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: { trigger, start: "top 78%", once: true },
        });
      };

      reveal(".feature-strip", ".feature-strip-inner > div", 0.1);
      reveal(".catalog-section", ".catalog-section .section-heading > div, .catalog-count", 0.12);
      ScrollTrigger.batch(".tool-card", {
        start: "top 88%", once: true, interval: 0.12, batchMax: 3,
        onEnter: contextSafe!((cards: Element[]) => {
          gsap.from(cards, {
            y: 36, scale: 0.97, autoAlpha: 0, duration: 0.7, stagger: 0.09,
            ease: "power3.out", clearProps: "transform,opacity,visibility",
          });
        }),
      });
      reveal(".steps-section", ".steps-section .section-heading", 0);
      reveal(".steps-grid", ".steps-grid li", 0.13);
      reveal(".use-section", ".use-section .section-heading", 0);
      reveal(".use-grid", ".use-card", 0.18);
      reveal(".how-section", ".how-section .how-inner > div:first-child, .example-receipt", 0.2);

      ScrollTrigger.create({
        trigger: ".hero", start: "top bottom", end: "bottom top",
        onEnter: () => { heroVisible = true; syncDrill(); },
        onEnterBack: () => { heroVisible = true; syncDrill(); },
        onLeave: () => { heroVisible = false; syncDrill(); },
        onLeaveBack: () => { heroVisible = false; syncDrill(); },
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
      ScrollTrigger.refresh();
    }
    if (document.documentElement.dataset.loaderDone === "true") onLoaderDone();
    else {
      window.addEventListener("asbob:loader-done", onLoaderDone, { once: true });
      fallbackTimer = window.setTimeout(onLoaderDone, 3200);
    }

    return () => {
      if (fallbackTimer !== undefined) window.clearTimeout(fallbackTimer);
      window.removeEventListener("asbob:loader-done", onLoaderDone);
      media.revert();
    };
  }, { scope: root });

  return <main id="main-content" ref={root}>{children}</main>;
}
