import type { Metadata } from "next";
import { ProAccessBlock } from "@/components/pro-access-block";

export const metadata: Metadata = {
  title: "Espace professionnel",
  description:
    "Conditions professionnelles Trottipièces pour réparateurs, revendeurs, magasins et ateliers : tarifs HT après connexion et ouverture de compte."
};

export default function ProPage() {
  return (
    <main>
      <section className="section page-hero">
        <p className="eyebrow">B2B</p>
        <h1>Espace professionnel Trottipièces</h1>
        <p>
          Un parcours dédié aux réparateurs, revendeurs, ateliers, magasins et
          sociétés qui ont besoin de pièces détachées fiables pour trottinettes électriques.
        </p>
      </section>
      <ProAccessBlock />
    </main>
  );
}
