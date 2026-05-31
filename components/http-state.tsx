import Link from "next/link";
import { ArrowLeft, Home, SearchX, ShieldAlert } from "lucide-react";

type HttpStateProps = {
  code: string;
  title: string;
  text: string;
  tone?: "not-found" | "error";
  reset?: () => void;
};

export function HttpState({ code, title, text, tone = "error", reset }: HttpStateProps) {
  const Icon = tone === "not-found" ? SearchX : ShieldAlert;

  return (
    <main className="section http-state-page">
      <section className="http-state-card">
        <span className="http-code">{code}</span>
        <Icon size={34} aria-hidden="true" />
        <h1>{title}</h1>
        <p>{text}</p>
        <div className="cta-row">
          <Link className="button button-primary" href="/">
            <Home size={18} aria-hidden="true" />
            Accueil
          </Link>
          <Link className="button button-secondary" href="/boutique">
            <ArrowLeft size={18} aria-hidden="true" />
            Retour boutique
          </Link>
          {reset ? (
            <button className="button button-secondary" type="button" onClick={reset}>
            Réessayer
            </button>
          ) : null}
        </div>
      </section>
    </main>
  );
}
