import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "ASBOB. | Asbob-uskunalar ijarasi", template: "%s" },
  description: "Asbob-uskunalar uchun namuna ijara so‘rovi: asbob tanlang, muddatni belgilang va jami narxni darhol ko‘ring.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="uz"><body><a className="skip-link" href="#main-content">Asosiy mazmunga o‘tish</a><SiteHeader />{children}<SiteFooter /></body></html>;
}
