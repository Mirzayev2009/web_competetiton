import Link from "next/link";

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="shell">
      <div className="footer-main">
        <div className="footer-brand-block">
          <Link className="footer-wordmark" href="/" aria-label="ASBOB. — bosh sahifa">ASBOB<span>.</span></Link>
          <p>Kerakli asbobni tanlang, muddatni belgilang va jami narxni oldindan biling.</p>
        </div>
        <nav className="footer-column" aria-label="Pastki navigatsiya">
          <h2>Sahifalar</h2>
          <Link href="/#asboblar">Asboblar katalogi</Link>
          <Link href="/#qanday-ishlaydi">Qanday ishlaydi?</Link>
          <Link href="/tarix">So‘rovlar tarixi</Link>
        </nav>
        <div className="footer-note">
          <span>NAMUNA LOYIHA</span>
          <p>So‘rovlar faqat shu brauzerda saqlanadi. To‘lov va haqiqiy band qilish amalga oshirilmaydi.</p>
        </div>
      </div>
      <div className="footer-bottom"><span>ASBOB. / Asbob-uskunalar ijarasi namunasi</span><a href="#page-top">Boshiga qaytish ↑</a></div>
    </div>
  </footer>;
}
