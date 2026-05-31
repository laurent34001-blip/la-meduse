import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { partCategories, popularBrands } from "@/data/catalog";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <Link className="brand footer-brand" href="/">
            <span className="brand-image-mark">
              <Image
                src="/images/brand/trottipieces-logo-embleme.png"
                alt=""
                width={42}
                height={42}
              />
            </span>
            <Image
              className="brand-wordmark"
              src="/images/brand/trottipieces-logo-texte.png"
              alt="Trottipièces"
              width={190}
              height={38}
            />
          </Link>
          <p>
            Boutique française spécialisée dans les pièces détachées pour
            trottinettes électriques, pour particuliers, réparateurs et magasins.
          </p>
        </div>
        <div>
          <h2>Liens utiles</h2>
          <Link href="/boutique">Boutique</Link>
          <Link href="/demander-une-piece">Demander une pièce</Link>
          <Link href="/contact">Nous contacter</Link>
          <Link href="/pro">Espace professionnel</Link>
        </div>
        <div>
          <h2>Pièces principales</h2>
          {partCategories.slice(0, 8).map((item) => (
            <Link href={item.href} key={item.name}>
              {item.name}
            </Link>
          ))}
        </div>
        <div>
          <h2>Marques populaires</h2>
          {popularBrands.slice(0, 8).map((item) => (
            <Link href={item.href} key={item.name}>
              {item.name}
            </Link>
          ))}
        </div>
        <div>
          <h2>Contact</h2>
          <p className="footer-contact"><MapPin size={16} aria-hidden="true" /> France</p>
          <p className="footer-contact"><Mail size={16} aria-hidden="true" /> Support client français</p>
          <p className="footer-contact"><Phone size={16} aria-hidden="true" /> Lun-Ven, 9h-18h</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>{new Date().getFullYear()} Trottipièces</span>
        <Link href="/mentions-legales">Mentions légales</Link>
        <Link href="/cgv">CGV</Link>
        <Link href="/confidentialite">Politique de confidentialité</Link>
      </div>
    </footer>
  );
}
