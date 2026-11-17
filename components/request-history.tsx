"use client";

import Link from "next/link";
import Image from "next/image";
import { useSyncExternalStore } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { getRequestsSnapshot, getServerRequestsSnapshot, requestsFromSnapshot, subscribeRequests } from "@/lib/requests";
import { formatSom, getTool } from "@/lib/tools";

export function RequestHistory() {
  const snapshot = useSyncExternalStore(subscribeRequests, getRequestsSnapshot, getServerRequestsSnapshot);
  const requests = requestsFromSnapshot(snapshot);

  if (requests === null) return <p role="status" className="history-loading">So‘rovlar yuklanmoqda…</p>;
  if (requests.length === 0) return <div className="empty-state">
    <div className="empty-symbol" aria-hidden="true"><span /><span /><span /></div>
    <h2>Hozircha so‘rov yo‘q</h2>
    <p>Birinchi asbobingizni tanlang. Namuna so‘rovi shu brauzerda saqlanadi va keyin bu yerda ko‘rinadi.</p>
    <Link className="button button-primary" href="/#asboblar">Asboblarni ko‘rish <ArrowRightIcon /></Link>
  </div>;

  const combinedTotal = requests.reduce((sum, request) => sum + (getTool(request.toolId)?.dailyPrice ?? 0) * request.days, 0);
  return <div className="history-content">
    <div className="history-summary" aria-label="So‘rovlar qisqacha"><div><span>Saqlangan so‘rovlar</span><strong>{requests.length} ta</strong></div><div><span>Jami namuna hisob</span><strong>{formatSom(combinedTotal)}</strong></div><p>Bu qiymatlar faqat shu brauzerdagi namuna so‘rovlar asosida hisoblangan.</p></div>
    <div className="history-list">
    {requests.map((request) => {
      const tool = getTool(request.toolId);
      if (!tool) return null;
      const date = new Intl.DateTimeFormat("uz-UZ", { day: "numeric", month: "long", year: "numeric" }).format(new Date(request.createdAt));
      return <article className="history-item" key={request.id}>
        <div className="history-image"><Image src={tool.image} alt="" width={210} height={180} /></div>
        <div className="history-information">
          <div className="history-top"><span className="tool-code">{tool.id} · Namuna so‘rov</span><time dateTime={request.createdAt}>{date}</time></div>
          <h2>{tool.name}</h2><p className="history-description">{tool.description}</p>
          <dl className="history-facts"><div><dt>Ism</dt><dd>{request.name}</dd></div><div><dt>Muddat</dt><dd>{request.days} kun</dd></div><div><dt>Kunlik narx</dt><dd>{formatSom(tool.dailyPrice)}</dd></div></dl>
          <div className="history-bottom"><div><span>Jami hisob</span><strong>{formatSom(tool.dailyPrice * request.days)}</strong></div><Link href={`/muvaffaqiyat?id=${encodeURIComponent(request.id)}`} className="history-link">Kvitansiyani ko‘rish <ArrowRightIcon /></Link></div>
        </div>
      </article>;
    })}
    </div>
  </div>;
}
