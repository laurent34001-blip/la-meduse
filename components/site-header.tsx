"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { HeaderSearch } from "@/components/header-search";

const navigation = [
  { label: "Accueil", href: "/" },
  { label: "Boutique", href: "/boutique" },
  { label: "Demander une piece", href: "/demander-une-piece" },
  { label: "Nous contacter", href: "/contact" },
  { label: "Espace pro", href: "/espace-pro" }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
      <Link className="brand" href="/" onClick={() => setOpen(false)}>
        <span className="brand-mark">T</span>
        <span>Trottipieces</span>
      </Link>

      <button
        className="menu-button"
        type="button"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>

      <nav className={open ? "main-nav is-open" : "main-nav"} aria-label="Navigation principale">
        {navigation.map((item) => (
          <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
        <HeaderSearch />
        <Link className="nav-icon-link" href="/compte" aria-label="Compte client" onClick={() => setOpen(false)}>
          <UserRound size={18} aria-hidden="true" />
          <span>Compte</span>
        </Link>
        <Link className="cart-link" href="/cart" aria-label="Panier" onClick={() => setOpen(false)}>
          <ShoppingBag size={18} aria-hidden="true" />
          <span>Panier</span>
        </Link>
      </nav>

      <nav className="mobile-tab-bar" aria-label="Actions mobiles">
        <Link href="/boutique" aria-label="Boutique">
          <Search size={20} aria-hidden="true" />
          <span>Boutique</span>
        </Link>
        <Link href="/demander-une-piece" aria-label="Demander une piece">
          <span className="tab-plus">+</span>
          <span>Piece</span>
        </Link>
        <Link href="/cart" aria-label="Panier">
          <ShoppingBag size={20} aria-hidden="true" />
          <span>Panier</span>
        </Link>
        <Link href="/compte" aria-label="Compte client">
          <UserRound size={20} aria-hidden="true" />
          <span>Compte</span>
        </Link>
      </nav>
    </header>
  );
}
