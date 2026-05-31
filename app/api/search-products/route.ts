import { NextRequest, NextResponse } from "next/server";
import type { StoreProduct } from "@/lib/medusa";

type ProductResponse = {
  products?: StoreProduct[];
};

const backendUrl =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL?.replace(/\/$/, "") ?? "http://localhost:9000";
const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
const regionId = process.env.NEXT_PUBLIC_MEDUSA_REGION_ID;

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  const limit = request.nextUrl.searchParams.get("limit") ?? "6";

  if (query.length < 3) {
    return NextResponse.json({ products: [], unavailable: false });
  }

  const params = new URLSearchParams({ q: query, limit });
  if (regionId) {
    params.set("region_id", regionId);
  }

  try {
    const medusaRequest = fetch(`${backendUrl}/store/products?${params.toString()}`, {
      headers: publishableKey ? { "x-publishable-api-key": publishableKey } : {},
      cache: "no-store"
    });
    const timeout = new Promise<null>((resolve) => {
      setTimeout(() => resolve(null), 1800);
    });
    const response = await Promise.race([medusaRequest, timeout]);

    if (!response) {
      return NextResponse.json({ products: [], unavailable: true });
    }

    if (!response.ok) {
      return NextResponse.json({ products: [], unavailable: response.status >= 500 });
    }

    const data = (await response.json()) as ProductResponse;
    return NextResponse.json({ products: data.products ?? [], unavailable: false });
  } catch {
    return NextResponse.json({ products: [], unavailable: true });
  }
}
