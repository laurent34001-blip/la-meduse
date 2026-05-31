import type { Metadata } from "next";
import { RouteLoader } from "@/components/route-loader";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Trottipieces - Pieces detachees pour trottinettes electriques",
    template: "%s | Trottipieces"
  },
  description:
    "Boutique francaise de pieces detachees pour trottinettes electriques: Xiaomi M365, Ninebot, Dualtron, Kaabo, Vsett et plus."
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
