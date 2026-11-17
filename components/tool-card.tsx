import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { formatSom, type CatalogTool } from "@/lib/tools";

export function ToolCard({ tool }: { tool: CatalogTool }) {
  return <article className="tool-card">
    <div className="tool-art"><Image src={tool.image} alt="" width={460} height={320} /></div>
    <div className="tool-card-body">
      <span className="tool-code">{tool.id}</span>
      <h3>{tool.name}</h3>
      <p>{tool.description}</p>
      <div className="tool-card-bottom">
        <div className="tool-price"><span>Kunlik narx</span><strong>{formatSom(tool.dailyPrice)}</strong></div>
        <Link href={`/ijara/${tool.id}`} className="card-link" aria-label={`${tool.name} uchun ijara so‘rovini boshlash`}>Tanlash <ArrowRightIcon /></Link>
      </div>
    </div>
  </article>;
}
