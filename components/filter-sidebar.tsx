"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { partCategories, popularBrands } from "@/data/catalog";

type FilterSidebarProps = {
  maxPrice?: number;
};

const minLimit = 0;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function FilterSidebar({ maxPrice = 1000 }: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const priceLimit = Math.max(1, Math.ceil(maxPrice));
  const [textFilters, setTextFilters] = useState({
    q: searchParams.get("q") ?? "",
    modele: searchParams.get("modele") ?? "",
    compatibilite: searchParams.get("compatibilite") ?? ""
  });
  const [prices, setPrices] = useState({
    min: clamp(Number(searchParams.get("prix_min") ?? minLimit), minLimit, priceLimit),
    max: clamp(Number(searchParams.get("prix_max") ?? priceLimit), minLimit, priceLimit)
  });

  const serializedParams = searchParams.toString();

  useEffect(() => {
    setTextFilters({
      q: searchParams.get("q") ?? "",
      modele: searchParams.get("modele") ?? "",
      compatibilite: searchParams.get("compatibilite") ?? ""
    });
    setPrices({
      min: clamp(Number(searchParams.get("prix_min") ?? minLimit), minLimit, priceLimit),
      max: clamp(Number(searchParams.get("prix_max") ?? priceLimit), minLimit, priceLimit)
    });
  }, [serializedParams, searchParams, priceLimit]);

  function replaceParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.replace(`${pathname}${params.size ? `?${params.toString()}` : ""}`, { scroll: false });
  }

  function updatePrice(nextMin: number, nextMax: number) {
    const cleanMin = clamp(Math.min(nextMin, nextMax), minLimit, priceLimit);
    const cleanMax = clamp(Math.max(nextMin, nextMax), minLimit, priceLimit);

    setPrices({ min: cleanMin, max: cleanMax });
    replaceParams({
      prix_min: cleanMin > minLimit ? String(cleanMin) : null,
      prix_max: cleanMax < priceLimit ? String(cleanMax) : null
    });
  }

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      replaceParams({
        q: textFilters.q.trim() || null,
        modele: textFilters.modele.trim() || null,
        compatibilite: textFilters.compatibilite.trim() || null
      });
    }, 260);

    return () => window.clearTimeout(timeout);
    // The URL update intentionally depends on local text input only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textFilters]);

  const rangeStyle = useMemo(() => {
    const minPercent = (prices.min / priceLimit) * 100;
    const maxPercent = (prices.max / priceLimit) * 100;
    return {
      "--range-min": `${minPercent}%`,
      "--range-max": `${maxPercent}%`
    } as CSSProperties;
  }, [prices, priceLimit]);

  return (
    <aside className="filter-panel">
      <div className="filter-title">
        <SlidersHorizontal size={18} aria-hidden="true" />
        <h2>Filtres</h2>
      </div>
      <div className="filter-form">
        <label>
          Recherche
          <input
            name="q"
            placeholder="Batterie M365, pneu..."
            value={textFilters.q}
            onChange={(event) => setTextFilters((current) => ({ ...current, q: event.target.value }))}
          />
        </label>
        <label>
          Marque
          <select
            name="marque"
            value={searchParams.get("marque") ?? ""}
            onChange={(event) => replaceParams({ marque: event.target.value || null })}
          >
            <option value="">Toutes les marques</option>
            {popularBrands.map((brand) => (
              <option value={brand.name} key={brand.name}>{brand.name}</option>
            ))}
          </select>
        </label>
        <label>
          Type de piece
          <select
            name="piece"
            value={searchParams.get("piece") ?? ""}
            onChange={(event) => replaceParams({ piece: event.target.value || null })}
          >
            <option value="">Toutes les pieces</option>
            {partCategories.map((category) => (
              <option value={category.name} key={category.name}>{category.name}</option>
            ))}
          </select>
        </label>
        <label>
          Modele de trottinette
          <input
            name="modele"
            placeholder="M365, G30, Dualtron..."
            value={textFilters.modele}
            onChange={(event) => setTextFilters((current) => ({ ...current, modele: event.target.value }))}
          />
        </label>
        <div className="price-range" style={rangeStyle}>
          <div className="price-range-values">
            <span>{prices.min}</span>
            <span>{prices.max}</span>
          </div>
          <div className="dual-range" aria-label="Filtrer par prix">
            <input
              aria-label="Prix minimum"
              type="range"
              min={minLimit}
              max={priceLimit}
              value={prices.min}
              onChange={(event) => updatePrice(Number(event.target.value), prices.max)}
            />
            <input
              aria-label="Prix maximum"
              type="range"
              min={minLimit}
              max={priceLimit}
              value={prices.max}
              onChange={(event) => updatePrice(prices.min, Number(event.target.value))}
            />
          </div>
          <p>Prix min / max</p>
        </div>
        <label>
          Disponibilite
          <select
            name="disponibilite"
            value={searchParams.get("disponibilite") ?? ""}
            onChange={(event) => replaceParams({ disponibilite: event.target.value || null })}
          >
            <option value="">Toutes</option>
            <option value="stock">En stock</option>
            <option value="rupture">Rupture</option>
          </select>
        </label>
        <label>
          Compatibilite
          <input
            name="compatibilite"
            placeholder="Xiaomi Pro 2..."
            value={textFilters.compatibilite}
            onChange={(event) => setTextFilters((current) => ({ ...current, compatibilite: event.target.value }))}
          />
        </label>
        <label className="checkbox-line">
          <input
            name="nouveautes"
            type="checkbox"
            value="1"
            checked={searchParams.get("nouveautes") === "1"}
            onChange={(event) => replaceParams({ nouveautes: event.target.checked ? "1" : null })}
          />
          <span>Nouveautes</span>
        </label>
        <label className="checkbox-line">
          <input
            name="meilleures_ventes"
            type="checkbox"
            value="1"
            checked={searchParams.get("meilleures_ventes") === "1"}
            onChange={(event) => replaceParams({ meilleures_ventes: event.target.checked ? "1" : null })}
          />
          <span>Meilleures ventes</span>
        </label>
        <Link className="button button-secondary" href="/boutique">
          <RotateCcw size={16} aria-hidden="true" />
          Reinitialiser
        </Link>
      </div>
    </aside>
  );
}
