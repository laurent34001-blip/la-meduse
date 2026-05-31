import Link from "next/link";
import type { LinkItem } from "@/data/catalog";

export function BrandCard({ item }: { item: LinkItem }) {
  return (
    <Link className="brand-card" href={item.href}>
      <span>{item.name}</span>
    </Link>
  );
}
