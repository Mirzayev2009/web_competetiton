import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { ToolCard } from "@/components/tool-card";
import { HomeMotion } from "@/components/home-motion";
import { HeroDrill } from "@/components/hero-drill";
import { formatSom, TOOLS } from "@/lib/tools";

const homeTools = TOOLS.filter((tool) => ["A01", "A02", "A05", "A06"].includes(tool.id));
const eventTools = TOOLS.filter((tool) => ["A03", "A04"].includes(tool.id));
const exampleTool = TOOLS[0];

export default function Home() {
  return <HomeMotion>
    <section className="hero shell" aria-labelledby="hero-heading">
      <div className="hero-copy">
        <span className="eyebrow">ASBOB / KUNLIK IJARA NAMUNASI</span>
        <h1 id="hero-heading">Ishingizga kerakli asbob. Kerakli muddatga.</h1>
        <p>Uy ishlari, taqdimot yoki tadbir uchun asbob tanlang. Narxni oldindan ko‘ring va bir necha qadamda namuna ijara so‘rovini yarating.</p>
        <div className="hero-actions"><Link className="button button-primary" href="#asboblar">Asboblarni ko‘rish <ArrowRightIcon /></Link><Link href="/tarix" className="text-link">So‘rovlar tarixi</Link></div>
        <p className="hero-note">So‘rov namuna sifatida faqat brauzeringizda saqlanadi.</p>
      </div>
      <div className="hero-visual" aria-hidden="true">
        <div className="hero-visual-top"><span>ASBOB / IJARA</span><span>01 — 06</span></div>
        <div className="hero-artwork"><span className="hero-art-id">{exampleTool.id} / {exampleTool.name}</span><span className="hero-art-ghost">01</span><div className="hero-tool-stage"><HeroDrill /></div><div className="hero-art-inset"><Image src={TOOLS[1].image} alt="" width={180} height={180} /><span>{TOOLS[1].id}</span></div><span className="hero-art-ticks" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></span></div>
        <div className="hero-visual-bottom"><span>Har bir ish uchun o‘z asbobi.</span><span>{formatSom(exampleTool.dailyPrice)} / kun</span></div>
      </div>
    </section>

    <div className="feature-strip"><div className="shell feature-strip-inner"><div><strong>06</strong><span>aniq narxli asbob</span></div><div><strong>1–7</strong><span>kunlik muddat</span></div><div><strong>×</strong><span>narx × muddat = jami</span></div></div></div>

    <section id="asboblar" className="catalog-section" aria-labelledby="catalog-heading">
      <div className="shell">
        <div className="section-heading"><div><span className="eyebrow">01 / KATALOG</span><h2 id="catalog-heading">Asboblar katalogi</h2><p>Keraklisini tanlang — har birining kunlik narxi aniq ko‘rsatilgan.</p></div><span className="catalog-count">6 ta asbob</span></div>
        <div className="catalog-rail" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>
        <div className="tool-grid">{TOOLS.map((tool) => <ToolCard key={tool.id} tool={tool} />)}</div>
      </div>
    </section>

    <section id="qanday-ishlaydi" className="steps-section" aria-labelledby="steps-heading">
      <div className="shell">
        <div className="section-heading"><div><span className="eyebrow">02 / JARAYON</span><h2 id="steps-heading">Uch qadam. Aniq summa.</h2><p>Kerakli asbobdan namuna so‘rovigacha — hammasi shu yerda.</p></div></div>
        <ol className="steps-grid">
          <li><span className="step-number">01</span><h3>Asbobni tanlang</h3><p>Olti asbobning vazifasi va kunlik narxini solishtiring.</p></li>
          <li><span className="step-number">02</span><h3>Muddatni kiriting</h3><p>Ismingizni va 1 kundan 7 kungacha muddatni belgilang. Jami narx darhol o‘zgaradi.</p></li>
          <li><span className="step-number">03</span><h3>So‘rovni saqlang</h3><p>Namuna kvitansiyani ko‘ring. U brauzeringizdagi so‘rovlar tarixida ham qoladi.</p></li>
        </ol>
      </div>
    </section>

    <section className="use-section" aria-labelledby="use-heading">
      <div className="shell">
        <div className="section-heading"><div><span className="eyebrow">03 / QAYERDA KERAK?</span><h2 id="use-heading">Rejangizga mos asbob</h2><p>Uy yumushi yoki kichik tadbir — ish turidan boshlang.</p></div></div>
        <div className="use-grid">
          <div className="use-card"><div className="use-card-head"><span>UYDA</span><span>04 ASBOB</span></div><div className="use-card-visual" aria-hidden="true"><Image src={TOOLS[1].image} alt="" width={220} height={220} /><Image src={exampleTool.image} alt="" width={220} height={220} /></div><h3>Uy ishlariga</h3><p>Teshish, baland joyda ishlash, tikish yoki gilam tozalash uchun.</p><div className="use-links">{homeTools.map((tool) => <Link key={tool.id} href={`/ijara/${tool.id}`}><span>{tool.name}</span><span>{formatSom(tool.dailyPrice)} <ArrowRightIcon /></span></Link>)}</div></div>
          <div className="use-card use-card-event"><div className="use-card-head"><span>TADBIRDA</span><span>02 ASBOB</span></div><div className="use-card-visual" aria-hidden="true"><Image src={TOOLS[2].image} alt="" width={220} height={220} /><Image src={TOOLS[3].image} alt="" width={220} height={220} /></div><h3>Taqdimot va tadbirga</h3><p>Tasvirni ko‘rsatish va ovozni yetkazish uchun.</p><div className="use-links">{eventTools.map((tool) => <Link key={tool.id} href={`/ijara/${tool.id}`}><span>{tool.name}</span><span>{formatSom(tool.dailyPrice)} <ArrowRightIcon /></span></Link>)}</div></div>
        </div>
      </div>
    </section>

    <section className="how-section" aria-labelledby="example-heading"><div className="shell how-inner"><div><span className="eyebrow">04 / NARX MISOLI</span><h2 id="example-heading">Narxni oldindan biling.</h2><p>Har bir so‘rovda kunlik narx muddatga ko‘paytiriladi. Hisob-kitob formani to‘ldirayotganingizda yangilanadi.</p><Link href={`/ijara/${exampleTool.id}`} className="button button-outline">Drel uchun so‘rov <ArrowRightIcon /></Link></div><div className="example-receipt"><div className="example-receipt-top"><span>HISOB-KITOB / NAMUNA</span><span>{exampleTool.id}</span></div><div className="example-receipt-line"><span>Asbob</span><strong>{exampleTool.name}</strong></div><div className="example-receipt-line"><span>Kunlik narx</span><strong>{formatSom(exampleTool.dailyPrice)}</strong></div><div className="example-receipt-line"><span>Muddat</span><strong>3 kun</strong></div><div className="example-receipt-total"><span>Jami</span><strong>{formatSom(exampleTool.dailyPrice * 3)}</strong></div><p>Bu namuna hisob. Haqiqiy to‘lov yoki band qilish amalga oshirilmaydi.</p></div></div></section>
  </HomeMotion>;
}
