import Image from "next/image";

export default function Loading() {
  return (
    <main className="section app-loading" aria-label="Chargement">
      <div className="brand-loader">
        <Image
          src="/images/brand/trottipieces-logo-embleme.png"
          alt=""
          width={76}
          height={76}
          priority
        />
        <Image
          src="/images/brand/trottipieces-logo-texte.png"
          alt="Trottipièces"
          width={210}
          height={42}
          priority
        />
        <span className="loader-bar" />
      </div>
    </main>
  );
}
