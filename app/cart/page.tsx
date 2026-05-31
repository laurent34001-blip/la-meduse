"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Trash2 } from "lucide-react";
import { getCart, removeLineItem, type Cart } from "@/lib/medusa-client";

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCart()
      .then(setCart)
      .finally(() => setLoading(false));
  }, []);

  async function handleRemove(lineItemId: string) {
    await removeLineItem(lineItemId);
    setCart(await getCart());
  }

  const items = cart?.items ?? [];

  return (
    <main className="section cart-page">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Commande</p>
          <h1>Panier</h1>
        </div>
        <Link className="secondary-button" href="/">
          Continuer les achats
        </Link>
      </div>

      {loading ? (
        <p className="muted">Chargement du panier...</p>
      ) : items.length > 0 ? (
        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => {
              const title = item.title ?? item.product_title ?? "Produit";

              return (
                <article className="cart-item" key={item.id}>
                  {item.thumbnail ? (
                    <Image src={item.thumbnail} alt="" width={96} height={96} />
                  ) : (
                    <div className="cart-thumb" />
                  )}
                  <div>
                    <h2>{title}</h2>
                    <p>Quantité : {item.quantity}</p>
                  </div>
                  <button
                    className="icon-button"
                    type="button"
                    onClick={() => handleRemove(item.id)}
                    aria-label={`Retirer ${title}`}
                    title="Retirer"
                  >
                    <Trash2 size={18} aria-hidden="true" />
                  </button>
                </article>
              );
            })}
          </div>
          <aside className="cart-summary">
            <h2>Résumé</h2>
            <p>{items.length} article{items.length > 1 ? "s" : ""}</p>
            {cart?.checkout_url ? (
              <a className="primary-button" href={cart.checkout_url}>
                Passer au paiement
              </a>
            ) : (
              <p className="muted">
                Connectez un flux de paiement Medusa pour activer le checkout.
              </p>
            )}
          </aside>
        </div>
      ) : (
        <div className="empty-state">
          <ShoppingBag size={34} aria-hidden="true" />
          <h2>Votre panier est vide</h2>
          <p>Ajoutez un produit depuis le catalogue pour commencer.</p>
        </div>
      )}
    </main>
  );
}
