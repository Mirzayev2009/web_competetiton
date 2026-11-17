"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 721px)");
    const onChange = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return <header id="page-top" className="site-header" ref={headerRef}>
    <div className="shell header-inner">
      <Link className="brand" href="/" aria-label="Asbob ijara — bosh sahifa" onClick={() => setOpen(false)}><span className="brand-mark" aria-hidden="true"><span /><span /><span /></span><span>ASBOB<span className="brand-dot">.</span></span></Link>
      <button ref={buttonRef} className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? "Menyuni yopish" : "Menyuni ochish"} onClick={() => setOpen((value) => !value)}>
        <span className="menu-toggle-lines" aria-hidden="true"><span /><span /><span /></span><span className="menu-toggle-text">Menyu</span>
      </button>
      <nav id="main-navigation" className="main-nav" aria-label="Asosiy navigatsiya" data-open={open}>
        <Link href="/#asboblar" onClick={() => setOpen(false)}>Asboblar</Link>
        <Link href="/#qanday-ishlaydi" onClick={() => setOpen(false)}>Qanday ishlaydi?</Link>
        <Link href="/tarix" onClick={() => setOpen(false)}>So‘rovlar tarixi</Link>
      </nav>
    </div>
  </header>;
}
