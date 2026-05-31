import type { Metadata } from "next";
import { PackageSearch } from "lucide-react";
import { FilterSidebar } from "@/components/filter-sidebar";
import { MobileFilterDrawer } from "@/components/mobile-filter-drawer";
import { getProductBrand, getProductPartType } from "@/components/product-card";
import { ProductGrid } from "@/components/product-grid";
import { ShopSortSelect } from "@/components/shop-sort-select";
import { getProductPrice, getProducts, type StoreProduct } from "@/lib/medusa";

export const metadata: Metadata = {
  title: "Boutique pieces trottinette electrique",
  description:
    "Grand catalogue de pieces detachees pour trottinettes electriques: batteries, pneus, freins, chargeurs, moteurs, pieces Xiaomi M365, Ninebot et Dualtron."
};

type ShopPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function normalized(value: string | null | undefined) {
  return value?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") ?? "";
}

function matches(product: StoreProduct, params: Record<string, string | string[] | undefined>) {
  const q = normalized(first(params.q));
  const brand = normalized(first(params.marque));
  const piece = normalized(first(params.piece));
  const model = normalized(first(params.modele));
  const compatibility = normalized(first(params.compatibilite));
  const min = Number.parseFloat(first(params.prix_min));
  const max = Number.parseFloat(first(params.prix_max));
  const price = getProductPrice(product)?.amount;
  const haystack = normalized([
    product.title,
    product.description,
    getProductBrand(product),
    getProductPartType(product),
    product.collection?.title,
    product.categories?.map((category) => category.name).join(" "),
    product.tags?.map((tag) => tag.value).join(" "),
    Object.values(product.metadata ?? {}).join(" ")
  ].filter(Boolean).join(" "));

  if (q && !haystack.includes(q)) return false;
  if (brand && !haystack.includes(brand)) return false;
  if (piece && !haystack.includes(piece)) return false;
  if (model && !haystack.includes(model)) return false;
  if (compatibility && !haystack.includes(compatibility)) return false;
  if (!Number.isNaN(min) && price !== undefined && price < min) return false;
  if (!Number.isNaN(max) && price !== undefined && price > max) return false;

  return true;
}

function sortProducts(products: StoreProduct[], sort: string) {
  return [...products].sort((a, b) => {
    const priceA = getProductPrice(a)?.amount ?? 0;
    const priceB = getProductPrice(b)?.amount ?? 0;

    if (sort === "prix-asc") return priceA - priceB;
    if (sort === "prix-desc") return priceB - priceA;
    if (sort === "nom-az") return a.title.localeCompare(b.title, "fr");
    return 0;
  });
}

function hrefWithout(params: Record<string, string | string[] | undefined>, keyToRemove: string) {
  const next = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    const cleanValue = first(value);
    if (key !== keyToRemove && cleanValue) {
      next.set(key, cleanValue);
    }
  });

  return `/boutique${next.size ? `?${next.toString()}` : ""}`;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = (await searchParams) ?? {};
  const products = await getProducts(100);
  const maxPrice = Math.max(
    100,
    ...products.map((product) => getProductPrice(product)?.amount ?? 0)
  );
  const filtered = sortProducts(products.filter((product) => matches(product, params)), first(params.tri));
  const activeFilters = Object.entries(params).filter(([, value]) => first(value).length > 0);

  return (
    <main className="section shop-page">
      <div className="shop-heading">
        <div>
          <p className="eyebrow">Boutique</p>
          <h1>Pieces detachees pour trottinettes electriques</h1>
          <p>
            Catalogue Medusa optimise pour les grandes volumetries, avec recherche,
            filtres compatibles et grille compacte.
          </p>
        </div>
        <MobileFilterDrawer maxPrice={maxPrice} />
      </div>

      <div className="shop-toolbar">
        <p>{filtered.length} produit{filtered.length > 1 ? "s" : ""}</p>
        <div className="shop-sort-control">
          <ShopSortSelect />
        </div>
      </div>

      {activeFilters.length > 0 ? (
        <div className="active-filters" aria-label="Filtres actifs">
          {activeFilters.map(([key, value]) => (
            <a href={hrefWithout(params, key)} key={key} aria-label={`Supprimer le filtre ${key}`}>
              {key}: {first(value)}
            </a>
          ))}
          <a href="/boutique">Reinitialiser</a>
        </div>
      ) : null}

      <div className="shop-layout">
        <div className="desktop-filters">
          <FilterSidebar maxPrice={maxPrice} />
        </div>
        {filtered.length > 0 ? (
          <ProductGrid products={filtered} />
        ) : (
          <div className="empty-state">
            <PackageSearch size={34} aria-hidden="true" />
            <h2>Aucune piece trouvee</h2>
            <p>Essayez une autre marque, un autre modele ou reinitialisez les filtres.</p>
          </div>
        )}
      </div>
    </main>
  );
}
