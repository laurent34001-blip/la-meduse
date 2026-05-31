"use client";

import Link from "next/link";

export default function GlobalError() {
  return (
    <html lang="fr">
      <body>
        <main className="section http-state-page">
          <section className="http-state-card">
            <span className="http-code">Erreur</span>
            <h1>Service momentanément indisponible</h1>
            <p>Une erreur technique empêche l&apos;affichage du site. Réessayez dans quelques instants.</p>
            <Link className="button button-primary" href="/">
              Recharger l&apos;accueil
            </Link>
          </section>
        </main>
      </body>
    </html>
  );
}
