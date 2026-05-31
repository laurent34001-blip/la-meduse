import { AlertTriangle, RefreshCw } from "lucide-react";

type ApiNoticeProps = {
  title?: string;
  text?: string;
};

export function ApiNotice({
  title = "Catalogue momentanément indisponible",
  text = "Une partie des produits ne peut pas être chargée pour le moment. Vous pouvez poursuivre votre navigation ou réessayer dans quelques instants."
}: ApiNoticeProps) {
  return (
    <div className="api-notice" role="status">
      <AlertTriangle size={18} aria-hidden="true" />
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
      <a href="" aria-label="Recharger la page">
        <RefreshCw size={16} aria-hidden="true" />
      </a>
    </div>
  );
}
