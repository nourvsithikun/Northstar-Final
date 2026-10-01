import { API_BASE_URL } from "@/lib/api/config";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type ApiFetchOptions = RequestInit & {
  revalidate?: number | false;
};

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const { revalidate = 120, ...requestInit } = options;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...requestInit,
    headers: {
      Accept: "application/json",
      ...requestInit.headers,
    },
    ...(requestInit.cache
      ? {}
      : { next: { revalidate: revalidate === false ? 0 : revalidate } }),
  });

  if (!response.ok) {
    let message = `The learning service returned ${response.status}.`;

    try {
      const payload = (await response.json()) as { message?: string };
      if (payload.message) message = payload.message;
    } catch {
      // The fallback message remains useful when the response is not JSON.
    }

    throw new ApiError(message, response.status);
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}
