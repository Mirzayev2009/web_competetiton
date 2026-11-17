import Link from "next/link";

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="shell footer-inner">
      <span>ASBOB. <span className="footer-muted">Asbob-uskunalar ijarasi namunasi</span></span>
      <Link href="/#asboblar">Asboblarni ko‘rish</Link>
    </div>
  </footer>;
}
