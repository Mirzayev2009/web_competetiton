import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@/components/icons";
import { RentalForm } from "@/components/rental-form";
import { formatSom, getTool, TOOLS } from "@/lib/tools";

export function generateStaticParams() {
  return TOOLS.map((tool) => ({ id: tool.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const tool = getTool(id);
  return { title: tool ? `${tool.name} ijarasi | ASBOB.` : "Asbob topilmadi | ASBOB." };
}

export default async function RentalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tool = getTool(id);
  if (!tool) notFound();

  return <main id="main-content" className="inner-main">
    <div className="shell"><Link href="/#asboblar" className="back-link"><ArrowLeftIcon /> Barcha asboblar</Link></div>
    <section className="shell rental-layout" aria-labelledby="rental-heading">
      <div className="rental-overview">
        <div className="rental-art"><Image src={tool.image} alt="" width={700} height={520} priority /></div>
        <span className="tool-code">{tool.id} / Asbob-uskunalar</span>
        <h1 id="rental-heading">{tool.name}</h1>
        <p>{tool.description}</p>
        <div className="overview-price"><span>Kunlik narx</span><strong>{formatSom(tool.dailyPrice)} <small>/ kun</small></strong></div>
      </div>
      <div className="form-column"><div className="form-head"><h2>Ijara so‘rovi</h2><p>Ma’lumotlarni kiriting. Jami summa darhol hisoblanadi.</p></div><RentalForm tool={tool} /></div>
    </section>
  </main>;
}
