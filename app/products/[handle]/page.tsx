import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { formatPrice, getProductByHandle, getProductPrice } from "@/lib/medusa";

type ProductPageProps = {
  params: Promise<{
    handle: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const price = getProductPrice(product);
  const firstVariant = product.variants?.[0];

  return (
    <main className="product-page">
      <Link className="back-link" href="/">
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
            <div className="image-placeholder">La Meduse</div>
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
