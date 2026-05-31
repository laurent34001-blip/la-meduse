import type { Metadata } from "next";
import { RequestPartForm } from "@/components/request-part-form";
import { scooterBrands, scooterModels } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Demander une piece",
  description:
    "Demandez une piece de trottinette introuvable. Trottipieces aide a identifier les pieces compatibles Xiaomi M365, Ninebot, Dualtron, Kaabo, Vsett et plus."
};

export default function RequestPartPage() {
  return (
    <main className="section form-page">
      <section className="page-hero compact">
        <p className="eyebrow">Piece introuvable</p>
        <h1>Demander une piece</h1>
        <p>
          Vous ne trouvez pas la piece dont vous avez besoin ? Envoyez-nous les
          informations de votre trottinette et, si possible, des photos. Notre equipe
          vous aide a identifier la bonne piece compatible.
        </p>
      </section>

      <section className="contact-layout">
        <RequestPartForm />
        <aside className="contact-card">
          <h2>Pour une reponse precise</h2>
          <p>Ajoutez la marque, le modele exact, l&apos;annee si connue et une photo de la piece ou de l&apos;etiquette produit.</p>
          <p>Les demandes professionnelles peuvent etre rattachees a une ouverture de compte B2B.</p>
        </aside>
      </section>

      <section className="section no-x-padding">
        <div className="section-title">
          <p className="eyebrow">Compatibilites</p>
          <h2>De nombreuses marques et modeles suivis</h2>
          <p>
            Cette liste sert a orienter la recherche, la reassurance et le SEO.
            Elle ne cree pas automatiquement de pages produit.
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
            <h3>Modeles frequents</h3>
            <div className="tag-cloud">
              {scooterModels.map((model) => <span key={model}>{model}</span>)}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
