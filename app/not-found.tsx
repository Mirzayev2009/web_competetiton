import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

export default function NotFound() {
  return <main id="main-content" className="inner-main result-main"><div className="shell result-shell"><div className="result-card recovery-card"><div className="recovery-symbol" aria-hidden="true">404</div><h1>Sahifa topilmadi</h1><p>Manzilni tekshiring yoki kerakli asbobni bosh sahifadan tanlang.</p><Link className="button button-primary" href="/#asboblar">Asboblarni ko‘rish <ArrowRightIcon /></Link></div></div></main>;
}
