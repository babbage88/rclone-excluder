export async function fetchJson(url: string, opts: RequestInit = {}, timeoutMs = 30_000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...opts, signal: controller.signal });
    clearTimeout(id);
    if (!res.ok) {
      const errBody = await res.json().catch(() => null);
      throw new Error(errBody?.error || `${res.status} ${res.statusText}`);
    }
    return (await res.json()) as unknown;
  } finally {
    clearTimeout(id);
  }
}
