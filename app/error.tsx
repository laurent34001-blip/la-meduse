"use client";

import { useEffect } from "react";
import { HttpState } from "@/components/http-state";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <HttpState
      code="Erreur"
      title="Un incident est survenu"
      text="La page n'a pas pu être affichée correctement. L'équipe Trottipièces peut intervenir si le problème persiste."
      reset={reset}
    />
  );
}
