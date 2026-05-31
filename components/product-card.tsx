import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { formatPrice, getProductPrice, type StoreProduct } from "@/lib/medusa";

type ProductCardProps = {
  product: StoreProduct;
};

function readString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export function getProductBrand(product: StoreProduct) {
  return (
    readString(product.metadata?.brand) ??
    readString(product.metadata?.marque) ??
    product.tags?.find((tag) => tag.value?.toLowerCase().startsWith("marque:"))?.value?.split(":")[1]?.trim() ??
    null
  );
}

export function getProductPartType(product: StoreProduct) {
  return (
    readString(product.metadata?.part_type) ??
    readString(product.metadata?.piece) ??
    product.categories?.[0]?.name ??
    null
  );
}

export function ProductCard({ product }: ProductCardProps) {
  const price = getProductPrice(product);
  const brand = getProductBrand(product);

  return (
    <article className="product-card">
      <Link className="product-card-media" href={`/products/${product.handle}`} aria-label={`Voir ${product.title}`}>
        {product.thumbnail ? (
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={520}
            height={620}
            sizes="(max-width: 560px) 50vw, (max-width: 900px) 33vw, (max-width: 1280px) 25vw, 20vw"
          />
        ) : (
          <div className="image-placeholder">Trottipièces</div>
        )}
      </Link>
      <div className="product-card-body">
        <div>
          {brand ? <p className="product-meta">Compatible {brand}</p> : <p className="product-meta">Pièce trottinette</p>}
          <h3>
            <Link href={`/products/${product.handle}`}>{product.title}</Link>
          </h3>
        </div>
        <div className="product-card-bottom">
          <strong>{price ? formatPrice(price) : "Prix indisponible"}</strong>
          <span className="stock-badge" aria-label="Disponibilite selon variante">Stock selon variante</span>
        </div>
        <Link className="button button-compact" href={`/products/${product.handle}`}>
          <ShoppingBag size={16} aria-hidden="true" />
          Voir le produit
        </Link>
      </div>
    </article>
  );
}
