"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function RouteLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  useEffect(() => {
    let timeout: number | undefined;

    function handleClick(event: MouseEvent) {
      const target = event.target as Element | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;

      if (!anchor || anchor.target || anchor.origin !== window.location.origin) {
        return;
      }

      const nextUrl = new URL(anchor.href);
      if (nextUrl.pathname === window.location.pathname && nextUrl.search === window.location.search) {
        return;
      }

      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => setLoading(true), 120);
    }

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={loading ? "route-loader is-visible" : "route-loader"} aria-hidden="true">
      <span />
    </div>
  );
}
