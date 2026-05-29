import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PackageSearch } from "lucide-react";
import { ProductGrid } from "@/components/product-grid";
import { getProducts } from "@/lib/medusa";

export default async function Home() {
  const products = await getProducts();

  return (
    <main>
      <section className="hero">
        <Image
          src="/images/hero-commerce.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">Storefront Medusa</p>
          <h1>La Meduse</h1>
          <p>
            Une vitrine e-commerce prête à se connecter à votre backend Medusa,
            avec catalogue, fiches produit et panier.
          </p>
          <Link className="primary-button" href="#products">
            Voir le catalogue
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section intro">
        <div>
          <p className="eyebrow">Commerce headless</p>
          <h2>Branché sur l’API Store de Medusa</h2>
        </div>
        <p>
          Configurez l’URL backend, la clé publishable et la région dans
          `.env.local`. Le site utilisera ensuite les produits, variantes et
          paniers exposés par Medusa.
        </p>
      </section>

      <section className="section" id="products">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Catalogue</p>
            <h2>Produits</h2>
          </div>
          {products.length > 0 ? (
            <span>{products.length} article{products.length > 1 ? "s" : ""}</span>
          ) : null}
        </div>
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="empty-state">
            <PackageSearch size={34} aria-hidden="true" />
            <h3>Aucun produit disponible</h3>
            <p>
              Lancez votre backend Medusa, ajoutez des produits publiés et
              renseignez `NEXT_PUBLIC_MEDUSA_BACKEND_URL`.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
