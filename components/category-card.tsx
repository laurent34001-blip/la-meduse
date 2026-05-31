import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { LinkItem } from "@/data/catalog";

export function CategoryCard({ item }: { item: LinkItem }) {
  return (
    <Link className="category-card" href={item.href}>
      <span>{item.name}</span>
      <ChevronRight size={16} aria-hidden="true" />
    </Link>
  );
}
