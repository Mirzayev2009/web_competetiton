"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./site-loader.css";

gsap.registerPlugin(useGSAP);

const SESSION_KEY = "asbob-intro-seen-v1";
let seenWithoutStorage = false;

function announceReady() {
  if (document.documentElement.dataset.loaderDone === "true") return;
  document.documentElement.dataset.loaderDone = "true";
  window.dispatchEvent(new Event("asbob:loader-done"));
}

/** Short, one-per-tab opening sequence. The page remains rendered behind the curtain. */
export function SiteLoader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const finishRef = useRef<() => void>(() => {});

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      let seen = seenWithoutStorage;
      try {
        seen ||= sessionStorage.getItem(SESSION_KEY) === "1";
      } catch {
        // The intro still works once in this tab when storage is unavailable.
      }

      if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        delete document.documentElement.dataset.loaderPending;
        announceReady();
        return;
      }

      delete document.documentElement.dataset.loaderDone;
      const previousOverflow = document.body.style.overflow;
      const background = Array.from(document.body.children)
        .filter((element): element is HTMLElement => element instanceof HTMLElement && element !== root)
        .map((element) => ({ element, wasInert: element.inert }));
      const restoreBackground = () => {
        for (const { element, wasInert } of background) element.inert = wasInert;
        document.body.style.overflow = previousOverflow;
        if (root.contains(document.activeElement)) document.querySelector<HTMLElement>(".brand")?.focus({ preventScroll: true });
      };
      for (const { element } of background) element.inert = true;
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
        seenWithoutStorage = true;
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          // A blocked storage API must not block the site.
        }
        announceReady();
      };
      finishRef.current = finish;

      const timeline = gsap.timeline({ onComplete: finish });
      timelineRef.current = timeline;
      timeline
        .fromTo(
          ".site-loader__slat",
          { yPercent: 110, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.39, stagger: 0.055, ease: "power2.out" },
          0,
        )
        .fromTo(
          ".site-loader__wordmark",
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.42, ease: "power3.out" },
          0.12,
        )
        .fromTo(
          ".site-loader__subtitle",
          { y: 10, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.32, ease: "power2.out" },
          0.27,
        )
        .fromTo(
          ".site-loader__progress-fill",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.73, ease: "power1.inOut" },
          0.16,
        )
        .to(root, { yPercent: -100, duration: 0.38, ease: "power3.inOut" }, 0.88);

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
    <div className="site-loader" ref={rootRef} role="dialog" aria-modal="true" aria-label="Sayt ochilmoqda">
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
            <span role="status" aria-live="polite">Sayt ochilmoqda</span>
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
