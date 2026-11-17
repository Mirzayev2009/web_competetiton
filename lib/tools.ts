export type Tool = {
  id: string;
  slug: string;
  name: string;
  description: string;
  dailyPrice: number;
  image: string;
};

export const TOOLS = [
  { id: "A01", slug: "drel", name: "Drel", description: "Teshish ishlari uchun", dailyPrice: 30000, image: "/tools/drel.svg" },
  { id: "A02", slug: "narvon", name: "Narvon", description: "Uy ichidagi ishlar uchun", dailyPrice: 20000, image: "/tools/narvon.svg" },
  { id: "A03", slug: "proyektor", name: "Proyektor", description: "Taqdimot uchun", dailyPrice: 100000, image: "/tools/proyektor.svg" },
  { id: "A04", slug: "mikrofon", name: "Mikrofon", description: "Kichik tadbir uchun", dailyPrice: 40000, image: "/tools/mikrofon.svg" },
  { id: "A05", slug: "tikuv-mashinasi", name: "Tikuv mashinasi", description: "Oddiy tikish ishlari uchun", dailyPrice: 60000, image: "/tools/tikuv-mashinasi.svg" },
  { id: "A06", slug: "gilam-tozalagich", name: "Gilam tozalagich", description: "Gilam tozalash uchun", dailyPrice: 80000, image: "/tools/gilam-tozalagich.svg" },
] as const satisfies readonly Tool[];

export type CatalogTool = (typeof TOOLS)[number];
export type ToolId = (typeof TOOLS)[number]["id"];

export function getTool(id: string) {
  return TOOLS.find((tool) => tool.id === id);
}

export function isToolId(id: unknown): id is ToolId {
  return typeof id === "string" && getTool(id) !== undefined;
}

export function formatSom(value: number): string {
  return `${Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so‘m`;
}
