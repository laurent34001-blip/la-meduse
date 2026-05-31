"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function RequestPartForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) {
      return;
    }
    const form = event.currentTarget;
    setStatus("loading");
    window.setTimeout(() => {
      setStatus("sent");
      form.reset();
    }, 450);
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-grid two">
        <label>Nom<input name="lastName" required autoComplete="family-name" /></label>
        <label>Prénom<input name="firstName" required autoComplete="given-name" /></label>
      </div>
      <div className="form-grid two">
        <label>Email<input name="email" type="email" required autoComplete="email" /></label>
        <label>Téléphone<input name="phone" type="tel" autoComplete="tel" /></label>
      </div>
      <div className="form-grid two">
        <label>
          Type de client
          <select name="customerType" required defaultValue="">
            <option value="" disabled>Sélectionner</option>
            <option>Particulier</option>
            <option>Professionnel</option>
          </select>
        </label>
        <label>Marque de la trottinette<input name="brand" required /></label>
      </div>
      <div className="form-grid two">
        <label>Modèle de la trottinette<input name="model" required /></label>
        <label>Année si connue<input name="year" inputMode="numeric" /></label>
      </div>
      <div className="form-grid two">
        <label>Type de pièce recherchée<input name="partType" required /></label>
        <label>Référence de la pièce si connue<input name="partReference" /></label>
      </div>
      <label>
        Photos
        <input name="photos" type="file" accept="image/*" multiple />
      </label>
      <label>
        Description du problème ou de la pièce recherchée
        <textarea name="message" rows={8} required minLength={15} />
      </label>
      <label className="checkbox-line">
        <input name="consent" type="checkbox" required />
        <span>J&apos;accepte que Trottipièces utilise ces informations pour traiter ma demande de pièce.</span>
      </label>
      <button className="button button-primary" type="submit" disabled={status === "loading"}>
        <Send size={18} aria-hidden="true" />
        {status === "loading" ? "Envoi..." : "Envoyer ma demande"}
      </button>
      {status === "sent" ? (
        <p className="form-success" role="status">
          Demande enregistrée côté interface. TODO backend : brancher l&apos;envoi, les fichiers et le suivi client.
        </p>
      ) : null}
    </form>
  );
}
