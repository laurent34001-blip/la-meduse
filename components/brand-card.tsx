import Link from "next/link";
import type { LinkItem } from "@/data/catalog";

export function BrandCard({ item }: { item: LinkItem }) {
  return (
    <Link className="brand-card" href={item.href}>
      <span className="brand-logo" aria-hidden="true">{item.logo ?? item.name.slice(0, 2)}</span>
      <span>{item.name}</span>
    </Link>
  );
}
