const API_URL = "http://192.168.115.200:8000";

export class AuthService {
  async register(
    username: string,
    email: string,
    password: string,
    password_2: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_URL}/api/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, password_2 }),
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);

      if (!response.ok)
        return {
          success: false,
          message: data.non_field_errors[0] || "Registration failed",
        };
      return { success: true, message: data.message };
    } catch (err: any) {
      console.error("Registration error: ", err);
      return { success: false, message: err.message || "Registration failed" };
    }
  }

  async userVerification(
    username: string,
    verification_code: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_URL}/api/auth/verify/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, verification_code }),
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok)
        return {
          success: false,
          message: data.non_field_errors[0] || "Registration failed",
        };
      return { success: true, message: data.message };
    } catch (err: any) {
      console.error("Registration error: ", err);
      return { success: false, message: err.message || "Registration failed" };
    }
  }

  async login(
    username: string,
    password: string
  ): Promise<{ status: number | null; success: boolean; message: string }> {
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
        return {
          status: response.status,
          success: false,
          message: data.error || "Login failed",
        };

      return { status: response.status, success: true, message: data.message };
    } catch (err: any) {
      console.error("Login error: ", err);
      return {
        status: null,
        success: false,
        message: err.message || "Login failed",
      };
    }
  }

  async refreshAccessToken() {
    try {
      await fetch(`${API_URL}/api/auth/token/refresh/`, {
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

  async requestPasswordReset(
    email: string
  ): Promise<{ status: number | null; success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_URL}/api/auth/reset-password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok)
        return {
          status: response.status,
          success: false,
          message: data?.non_field_errors[0] || "Login failed",
        };

      return { status: response.status, success: true, message: data.message };
    } catch (err: any) {
      console.error("Login error: ", err);
      return {
        status: null,
        success: false,
        message: err.message || "Login failed",
      };
    }
  }

  async resetPassword(
    token: string,
    email: string,
    password_1: string,
    password_2: string
  ): Promise<{ status: number | null; success: boolean; message: string }> {
    try {
      const response = await fetch(
        `${API_URL}/api/auth/reset-password/${token}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password_1, password_2 }),
          credentials: "include",
        }
      );
      const data = await response.json();

      if (!response.ok)
        return {
          status: response.status,
          success: false,
          message: data?.non_field_errors[0] || "Password reset failed",
        };

      return { status: response.status, success: true, message: data.message };
    } catch (err: any) {
      return {
        status: null,
        success: false,
        message: err.message || "Password reset failed",
      };
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
