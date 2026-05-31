import type { Metadata } from "next";
import { ProAccessBlock } from "@/components/pro-access-block";

export const metadata: Metadata = {
  title: "Espace professionnel",
  description:
    "Conditions professionnelles Trottipieces pour reparateurs, revendeurs, magasins et ateliers: tarifs HT apres connexion et ouverture de compte."
};

export default function ProPage() {
  return (
    <main>
      <section className="section page-hero">
        <p className="eyebrow">B2B</p>
        <h1>Espace professionnel Trottipieces</h1>
        <p>
          Un parcours dedie aux reparateurs, revendeurs, ateliers, magasins et
          societes qui ont besoin de pieces detachees fiables pour trottinettes electriques.
        </p>
      </section>
      <ProAccessBlock />
    </main>
  );
}
