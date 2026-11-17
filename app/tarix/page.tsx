import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons";
import { RequestHistory } from "@/components/request-history";

export const metadata: Metadata = { title: "So‘rovlar tarixi | ASBOB." };

export default function HistoryPage() {
  return <main id="main-content" className="inner-main history-main"><div className="shell">
    <Link href="/#asboblar" className="back-link"><ArrowLeftIcon /> Asboblarga qaytish</Link>
    <div className="history-head"><div><h1>So‘rovlar tarixi</h1><p>Ushbu brauzerda saqlangan namuna ijara so‘rovlari.</p></div><span className="history-stamp">Mahalliy saqlangan</span></div>
    <RequestHistory />
  </div></main>;
}
