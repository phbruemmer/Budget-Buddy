const API_URL = "http://192.168.115.200:8000";

export class AuthService {
  async login(
    username: string,
    password: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_URL}/api/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok)
        return { success: false, message: data?.error || "Login failed" };

      return { success: true, message: data.message };
    } catch (err: any) {
      console.error("Login error:", err);
      return { success: false, message: err.message || "Login failed" };
    }
  }

  async refreshAccessToken() {
    try {
      const response = await fetch(`${API_URL}/api/auth/token/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    } catch (err) {
      console.error("Refresh token error:", err);
    }
  }

  async logout() {
    try {
      await fetch(`${API_URL}/api/auth/logout/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error:", err);
    }
  }
}
