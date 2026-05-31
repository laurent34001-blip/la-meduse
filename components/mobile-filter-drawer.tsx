"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { FilterSidebar } from "@/components/filter-sidebar";

type MobileFilterDrawerProps = {
  maxPrice?: number;
};

export function MobileFilterDrawer({ maxPrice }: MobileFilterDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mobile-filter">
      <button className="button button-secondary" type="button" onClick={() => setOpen(true)}>
        <SlidersHorizontal size={17} aria-hidden="true" />
        Filtres
      </button>
      {open ? (
        <div className="drawer" role="dialog" aria-modal="true" aria-label="Filtres boutique">
          <div className="drawer-backdrop" onClick={() => setOpen(false)} />
          <div className="drawer-panel">
            <button className="icon-button drawer-close" type="button" aria-label="Fermer les filtres" onClick={() => setOpen(false)}>
              <X size={18} aria-hidden="true" />
            </button>
            <FilterSidebar maxPrice={maxPrice} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
