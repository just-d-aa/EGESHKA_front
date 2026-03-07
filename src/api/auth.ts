export async function loginWithProvider(
  identityToken: string,
  identitySource: "apple" | "google" | "telegram",
): Promise<{ accessToken: string; refreshToken: string }> {
  const res = await fetch("/api/v2/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identityToken, identitySource }),
  });
  if (!res.ok) throw new Error(`Auth failed: ${res.status}`);
  return res.json();
}
