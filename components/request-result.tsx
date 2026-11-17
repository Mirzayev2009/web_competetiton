"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSyncExternalStore } from "react";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from "@/components/icons";
import { getRequestsSnapshot, getServerRequestsSnapshot, requestsFromSnapshot, subscribeRequests } from "@/lib/requests";
import { formatSom, getTool } from "@/lib/tools";

export function RequestResult() {
  const requestId = useSearchParams().get("id") ?? "";
  const snapshot = useSyncExternalStore(subscribeRequests, getRequestsSnapshot, getServerRequestsSnapshot);
  const requests = requestsFromSnapshot(snapshot);
  const request = requests?.find((item) => item.id === requestId);
  const tool = request ? getTool(request.toolId) : undefined;

  if (requests === null) return <div className="result-card loading-card" role="status">So‘rov yuklanmoqda…</div>;
  if (!request || !tool) return <div className="result-card recovery-card">
    <div className="recovery-symbol" aria-hidden="true">?</div>
    <h1>So‘rov topilmadi</h1>
    <p>Bu havolaga tegishli so‘rov brauzer xotirasida yo‘q. Asbob tanlab, yangi namuna so‘rovini yuborishingiz mumkin.</p>
    <div className="result-actions"><Link className="button button-primary" href="/#asboblar">Asboblarni ko‘rish <ArrowRightIcon /></Link><Link className="text-link" href="/tarix">So‘rovlar tarixi</Link></div>
  </div>;

  return <div className="result-card receipt-card">
    <div className="receipt-head"><div className="success-symbol"><CheckIcon /></div><span className="receipt-type">Namuna kvitansiya</span></div>
    <h1>So‘rovingiz saqlandi.</h1>
    <p className="receipt-intro">{request.name}, ijara ma’lumotlaringiz shu brauzerda saqlandi.</p>
    <div className="receipt-rule" />
    <dl className="receipt-details">
      <div><dt>Ism</dt><dd>{request.name}</dd></div>
      <div><dt>Asbob</dt><dd>{tool.name}</dd></div>
      <div><dt>Ijara muddati</dt><dd>{request.days} kun</dd></div>
      <div><dt>Kunlik narx</dt><dd>{formatSom(tool.dailyPrice)}</dd></div>
    </dl>
    <div className="receipt-total"><span>Jami hisob</span><strong>{formatSom(tool.dailyPrice * request.days)}</strong></div>
    <p className="receipt-note">Bu namuna so‘rov asbobni band qilmaydi va hech kimga yuborilmaydi.</p>
    <div className="result-actions"><Link href="/tarix" className="button button-primary">So‘rovlar tarixi <ArrowRightIcon /></Link><Link href="/#asboblar" className="text-link"><ArrowLeftIcon /> Asboblarga qaytish</Link></div>
  </div>;
}
