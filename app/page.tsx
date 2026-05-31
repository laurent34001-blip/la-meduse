import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, BadgeCheck, Headphones, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { ApiNotice } from "@/components/api-notice";
import { BrandCard } from "@/components/brand-card";
import { CategoryCard } from "@/components/category-card";
import { CTAButton } from "@/components/cta-button";
import { ProductGrid } from "@/components/product-grid";
import { SectionTitle } from "@/components/section-title";
import { partCategories, popularBrands } from "@/data/catalog";
import { getProductsResult } from "@/lib/medusa";

export const metadata: Metadata = {
  title: "Pièces détachées trottinette électrique",
  description:
    "Trottipièces, spécialiste français des pièces détachées pour trottinettes électriques : Xiaomi M365, Ninebot, Dualtron, batteries, pneus, freins et chargeurs."
};

export default async function Home() {
  const productsResult = await getProductsResult(20);
  const products = productsResult.products;
  const benefits = [
    { icon: Truck, title: "Livraison rapide", text: "Expédition soignée depuis la France selon disponibilité." },
    { icon: Headphones, title: "Service client en France", text: "Une équipe qui aide à identifier les bonnes compatibilités." },
    { icon: PackageCheck, title: "Large compatibilité", text: "Pièces pour de nombreux modèles urbains et premium." },
    { icon: BadgeCheck, title: "Tarifs professionnels", text: "Conditions HT préparées pour comptes B2B validés." },
    { icon: ShieldCheck, title: "Paiement sécurisé", text: "Parcours e-commerce clair, rassurant et connecté à Medusa." }
  ];

  return (
    <main>
      <section className="hero">
        <Image
          src="/images/hero-commerce.png"
          alt="Pièces détachées pour trottinettes électriques"
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">Spécialiste français</p>
          <h1>Trottipièces</h1>
          <p>
            Pièces détachées pour trottinettes électriques, conseils de compatibilité
            et accompagnement pour particuliers, réparateurs et revendeurs.
          </p>
          <div className="hero-actions">
            <CTAButton href="/boutique">Voir la boutique <ArrowRight size={18} aria-hidden="true" /></CTAButton>
            <CTAButton href="/demander-une-piece" variant="accent">Demander une pièce</CTAButton>
            <CTAButton href="/espace-pro" variant="secondary">Accès professionnel</CTAButton>
          </div>
        </div>
      </section>

      <section className="section intro">
        <SectionTitle
          eyebrow="Notre métier"
          title="Des pièces de trottinettes, un conseil humain"
          description="Basée en France, Trottipièces accompagne les clients qui veulent réparer, entretenir ou remettre en service leur trottinette électrique avec les bonnes pièces compatibles."
        />
        <div className="intro-points">
          <article><strong>Expertise trottinettes électriques</strong><span>Identification des pièces, modèles et variantes compatibles.</span></article>
          <article><strong>Stock de pièces détachées</strong><span>Batteries, pneus, freins, chargeurs, moteurs, displays et accessoires.</span></article>
          <article><strong>Service client français</strong><span>Une relation directe, claire et adaptée aux particuliers comme aux pros.</span></article>
          <article><strong>Accompagnement B2B</strong><span>Parcours dédié pour réparateurs, ateliers, sociétés et revendeurs.</span></article>
        </div>
      </section>

      <section className="section">
        <SectionTitle
          eyebrow="Marques populaires"
          title="Trouvez vos pièces par marque"
          description="Accédez rapidement aux pièces compatibles avec les marques les plus recherchées."
        />
        <div className="brand-grid">
          {popularBrands.map((brand) => <BrandCard item={brand} key={brand.name} />)}
        </div>
      </section>

      <section className="section section-soft">
        <SectionTitle
          eyebrow="Categories"
          title="Toutes les pièces d'une trottinette électrique"
          description="Filtrez le catalogue par type de pièce pour gagner du temps."
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
          <SectionTitle eyebrow="Catalogue" title="Pièces disponibles" />
          <CTAButton href="/boutique" variant="secondary">Voir tout le catalogue</CTAButton>
        </div>
        {productsResult.unavailable ? <ApiNotice /> : null}
        {products.length > 0 ? (
          <ProductGrid products={products.slice(0, 10)} />
        ) : (
          <div className="empty-state">
            <PackageCheck size={34} aria-hidden="true" />
            <h3>{productsResult.unavailable ? "Produits temporairement indisponibles" : "Aucune pièce en ligne pour le moment"}</h3>
            <p>
              {productsResult.unavailable
                ? "Le catalogue ne peut pas être chargé maintenant. Réessayez dans quelques instants."
                : "De nouvelles pièces seront ajoutées prochainement. Vous pouvez aussi nous demander une pièce précise."}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
