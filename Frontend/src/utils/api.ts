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

async function refreshAccessToken(): Promise<string | null> {
  try {
    const response: API_REQUEST = await fetch(
      `${API_URL}/api/auth/token/refresh/`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!response.ok) return null;

    const data = await response.json;
    const newToken = data?.access_token;

    if (newToken) {
      localStorage.setItem("access_token", newToken);
      return newToken;
    } else {
      console.warn("Access Forbidden: Session expired or unauthorized");
    }
  } catch (err: any) {
    console.error("Failed to refresh token: ", err);
  }
  return null;
}

export async function std_api_request(
  url: string,
  method: string,
  data?: API_REQUEST,
  authorization?: boolean
): Promise<API_RESPONSE> {
  const API_ENDPOINT = `${API_URL}${url}`;

  const access_token = localStorage.getItem("access_token");

  if (authorization && !access_token)
    return {
      ok: false,
      status: 0,
      data: null,
      error: "Authorization required but access token is missing.",
    };

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(authorization && access_token
      ? { Authorization: `Bearer ${access_token}` }
      : {}),
  };

  const request: RequestInit = {
    method,
    headers,
    ...(ALLOWED_BODY_METHODS.includes(method) && data
      ? { body: JSON.stringify(data) }
      : {}),
  };

  try {
    let response = await fetch(API_ENDPOINT, request);

    if (authorization && response.status === 401) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        headers.Authorization = `Bearer ${newToken}`;
        response = await fetch(API_ENDPOINT, request);
      } else {
        localStorage.removeItem("access_token");
        window.location.reload();
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
