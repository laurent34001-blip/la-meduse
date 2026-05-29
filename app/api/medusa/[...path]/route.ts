import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

const backendUrl =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL?.replace(/\/$/, "") ?? "http://localhost:9000";
const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;

function medusaHeaders(request: NextRequest): HeadersInit {
  const headers: HeadersInit = {
    accept: request.headers.get("accept") ?? "application/json"
  };

  const contentType = request.headers.get("content-type");

  if (contentType) {
    headers["content-type"] = contentType;
  }

  if (publishableKey) {
    headers["x-publishable-api-key"] = publishableKey;
  }

  return headers;
}

async function proxyMedusa(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  const target = new URL(`/store/${path.join("/")}`, backendUrl);
  target.search = request.nextUrl.search;

  const hasBody = !["GET", "HEAD"].includes(request.method);
  const response = await fetch(target, {
    method: request.method,
    headers: medusaHeaders(request),
    body: hasBody ? await request.text() : undefined,
    cache: "no-store"
  });

  const body = await response.text();

  return new NextResponse(body, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") ?? "application/json"
    }
  });
}

export async function GET(request: NextRequest, context: RouteContext) {
  return proxyMedusa(request, context);
}

export async function POST(request: NextRequest, context: RouteContext) {
  return proxyMedusa(request, context);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  return proxyMedusa(request, context);
}
