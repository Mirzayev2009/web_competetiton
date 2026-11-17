import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { ToolCard } from "@/components/tool-card";
import { HomeMotion } from "@/components/home-motion";
import { formatSom, TOOLS } from "@/lib/tools";

export default function Home() {
  return <HomeMotion>
    <section className="hero shell" aria-labelledby="hero-heading">
      <div className="hero-copy">
        <h1 id="hero-heading">Ishingizga kerakli asbob. Kerakli muddatga.</h1>
        <p>Uy ishlari, taqdimot yoki tadbir uchun asbob tanlang. Narxni oldindan ko‘ring va bir necha qadamda namuna ijara so‘rovini yarating.</p>
        <div className="hero-actions"><Link className="button button-primary" href="#asboblar">Asboblarni ko‘rish <ArrowRightIcon /></Link><Link href="/tarix" className="text-link">So‘rovlar tarixi</Link></div>
        <p className="hero-note">So‘rov namuna sifatida faqat brauzeringizda saqlanadi.</p>
      </div>
      <div className="hero-visual" aria-hidden="true">
        <div className="hero-visual-top"><span>ASBOB / IJARA</span><span>01 — 06</span></div>
        <div className="hero-artwork"><span className="hero-art-id">{TOOLS[0].id} / {TOOLS[0].name}</span><span className="hero-art-ghost">01</span><Image className="hero-art-primary" src={TOOLS[0].image} alt="" width={740} height={540} priority /><div className="hero-art-inset"><Image src={TOOLS[1].image} alt="" width={180} height={180} /><span>{TOOLS[1].id}</span></div><span className="hero-art-ticks" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></span></div>
        <div className="hero-visual-bottom"><span>Har bir ish uchun o‘z asbobi.</span><span>{formatSom(TOOLS[0].dailyPrice)} / kun</span></div>
      </div>
    </section>

    <section id="asboblar" className="catalog-section" aria-labelledby="catalog-heading">
      <div className="shell">
        <div className="section-heading"><div><h2 id="catalog-heading">Asboblar katalogi</h2><p>Keraklisini tanlang — har birining kunlik narxi aniq ko‘rsatilgan.</p></div><span className="catalog-count">6 ta asbob</span></div>
        <div className="catalog-rail" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>
        <div className="tool-grid">{TOOLS.map((tool) => <ToolCard key={tool.id} tool={tool} />)}</div>
      </div>
    </section>

    <section className="how-section"><div className="shell how-inner"><div><h2>Tanlang. Muddatni belgilang. Narxni biling.</h2><p>So‘rov formasida jami summa darhol hisoblanadi. Tasdiqlangan namuna so‘rovini keyin tarix sahifasida ham ko‘rasiz.</p></div><Link href="#asboblar" className="button button-outline">Asbob tanlash <ArrowRightIcon /></Link></div></section>
  </HomeMotion>;
}
