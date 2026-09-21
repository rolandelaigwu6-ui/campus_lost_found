/**
 * Base API client. Every service in this folder uses these helpers.
 *
 * BACKEND DEVS: the frontend reads NEXT_PUBLIC_API_URL from .env.local
 * to know where your Python API lives. Set it to your Flask/FastAPI/Django
 * base URL (e.g. http://localhost:8000/api).
 *
 * Auth: the frontend sends the JWT as `Authorization: Bearer <token>`.
 * The token is stored in localStorage under "clf_token".
 */

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("clf_token");
}

export function setToken(token: string) {
  localStorage.setItem("clf_token", token);
}

export function clearToken() {
  localStorage.removeItem("clf_token");
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    ...(init.headers as Record<string, string> ?? {}),
  };

  if (token) headers["Authorization"] = `Bearer ${token}`;

  // Don't set Content-Type for FormData — the browser sets the boundary
  if (!(init.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${BASE}${path}`, { ...init, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(res.status, body.detail ?? body.message ?? `Request failed (${res.status})`);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  patch: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
