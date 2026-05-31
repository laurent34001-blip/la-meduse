import Link from "next/link";
import { Building2, LockKeyhole, Percent, UserPlus } from "lucide-react";

export function ProAccessBlock() {
  const items = [
    { icon: Percent, title: "Tarifs HT", text: "Affichage dedie aux comptes professionnels eligibles." },
    { icon: Building2, title: "Pour les pros", text: "Reparateurs, revendeurs, magasins, ateliers et societes." },
    { icon: LockKeyhole, title: "Acces reserve", text: "Connexion obligatoire avant consultation des conditions B2B." },
    { icon: UserPlus, title: "Ouverture de compte", text: "Demande possible pour verifier votre activite et vos besoins." }
  ];

  return (
    <section className="section pro-block">
      <div className="section-title">
        <p className="eyebrow">Professionnels</p>
        <h2>Un espace B2B prepare pour vos tarifs HT</h2>
        <p>
          La logique d&apos;authentification client Medusa n&apos;est pas encore exposee dans ce storefront.
          Le front est structure pour proteger l&apos;espace pro et activer l&apos;affichage HT des que le backend fournit le statut professionnel.
        </p>
      </div>
      <div className="feature-grid">
        {items.map((item) => (
          <article className="feature-card" key={item.title}>
            <item.icon size={24} aria-hidden="true" />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
      <div className="cta-row">
        <Link className="button button-primary" href="/connexion?next=/espace-pro">Se connecter</Link>
        <Link className="button button-secondary" href="/contact">Demander un compte pro</Link>
      </div>
    </section>
  );
}
