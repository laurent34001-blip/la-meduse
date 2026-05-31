"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { formatPrice, getProductPrice, type StoreProduct } from "@/lib/medusa";

type ProductResponse = {
  products?: StoreProduct[];
};

function highlight(text: string, query: string) {
  const index = text.toLowerCase().indexOf(query.toLowerCase());

  if (query.length < 3 || index === -1) {
    return text;
  }

  return (
    <>
      {text.slice(0, index)}
      <strong>{text.slice(index, index + query.length)}</strong>
      {text.slice(index + query.length)}
    </>
  );
}

export function HeaderSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const trimmedQuery = query.trim();

  useEffect(() => {
    if (!open) {
      return;
    }

    inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  useEffect(() => {
    if (trimmedQuery.length < 3) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setLoading(true);
      const abortTimeout = window.setTimeout(() => controller.abort(), 2400);
      try {
        const params = new URLSearchParams({ limit: "6", q: trimmedQuery });
        const response = await fetch(`/api/search-products?${params.toString()}`, {
          signal: controller.signal
        });

        if (!response.ok) {
          setProducts([]);
          return;
        }

        const data = (await response.json()) as ProductResponse;
        setProducts(data.products ?? []);
      } catch {
        if (!controller.signal.aborted) {
          setProducts([]);
        }
      } finally {
        window.clearTimeout(abortTimeout);
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 220);

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [trimmedQuery]);

  const shopHref = useMemo(() => {
    const params = new URLSearchParams();
    if (trimmedQuery) {
      params.set("q", trimmedQuery);
    }
    return `/boutique${params.size ? `?${params.toString()}` : ""}`;
  }, [trimmedQuery]);

  return (
    <div className={open ? "header-search is-open" : "header-search"} ref={panelRef}>
      <button
        className="nav-icon-link header-search-trigger"
        type="button"
        aria-label="Rechercher une piece"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <Search size={18} aria-hidden="true" />
        <span>Recherche</span>
      </button>

      {open ? (
        <div className="header-search-panel" role="search">
          <label>
            Rechercher un produit
            <div className="header-search-field">
              <Search size={18} aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ex: batterie Xiaomi, pneu Ninebot..."
                aria-describedby="header-search-help"
              />
              {query ? (
                <button type="button" aria-label="Effacer la recherche" onClick={() => setQuery("")}>
                  <X size={16} aria-hidden="true" />
                </button>
              ) : null}
            </div>
          </label>
          <p id="header-search-help">
            {trimmedQuery.length < 3
              ? "Saisissez au moins 3 caracteres pour voir les resultats."
              : loading
                ? "Recherche en cours..."
                : `${products.length} resultat${products.length > 1 ? "s" : ""}`}
          </p>

          {trimmedQuery.length >= 3 ? (
            <div className="header-search-results">
              {products.length > 0 ? (
                products.map((product) => {
                  const price = getProductPrice(product);

                  return (
                    <Link
                      className="header-search-result"
                      href={`/products/${product.handle}`}
                      key={product.id}
                      onClick={() => setOpen(false)}
                    >
                      <span className="header-search-thumb">
                        {product.thumbnail ? (
                          <Image src={product.thumbnail} alt="" width={54} height={54} />
                        ) : (
                          <span>T</span>
                        )}
                      </span>
                      <span>
                        <span className="result-title">{highlight(product.title, trimmedQuery)}</span>
                        <span className="result-price">{price ? formatPrice(price) : "Prix indisponible"}</span>
                      </span>
                    </Link>
                  );
                })
              ) : !loading ? (
                <p className="header-search-empty">Aucun produit trouve.</p>
              ) : null}
            </div>
          ) : null}

          <Link className="button button-secondary header-search-all" href={shopHref} onClick={() => setOpen(false)}>
            Voir dans la boutique
          </Link>
        </div>
      ) : null}
    </div>
  );
}
