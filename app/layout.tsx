import type { Metadata } from "next";
import { RouteLoader } from "@/components/route-loader";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Trottipièces - Pièces détachées pour trottinettes électriques",
    template: "%s | Trottipièces"
  },
  description:
    "Boutique française de pièces détachées pour trottinettes électriques : Xiaomi M365, Ninebot, Dualtron, Kaabo, Vsett et plus."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <RouteLoader />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
