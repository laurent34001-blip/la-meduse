import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Nous contacter",
  description:
    "Contactez Trottipièces pour trouver une pièce détachée de trottinette électrique, une compatibilité ou une demande professionnelle."
};

export default function ContactPage() {
  return (
    <main className="section form-page">
      <section className="page-hero compact">
        <p className="eyebrow">Support client</p>
        <h1>Nous contacter</h1>
        <p>
          Trottipièces accompagne les particuliers et les professionnels pour
          identifier les bonnes pièces de trottinette électrique et sécuriser les compatibilités.
        </p>
      </section>
      <section className="contact-layout">
        <ContactForm />
        <aside className="contact-card">
          <h2>Coordonnées</h2>
          <p><MapPin size={18} aria-hidden="true" /> Base en France</p>
          <p><Clock size={18} aria-hidden="true" /> Lun-Ven, 9h-18h</p>
          <p><Mail size={18} aria-hidden="true" /> Support client français</p>
          <p><Phone size={18} aria-hidden="true" /> Réponse priorisée pour les demandes pro</p>
          <div className="notice">
            Pour une pièce introuvable, utilisez la page dédiée avec marque,
            modèle et photos afin de faciliter l&apos;identification.
          </div>
        </aside>
      </section>
    </main>
  );
}
