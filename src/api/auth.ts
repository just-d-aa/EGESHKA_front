export async function loginWithProvider(
  identityToken: string,
  identitySource: "apple" | "google" | "telegram",
): Promise<{ accessToken: string; refreshToken: string }> {
  const res = await fetch("/api/v2/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identityToken, identitySource }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const messages = body?.ErrorMessages?.join(", ") || `HTTP ${res.status}`;
    throw new Error(messages);
  }
  return res.json();
}

async function relogin(
  refreshToken: string,
): Promise<{ accessToken: string; refreshToken: string }> {
  const res = await fetch("/api/v1/user/relogin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });
  if (!res.ok) {
    throw new Error("Session expired");
  }
  return res.json();
}

let refreshPromise: Promise<{ accessToken: string; refreshToken: string }> | null = null;

export async function fetchWithAuth(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const accessToken = localStorage.getItem("accessToken");
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status !== 401) return res;

  const storedRefresh = localStorage.getItem("refreshToken");
  if (!storedRefresh) throw new Error("Session expired");

  if (!refreshPromise) {
    refreshPromise = relogin(storedRefresh).finally(() => {
      refreshPromise = null;
    });
  }
  const tokens = await refreshPromise;
  localStorage.setItem("accessToken", tokens.accessToken);
  localStorage.setItem("refreshToken", tokens.refreshToken);

  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: `Bearer ${tokens.accessToken}`,
    },
  });
}

export async function createPayment(): Promise<{ paymentId: string; paymentUrl: string }> {
  const res = await fetchWithAuth("/api/v2/payment/create", {
    method: "POST",
    body: JSON.stringify({ purpose: "subscription" }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const messages = body?.ErrorMessages?.join(", ") || `HTTP ${res.status}`;
    throw new Error(messages);
  }
  return res.json();
}
