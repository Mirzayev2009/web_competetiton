"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./site-loader.css";

gsap.registerPlugin(useGSAP);

function announceReady() {
  if (document.documentElement.dataset.loaderDone === "true") return;
  document.documentElement.dataset.loaderDone = "true";
  window.dispatchEvent(new Event("asbob:loader-done"));
}

/** Runs on each full page load. The page remains rendered behind the curtain. */
export function SiteLoader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const finishRef = useRef<() => void>(() => {});

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        delete document.documentElement.dataset.loaderPending;
        announceReady();
        return;
      }

      delete document.documentElement.dataset.loaderDone;
      const previousOverflow = document.body.style.overflow;
      const restoreBackground = () => {
        document.body.style.overflow = previousOverflow;
        if (root.contains(document.activeElement)) document.querySelector<HTMLElement>(".brand")?.focus({ preventScroll: true });
      };
      document.body.style.overflow = "hidden";
      gsap.set(root, { autoAlpha: 1, pointerEvents: "auto" });
      root.querySelector<HTMLButtonElement>(".site-loader__skip")?.focus({ preventScroll: true });

      let completed = false;
      const finish = () => {
        if (completed) return;
        completed = true;
        root.style.opacity = "0";
        root.style.visibility = "hidden";
        root.style.pointerEvents = "none";
        delete document.documentElement.dataset.loaderPending;
        restoreBackground();
        announceReady();
      };
      finishRef.current = finish;

      const timeline = gsap.timeline({ onComplete: finish });
      const progress = { value: 0 };
      const percent = root.querySelector<HTMLElement>(".site-loader__percent");
      timelineRef.current = timeline;
      timeline
        .fromTo(
          ".site-loader__slat",
          { yPercent: 110, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.62, stagger: 0.09, ease: "power2.out" },
          0,
        )
        .fromTo(
          ".site-loader__wordmark",
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.62, ease: "power3.out" },
          0.28,
        )
        .fromTo(
          ".site-loader__subtitle",
          { y: 10, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.48, ease: "power2.out" },
          0.62,
        )
        .fromTo(
          ".site-loader__progress-fill",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.65, ease: "power1.inOut" },
          0.36,
        )
        .to(progress, { value: 100, duration: 1.65, ease: "power1.inOut", onUpdate: () => { if (percent) percent.textContent = `${Math.round(progress.value).toString().padStart(2, "0")}%`; } }, 0.36)
        .to(root, { yPercent: -100, duration: 0.56, ease: "power3.inOut" }, 2.04);

      return () => {
        timeline.kill();
        timelineRef.current = null;
        finishRef.current = () => {};
        if (!completed) restoreBackground();
      };
    },
    { scope: rootRef },
  );

  return (
    <div className="site-loader" ref={rootRef} role="dialog" aria-modal="true" aria-label="Sayt ochilmoqda" onKeyDown={(event) => { if (event.key === "Tab") { event.preventDefault(); rootRef.current?.querySelector<HTMLButtonElement>(".site-loader__skip")?.focus(); } }}>
      <div className="site-loader__frame">
        <div className="site-loader__top" aria-hidden="true">
          <span>ASBOB / 01</span>
          <span>Asbob-uskunalar ijarasi</span>
        </div>

        <div className="site-loader__center">
          <div className="site-loader__slats" aria-hidden="true">
            <span className="site-loader__slat" />
            <span className="site-loader__slat" />
            <span className="site-loader__slat" />
            <span className="site-loader__slat" />
          </div>
          <div className="site-loader__wordmark">ASBOB<span>.</span></div>
          <p className="site-loader__subtitle">Kerakli asbob. Aniq hisob.</p>
        </div>

        <div className="site-loader__bottom">
          <div className="site-loader__progress" aria-hidden="true"><span className="site-loader__progress-fill" /></div>
          <div className="site-loader__bottom-row">
            <span role="status" aria-live="polite">Sayt ochilmoqda <span className="site-loader__percent" aria-hidden="true">00%</span></span>
            <button
              type="button"
              className="site-loader__skip"
              onClick={() => {
                timelineRef.current?.kill();
                finishRef.current();
              }}
            >
              O‘tkazib yuborish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
