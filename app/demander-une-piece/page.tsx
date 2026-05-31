import type { Metadata } from "next";
import { RequestPartForm } from "@/components/request-part-form";
import { scooterBrands, scooterModels } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Demander une pièce",
  description:
    "Demandez une pièce de trottinette introuvable. Trottipièces aide à identifier les pièces compatibles Xiaomi M365, Ninebot, Dualtron, Kaabo, Vsett et plus."
};

export default function RequestPartPage() {
  return (
    <main className="section form-page">
      <section className="page-hero compact">
        <p className="eyebrow">Pièce introuvable</p>
        <h1>Demander une pièce</h1>
        <p>
          Vous ne trouvez pas la pièce dont vous avez besoin ? Envoyez-nous les
          informations de votre trottinette et, si possible, des photos. Notre equipe
          vous aide à identifier la bonne pièce compatible.
        </p>
      </section>

      <section className="contact-layout">
        <RequestPartForm />
        <aside className="contact-card">
          <h2>Pour une réponse précise</h2>
          <p>Ajoutez la marque, le modèle exact, l&apos;année si connue et une photo de la pièce ou de l&apos;étiquette produit.</p>
          <p>Les demandes professionnelles peuvent être rattachées à une ouverture de compte B2B.</p>
        </aside>
      </section>

      <section className="section no-x-padding">
        <div className="section-title">
          <p className="eyebrow">Compatibilités</p>
          <h2>De nombreuses marques et modèles suivis</h2>
          <p>
            Cette liste sert à orienter la recherche, la réassurance et le SEO.
            Elle ne crée pas automatiquement de pages produit.
          </p>
        </div>
        <div className="compatibility-layout">
          <article className="tag-panel">
            <h3>Marques</h3>
            <div className="tag-cloud">
              {scooterBrands.map((brand) => <span key={brand}>{brand}</span>)}
            </div>
          </article>
          <article className="tag-panel">
            <h3>Modèles fréquents</h3>
            <div className="tag-cloud">
              {scooterModels.map((model) => <span key={model}>{model}</span>)}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
