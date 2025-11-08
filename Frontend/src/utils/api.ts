const API_URL = "http://192.168.115.200:8000";

interface API_REQUEST {
  // Include Tokens later
  [key: string]: any;
}

interface API_RESPONSE {
  ok: boolean;
  status: number;
  data: { [key: string]: any };
}

const ALLOWED_BODY_METHODS = ["POST", "PUT", "PATCH"];
const FORBIDDEN_BODY_METHODS = ["GET", "HEAD"];

export async function std_api_request(
  url: string,
  method: string,
  data?: API_REQUEST,
  authorization?: boolean
) {
  const API_ENDPOINT = `${API_URL}${url}`;

  const token = localStorage.getItem("access_token");

  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
  };

  if (authorization && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const request: { [key: string]: any } = {
    method: method,
    headers: headers,
  };

  if (ALLOWED_BODY_METHODS.includes(method) && data) {
    request.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(API_ENDPOINT, request);

    if (response.url !== API_ENDPOINT) return;

    const api_response: API_RESPONSE = {
      data: await response.json(),
      status: response.status,
      ok: response.ok,
    };
    console.log(api_response);
  } catch (err: any) {
    console.log(err);
  }
}
