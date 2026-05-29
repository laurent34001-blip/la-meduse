import Image from "next/image";
import Link from "next/link";
import { formatPrice, getProductPrice, type StoreProduct } from "@/lib/medusa";

type ProductGridProps = {
  products: StoreProduct[];
};

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="product-grid">
      {products.map((product) => {
        const price = getProductPrice(product);

        return (
          <Link className="product-card" href={`/products/${product.handle}`} key={product.id}>
            <div className="product-card-media">
              {product.thumbnail ? (
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={640}
                  height={780}
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                />
              ) : (
                <div className="image-placeholder">La Meduse</div>
              )}
            </div>
            <div className="product-card-body">
              <h3>{product.title}</h3>
              <span>{price ? formatPrice(price) : "Prix indisponible"}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
