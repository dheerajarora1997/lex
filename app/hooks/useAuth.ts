import { useState, useCallback } from "react";
import TokenManager from "../apiService/tokenManager"; // Assuming you have this module
import { useRefreshTokenMutation } from "../apiService/services/authApi";

export const useAuth = () => {
  const [authState, setAuthState] = useState<boolean>(false);

  const [refreshTokenCall] = useRefreshTokenMutation();

  const refreshToken = useCallback(async () => {
    const refreshToken = TokenManager.getRefreshToken();
    if (!refreshToken) {
      setAuthState(false);
      return;
    }

    const response = await refreshTokenCall({ refresh: refreshToken });

    if (response.data?.access && response.data?.refresh) {
      TokenManager.setAccessToken(response.data?.access);
      TokenManager.setRefreshToken(response.data?.refresh);
    } else if (response.error) {
      setAuthState(false);
      if (
        typeof window !== "undefined" &&
        typeof window?.location !== "undefined"
      ) {
        window.location.href = "/auth/login";
      }
      TokenManager.clearTokens();
    }
  }, []);

  const login = useCallback((accessToken: string, refreshToken: string) => {
    TokenManager.setAccessToken(accessToken);
    TokenManager.setRefreshToken(refreshToken);
    setAuthState(true);
  }, []);

  // Log out the user
  const logout = useCallback(() => {
    TokenManager.clearTokens();
    setAuthState(false);
  }, []);

  return {
    authState,
    refreshToken,
    login,
    logout,
  };
};
