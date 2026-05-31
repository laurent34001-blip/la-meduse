import { ProductCard } from "@/components/product-card";
import type { StoreProduct } from "@/lib/medusa";

type ProductGridProps = {
  products: StoreProduct[];
};

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
