"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRightIcon, MinusIcon, PlusIcon } from "@/components/icons";
import { AnimatedTotal } from "@/components/animated-total";
import { saveRequest, type RentalRequest } from "@/lib/requests";
import { formatSom, type CatalogTool } from "@/lib/tools";
import { validateDays, validateName } from "@/lib/validation";

gsap.registerPlugin(useGSAP);

export function RentalForm({ tool }: { tool: CatalogTool }) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [name, setName] = useState("");
  const [days, setDays] = useState("1");
  const [nameError, setNameError] = useState("");
  const [daysError, setDaysError] = useState("");
  const [storageError, setStorageError] = useState("");

  const validDays = validateDays(days) === "" ? Number(days.trim()) : null;
  const total = validDays === null ? null : tool.dailyPrice * validDays;

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from(".form-fields .field", { y: 10, autoAlpha: 0.75, duration: 0.42, stagger: 0.08, ease: "power2.out" });
    gsap.from(".cost-panel", { y: 14, autoAlpha: 0.75, duration: 0.5, delay: 0.12, ease: "power2.out" });
  }, { scope: formRef });

  function stepDays(direction: -1 | 1) {
    const next = validDays === null ? 1 : Math.max(1, Math.min(7, validDays + direction));
    setDays(String(next));
    setDaysError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextNameError = validateName(name);
    const nextDaysError = validateDays(days);
    setNameError(nextNameError);
    setDaysError(nextDaysError);
    setStorageError("");
    if (nextNameError || nextDaysError) return;

    const request: RentalRequest = {
      id: crypto.randomUUID(),
      name: name.trim(),
      toolId: tool.id,
      days: Number(days.trim()),
      createdAt: new Date().toISOString(),
    };

    if (!saveRequest(request)) {
      setStorageError("So‘rovni saqlab bo‘lmadi. Brauzer xotirasini tekshirib, qayta urinib ko‘ring.");
      return;
    }
    router.push(`/muvaffaqiyat?id=${encodeURIComponent(request.id)}`);
  }

  return <form ref={formRef} className="rental-form" onSubmit={handleSubmit} noValidate>
    <div className="form-fields">
      <div className="field">
        <label htmlFor="renter-name">Ismingiz</label>
        <input id="renter-name" name="name" type="text" autoComplete="name" placeholder="Masalan, Dilshod" value={name}
          onChange={(event) => { setName(event.target.value); if (nameError) setNameError(validateName(event.target.value)); }}
          onBlur={() => setNameError(validateName(name))} aria-invalid={Boolean(nameError)} aria-describedby={nameError ? "name-error" : undefined} />
        {nameError && <p className="field-error" id="name-error" role="alert">{nameError}</p>}
      </div>
      <div className="field">
        <label htmlFor="rental-days">Necha kunga?</label>
        <div className="days-control"><button type="button" className="day-step" onClick={() => stepDays(-1)} disabled={validDays === 1} aria-label="Muddatni bir kunga kamaytirish"><MinusIcon /></button><div className="input-suffix-wrap"><input id="rental-days" name="days" type="text" inputMode="numeric" autoComplete="off" value={days}
          onChange={(event) => { setDays(event.target.value); if (daysError) setDaysError(validateDays(event.target.value)); }}
          onBlur={() => setDaysError(validateDays(days))} aria-invalid={Boolean(daysError)} aria-describedby={daysError ? "days-error" : "days-hint"} /><span>kun</span></div><button type="button" className="day-step" onClick={() => stepDays(1)} disabled={validDays === 7} aria-label="Muddatni bir kunga oshirish"><PlusIcon /></button></div>
        {daysError ? <p className="field-error" id="days-error" role="alert">{daysError}</p> : <p className="field-hint" id="days-hint">1 kundan 7 kungacha</p>}
      </div>
    </div>

    <div className="cost-panel">
      <div className="cost-heading"><span>Hisob-kitob</span><span>UZS</span></div>
      <div className="cost-line"><span>Kunlik narx</span><strong>{formatSom(tool.dailyPrice)}</strong></div>
      <div className="cost-line"><span>Ijara muddati</span><strong>{validDays === null ? "—" : `${validDays} kun`}</strong></div>
      <div className="cost-total"><span>Jami</span><AnimatedTotal total={total} /></div>
    </div>

    {storageError && <p className="form-error" role="alert">{storageError}</p>}
    <button type="submit" className="button button-primary form-submit">Ijara so‘rovi <ArrowRightIcon /></button>
    <p className="form-disclaimer">Bu namuna so‘rov. Ma’lumotlar faqat shu brauzerda saqlanadi va hech kimga yuborilmaydi.</p>
  </form>;
}
