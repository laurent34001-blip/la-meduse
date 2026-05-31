import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Nous contacter",
  description:
    "Contactez Trottipieces pour trouver une piece detachee de trottinette electrique, une compatibilite ou une demande professionnelle."
};

export default function ContactPage() {
  return (
    <main className="section form-page">
      <section className="page-hero compact">
        <p className="eyebrow">Support client</p>
        <h1>Nous contacter</h1>
        <p>
          Trottipieces accompagne les particuliers et les professionnels pour
          identifier les bonnes pieces de trottinette electrique et securiser les compatibilites.
        </p>
      </section>
      <section className="contact-layout">
        <ContactForm />
        <aside className="contact-card">
          <h2>Coordonnees</h2>
          <p><MapPin size={18} aria-hidden="true" /> Base en France</p>
          <p><Clock size={18} aria-hidden="true" /> Lun-Ven, 9h-18h</p>
          <p><Mail size={18} aria-hidden="true" /> Support client francais</p>
          <p><Phone size={18} aria-hidden="true" /> Reponse priorisee pour les demandes pro</p>
          <div className="notice">
            Pour une piece introuvable, utilisez la page dediee avec marque,
            modele et photos afin de faciliter l&apos;identification.
          </div>
        </aside>
      </section>
    </main>
  );
}
