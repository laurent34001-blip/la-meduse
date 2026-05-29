import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "La Meduse",
  description: "Storefront Medusa pour La Meduse"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <header className="site-header">
          <Link className="brand" href="/">
            La Meduse
          </Link>
          <nav className="main-nav" aria-label="Navigation principale">
            <Link href="/#products">Produits</Link>
            <Link className="cart-link" href="/cart" aria-label="Panier">
              <ShoppingBag size={18} aria-hidden="true" />
              Panier
            </Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
