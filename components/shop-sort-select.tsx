"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function ShopSortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateSort(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("tri", value);
    } else {
      params.delete("tri");
    }

    router.replace(`${pathname}${params.size ? `?${params.toString()}` : ""}`, { scroll: false });
  }

  return (
    <label>
      Trier
      <select
        name="tri"
        value={searchParams.get("tri") ?? ""}
        aria-label="Trier les produits"
        onChange={(event) => updateSort(event.target.value)}
      >
        <option value="">Pertinence</option>
        <option value="prix-asc">Prix croissant</option>
        <option value="prix-desc">Prix decroissant</option>
        <option value="nouveautes">Nouveautes</option>
        <option value="nom-az">Nom A-Z</option>
      </select>
    </label>
  );
}
