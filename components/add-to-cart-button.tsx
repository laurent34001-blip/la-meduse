"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { addToCart } from "@/lib/medusa-client";

type AddToCartButtonProps = {
  productTitle: string;
  variantId: string;
  thumbnail?: string | null;
};

export function AddToCartButton({
  productTitle,
  variantId,
  thumbnail
}: AddToCartButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "added" | "error">("idle");

  async function handleClick() {
    setStatus("loading");
    try {
      await addToCart({ variantId, quantity: 1, productTitle, thumbnail });
      setStatus("added");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="cart-action">
      <button className="primary-button" type="button" onClick={handleClick} disabled={status === "loading"}>
        <ShoppingBag size={18} aria-hidden="true" />
        {status === "loading" ? "Ajout..." : "Ajouter au panier"}
      </button>
      {status === "added" ? <p>Produit ajouté.</p> : null}
      {status === "error" ? <p>Impossible d’ajouter le produit.</p> : null}
    </div>
  );
}
