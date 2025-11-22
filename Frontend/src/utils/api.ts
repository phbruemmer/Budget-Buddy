import { AuthService } from "./auth";

const API_URL = "http://192.168.115.200:8000";
// https://timetagger.pythonanywhere.com
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
  const auth = new AuthService();

  const API_ENDPOINT = `${API_URL}${url}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
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
      response = await fetch(API_ENDPOINT, request);

      if (!response.ok) {
        return {
          data: null,
          status: response.status,
          ok: response.ok,
          error: "Session expired or no valid token given.",
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
