"use client";

import Link from "next/link";
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

  return <div className="history-list">
    {requests.map((request) => {
      const tool = getTool(request.toolId);
      if (!tool) return null;
      const date = new Intl.DateTimeFormat("uz-UZ", { day: "numeric", month: "long", year: "numeric" }).format(new Date(request.createdAt));
      return <article className="history-item" key={request.id}>
        <div className="history-top"><span className="tool-code">{tool.id}</span><time dateTime={request.createdAt}>{date}</time></div>
        <div className="history-main"><div><h2>{tool.name}</h2><p>{request.name} · {request.days} kun · {formatSom(tool.dailyPrice)}/kun</p></div><strong>{formatSom(tool.dailyPrice * request.days)}</strong></div>
        <Link href={`/muvaffaqiyat?id=${encodeURIComponent(request.id)}`} className="history-link">Kvitansiyani ko‘rish <ArrowRightIcon /></Link>
      </article>;
    })}
  </div>;
}
