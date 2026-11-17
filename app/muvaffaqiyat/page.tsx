import type { Metadata } from "next";
import { Suspense } from "react";
import { RequestResult } from "@/components/request-result";

export const metadata: Metadata = { title: "So‘rov saqlandi | ASBOB." };

export default function SuccessPage() {
  return <main id="main-content" className="inner-main result-main"><div className="shell result-shell"><Suspense fallback={<div className="result-card loading-card" role="status">So‘rov yuklanmoqda…</div>}><RequestResult /></Suspense></div></main>;
}
