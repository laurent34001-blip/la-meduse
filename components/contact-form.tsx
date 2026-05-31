"use client";

import { useState } from "react";
import { Send } from "lucide-react";

type FormState = "idle" | "loading" | "success";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) {
      return;
    }
    const form = event.currentTarget;
    setState("loading");
    window.setTimeout(() => {
      setState("success");
      form.reset();
    }, 450);
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-grid two">
        <label>
          Nom
          <input name="lastName" required autoComplete="family-name" />
        </label>
        <label>
          Prénom
          <input name="firstName" required autoComplete="given-name" />
        </label>
      </div>
      <div className="form-grid two">
        <label>
          Email
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label>
          Téléphone
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
      </div>
      <label>
        Sujet
        <input name="subject" required />
      </label>
      <label>
        Type de client
        <select name="customerType" required defaultValue="">
          <option value="" disabled>Sélectionner</option>
          <option>Particulier</option>
          <option>Professionnel</option>
        </select>
      </label>
      <label>
        Message
        <textarea name="message" rows={7} required minLength={10} />
      </label>
      <label className="checkbox-line">
        <input name="consent" type="checkbox" required />
        <span>J&apos;accepte que Trottipièces utilise ces informations pour répondre à ma demande.</span>
      </label>
      <button className="button button-primary" type="submit" disabled={state === "loading"}>
        <Send size={18} aria-hidden="true" />
        {state === "loading" ? "Envoi..." : "Envoyer le message"}
      </button>
      {state === "success" ? (
        <p className="form-success" role="status">
          Votre message est prêt à être transmis. TODO backend : connecter ce formulaire à Medusa, CRM ou e-mail transactionnel.
        </p>
      ) : null}
    </form>
  );
}
