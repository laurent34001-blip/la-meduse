export type MoneyAmount = {
  amount: number;
  currency_code: string;
};

export type StoreVariant = {
  id: string;
  title?: string;
  calculated_price?: {
    calculated_amount?: number;
    currency_code?: string;
  };
  prices?: MoneyAmount[];
};

export type StoreProduct = {
  id: string;
  title: string;
  handle: string;
  description?: string | null;
  thumbnail?: string | null;
  variants?: StoreVariant[];
};

type ProductResponse = {
  products?: StoreProduct[];
  product?: StoreProduct;
};

const backendUrl =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL?.replace(/\/$/, "") ?? "http://localhost:9000";
const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
const regionId = process.env.NEXT_PUBLIC_MEDUSA_REGION_ID;

function storeHeaders(): HeadersInit {
  return publishableKey ? { "x-publishable-api-key": publishableKey } : {};
}

async function medusaFetch<T>(path: string, init?: RequestInit): Promise<T | null> {
  try {
    const response = await fetch(`${backendUrl}${path}`, {
      ...init,
      headers: {
        ...storeHeaders(),
        ...init?.headers
      },
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getProducts() {
  const params = new URLSearchParams({ limit: "24" });

  if (regionId) {
    params.set("region_id", regionId);
  }

  const data = await medusaFetch<ProductResponse>(`/store/products?${params.toString()}`);
  return data?.products ?? [];
}

export async function getProductByHandle(handle: string) {
  const params = new URLSearchParams({
    handle,
    limit: "1"
  });

  if (regionId) {
    params.set("region_id", regionId);
  }

  const data = await medusaFetch<ProductResponse>(
    `/store/products?${params.toString()}`
  );

  return data?.products?.[0] ?? null;
}

export function getProductPrice(product: StoreProduct): MoneyAmount | null {
  const variant = product.variants?.[0];
  const calculated = variant?.calculated_price;

  if (calculated?.calculated_amount !== undefined && calculated.currency_code) {
    return {
      amount: calculated.calculated_amount,
      currency_code: calculated.currency_code
    };
  }

  return variant?.prices?.[0] ?? null;
}

export function formatPrice(price: MoneyAmount) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: price.currency_code.toUpperCase()
  }).format(price.amount);
}
