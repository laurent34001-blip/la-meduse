import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ApiNotice } from "@/components/api-notice";
import { formatPrice, getProductByHandleResult, getProductPrice } from "@/lib/medusa";

type ProductPageProps = {
  params: Promise<{
    handle: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const productResult = await getProductByHandleResult(handle);
  const product = productResult.product;

  if (!product) {
    if (productResult.unavailable) {
      return (
        <main className="product-page">
          <Link className="back-link" href="/boutique">
            Retour au catalogue
          </Link>
          <ApiNotice
            title="Produit momentanément indisponible"
            text="La fiche produit ne peut pas être chargée pour le moment. Vous pouvez revenir au catalogue ou réessayer dans quelques instants."
          />
        </main>
      );
    }
    notFound();
  }

  const price = getProductPrice(product);
  const firstVariant = product.variants?.[0];

  return (
    <main className="product-page">
      <Link className="back-link" href="/boutique">
        Retour au catalogue
      </Link>
      <section className="product-detail">
        <div className="product-media">
          {product.thumbnail ? (
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={900}
              height={1100}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          ) : (
            <div className="image-placeholder">Trottipièces</div>
          )}
        </div>
        <div className="product-info">
          <p className="eyebrow">Produit</p>
          <h1>{product.title}</h1>
          {product.description ? <p>{product.description}</p> : null}
          <strong className="price">{price ? formatPrice(price) : "Prix à configurer"}</strong>
          {firstVariant ? (
            <AddToCartButton
              productTitle={product.title}
              variantId={firstVariant.id}
              thumbnail={product.thumbnail}
            />
          ) : (
            <p className="muted">Aucune variante disponible pour ce produit.</p>
          )}
        </div>
      </section>
    </main>
  );
}
