import type { Metadata } from "next";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";

export const metadata: Metadata = {
  title: "Connexion client",
  description: "Connexion client Trottipièces pour accéder au compte et à l'espace professionnel."
};

export default function LoginPage() {
  return (
    <main className="section form-page">
      <section className="login-panel">
        <LockKeyhole size={30} aria-hidden="true" />
        <p className="eyebrow">Connexion requise</p>
        <h1>Accès client</h1>
        <p>
          La connexion client Medusa n&apos;est pas encore branchée dans ce storefront.
          Cette page protège l&apos;espace professionnel et attend l&apos;intégration auth backend.
        </p>
        <div className="cta-row">
          <Link className="button button-primary" href="/contact">Demander un compte pro</Link>
          <Link className="button button-secondary" href="/boutique">Retour boutique</Link>
        </div>
      </section>
    </main>
  );
}
