import { useAuthStore } from "./auth";

const API_URL = "http://192.168.115.200:8000";

interface API_REQUEST {
  [key: string]: any;
}

interface API_RESPONSE {
  ok: boolean;
  status: number;
  data: { [key: string]: any } | null;
  error: string | null;
}

const ALLOWED_BODY_METHODS = ["POST", "PUT", "PATCH"];

export async function std_api_request(
  url: string,
  method: string,
  data?: API_REQUEST,
  authorization?: boolean
): Promise<API_RESPONSE> {
  const auth = useAuthStore();
  const API_ENDPOINT = `${API_URL}${url}`;

  if (authorization && !auth.accessToken)
    return {
      ok: false,
      status: 0,
      data: null,
      error: "Authorization required but access token is missing.",
    };

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(authorization && auth.accessToken
      ? { Authorization: `Bearer ${auth.accessToken}` }
      : {}),
  };

  const request: RequestInit = {
    method,
    headers,
    ...(ALLOWED_BODY_METHODS.includes(method) && data
      ? { body: JSON.stringify(data) }
      : {}),
    credentials: "include",
  };

  try {
    let response = await fetch(API_ENDPOINT, request);

    if (authorization && response.status === 401) {
      auth.refreshAccessToken();
      if (auth.isAuthenticated && auth.accessToken) {
        headers.Authorization = `Bearer ${auth.accessToken}`;
        response = await fetch(API_ENDPOINT, request);
      } else {
        return {
          ok: false,
          status: 401,
          data: null,
          error: "Session expired. Please log in again.",
        };
      }
    }

    const responseData = await response.json().catch(() => null);

    return {
      data: responseData,
      status: response.status,
      ok: response.ok,
      error: null,
    };
  } catch (err: any) {
    console.error("API error:", err);
    return {
      data: null,
      status: 0,
      ok: false,
      error: err.message ?? "Unknown error",
    };
  }
}
