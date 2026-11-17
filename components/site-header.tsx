import Link from "next/link";

export function SiteHeader() {
  return <header className="site-header">
    <div className="shell header-inner">
      <Link className="brand" href="/" aria-label="Asbob ijara — bosh sahifa"><span className="brand-mark" aria-hidden="true"><span /><span /><span /></span><span>ASBOB<span className="brand-dot">.</span></span></Link>
      <nav className="main-nav" aria-label="Asosiy navigatsiya">
        <Link href="/#asboblar">Asboblar</Link>
        <Link href="/tarix">So‘rovlar tarixi</Link>
      </nav>
    </div>
  </header>;
}
