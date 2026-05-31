import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, BadgeCheck, Headphones, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { BrandCard } from "@/components/brand-card";
import { CategoryCard } from "@/components/category-card";
import { CTAButton } from "@/components/cta-button";
import { ProductGrid } from "@/components/product-grid";
import { SectionTitle } from "@/components/section-title";
import { partCategories, popularBrands } from "@/data/catalog";
import { getProducts } from "@/lib/medusa";

export const metadata: Metadata = {
  title: "Pieces detachees trottinette electrique",
  description:
    "Trottipieces, specialiste francais des pieces detachees pour trottinettes electriques: Xiaomi M365, Ninebot, Dualtron, batteries, pneus, freins et chargeurs."
};

export default async function Home() {
  const products = await getProducts(20);
  const benefits = [
    { icon: Truck, title: "Livraison rapide", text: "Expedition soignee depuis la France selon disponibilite." },
    { icon: Headphones, title: "Service client en France", text: "Une equipe qui aide a identifier les bonnes compatibilites." },
    { icon: PackageCheck, title: "Large compatibilite", text: "Pieces pour de nombreux modeles urbains et premium." },
    { icon: BadgeCheck, title: "Tarifs professionnels", text: "Conditions HT preparees pour comptes B2B valides." },
    { icon: ShieldCheck, title: "Paiement securise", text: "Parcours e-commerce clair, rassurant et connecte a Medusa." }
  ];

  return (
    <main>
      <section className="hero">
        <Image
          src="/images/hero-commerce.png"
          alt="Pieces detachees pour trottinettes electriques"
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">Specialiste francais</p>
          <h1>Trottipieces</h1>
          <p>
            Pieces detachees pour trottinettes electriques, conseils de compatibilite
            et accompagnement pour particuliers, reparateurs et revendeurs.
          </p>
          <div className="hero-actions">
            <CTAButton href="/boutique">Voir la boutique <ArrowRight size={18} aria-hidden="true" /></CTAButton>
            <CTAButton href="/demander-une-piece" variant="accent">Demander une piece</CTAButton>
            <CTAButton href="/espace-pro" variant="secondary">Acces professionnel</CTAButton>
          </div>
        </div>
      </section>

      <section className="section intro">
        <SectionTitle
          eyebrow="Notre metier"
          title="Des pieces de trottinettes, un conseil humain"
          description="Basee en France, Trottipieces accompagne les clients qui veulent reparer, entretenir ou remettre en service leur trottinette electrique avec les bonnes pieces compatibles."
        />
        <div className="intro-points">
          <article><strong>Expertise trottinettes electriques</strong><span>Identification des pieces, modeles et variantes compatibles.</span></article>
          <article><strong>Stock de pieces detachees</strong><span>Batteries, pneus, freins, chargeurs, moteurs, displays et accessoires.</span></article>
          <article><strong>Service client francais</strong><span>Une relation directe, claire et adaptee aux particuliers comme aux pros.</span></article>
          <article><strong>Accompagnement B2B</strong><span>Parcours dedie pour reparateurs, ateliers, societes et revendeurs.</span></article>
        </div>
      </section>

      <section className="section">
        <SectionTitle
          eyebrow="Marques populaires"
          title="Trouvez vos pieces par marque"
          description="Accedez rapidement aux pieces compatibles avec les marques les plus recherchees."
        />
        <div className="brand-grid">
          {popularBrands.map((brand) => <BrandCard item={brand} key={brand.name} />)}
        </div>
      </section>

      <section className="section section-soft">
        <SectionTitle
          eyebrow="Categories"
          title="Toutes les pieces d'une trottinette electrique"
          description="Filtrez le catalogue par type de piece pour gagner du temps."
        />
        <div className="category-grid">
          {partCategories.map((category) => <CategoryCard item={category} key={category.name} />)}
        </div>
      </section>

      <section className="section">
        <SectionTitle
          eyebrow="Avantages"
          title="Un achat clair, fiable et rassurant"
        />
        <div className="feature-grid">
          {benefits.map((item) => (
            <article className="feature-card" key={item.title}>
              <item.icon size={24} aria-hidden="true" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="products">
        <div className="section-heading">
          <SectionTitle eyebrow="Catalogue" title="Pieces disponibles" />
          <CTAButton href="/boutique" variant="secondary">Voir tout le catalogue</CTAButton>
        </div>
        {products.length > 0 ? (
          <ProductGrid products={products.slice(0, 10)} />
        ) : (
          <div className="empty-state">
            <PackageCheck size={34} aria-hidden="true" />
            <h3>Catalogue Medusa a connecter</h3>
            <p>
              Lancez le backend Medusa, publiez des produits et configurez
              `NEXT_PUBLIC_MEDUSA_BACKEND_URL` pour afficher les pieces.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
