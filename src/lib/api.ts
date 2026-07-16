import { env } from "@/lib/env";

export type Message = {
  id: string;
  name: string;
  message: string;
  sticker: string | null;
  createdAt: string;
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

const base = env.NEXT_PUBLIC_API_URL;

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${base}${path}`, init);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message ?? `Request failed: ${res.status}`,
    );
  }
  const body: ApiResponse<T> = await res.json();
  return body.data;
}

export async function getMessages(): Promise<Message[]> {
  return apiFetch<Message[]>("/messages", { cache: "no-store" });
}

export async function getMessageCount(): Promise<number> {
  const data = await apiFetch<{ total: number }>("/messages/count", {
    cache: "no-store",
  });
  return data.total;
}

export async function createMessage(payload: {
  name: string;
  message: string;
  sticker?: string;
}): Promise<Message> {
  return apiFetch<Message>("/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
