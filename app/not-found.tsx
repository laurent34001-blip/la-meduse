import { HttpState } from "@/components/http-state";

export default function NotFound() {
  return (
    <HttpState
      code="404"
      tone="not-found"
      title="Page introuvable"
      text="La page demandée n'existe pas ou n'est plus disponible. Vous pouvez revenir à la boutique pour continuer votre recherche."
    />
  );
}
