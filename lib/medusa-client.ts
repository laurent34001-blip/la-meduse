export type CartItem = {
  id: string;
  title?: string;
  product_title?: string;
  quantity: number;
  thumbnail?: string | null;
};

export type Cart = {
  id: string;
  items?: CartItem[];
  checkout_url?: string | null;
};

type AddToCartInput = {
  variantId: string;
  quantity: number;
  productTitle: string;
  thumbnail?: string | null;
};

const regionId = process.env.NEXT_PUBLIC_MEDUSA_REGION_ID;
const cartStorageKey = "la-meduse-cart-id";

function headers(): HeadersInit {
  return {
    "content-type": "application/json"
  };
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`/api/medusa${path}`, {
    ...init,
    headers: {
      ...headers(),
      ...init?.headers
    }
  });

  if (!response.ok) {
    throw new Error(`Medusa request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

async function createCart() {
  const body = regionId ? { region_id: regionId } : {};
  const data = await request<{ cart: Cart }>("/carts", {
    method: "POST",
    body: JSON.stringify(body)
  });

  localStorage.setItem(cartStorageKey, data.cart.id);
  return data.cart;
}

export async function getCart() {
  const cartId = localStorage.getItem(cartStorageKey);

  if (!cartId) {
    return null;
  }

  try {
    const data = await request<{ cart: Cart }>(`/carts/${cartId}`);
    return data.cart;
  } catch {
    localStorage.removeItem(cartStorageKey);
    return null;
  }
}

export async function addToCart(input: AddToCartInput) {
  const cart = (await getCart()) ?? (await createCart());
  const data = await request<{ cart: Cart }>(`/carts/${cart.id}/line-items`, {
    method: "POST",
    body: JSON.stringify({
      variant_id: input.variantId,
      quantity: input.quantity
    })
  });

  return data.cart;
}

export async function removeLineItem(lineItemId: string) {
  const cartId = localStorage.getItem(cartStorageKey);

  if (!cartId) {
    return null;
  }

  const data = await request<{ cart: Cart }>(
    `/carts/${cartId}/line-items/${lineItemId}`,
    {
      method: "DELETE"
    }
  );

  return data.cart;
}
