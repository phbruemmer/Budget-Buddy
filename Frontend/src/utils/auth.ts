import { defineStore } from "pinia";
import { ref } from "vue";

const API_URL = "http://192.168.115.200:8000";

export const useAuthStore = defineStore("auth", () => {
  const accessToken = ref<string | null>(null);
  const isAuthenticated = ref<boolean>(false);

  const login = async (
    username: string,
    password: string
  ): Promise<{ success: boolean; message: string }> => {
    console.log("Sack");

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

      if (!response.ok || !data?.access) {
        return { success: false, message: data?.error || "Login failed" };
      }

      accessToken.value = data.access;
      isAuthenticated.value = true;

      console.log(isAuthenticated.value);

      return { success: true, message: data.message };
    } catch (err: any) {
      console.error("Login error:", err);
      return { success: false, message: err.message || "Login failed" };
    }
  };

  const refreshAccessToken = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/token/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok && data?.access) {
        accessToken.value = data.access;
        isAuthenticated.value = true;
      } else {
        accessToken.value = null;
        isAuthenticated.value = false;
      }
    } catch (err) {
      console.error("Refresh token error:", err);
      accessToken.value = null;
      isAuthenticated.value = false;
    }
  };

  const logout = async () => {
    accessToken.value = null;
    isAuthenticated.value = false;

    try {
      await fetch(`${API_URL}/api/auth/logout/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return {
    accessToken,
    isAuthenticated,
    login,
    refreshAccessToken,
    logout,
  };
});
