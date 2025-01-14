class TokenManager {
  static isBrowser(): boolean {
    return typeof window !== "undefined";
  }

  // Set access token (in cookie)
  static setAccessToken(token: string) {
    if (TokenManager.isBrowser()) {
      document.cookie = `access_token=${token}; path=/; max-age=300;`;
    }
  }

  // Get access token (from cookie)
  static getAccessToken(): string | undefined {
    if (TokenManager.isBrowser()) {
      const match = document.cookie.match(/(^|;\s*)access_token=([^;]*)/);
      return match ? decodeURIComponent(match[2]) : undefined;
    }
    return undefined;
  }

  // Set refresh token (in cookie)
  static setRefreshToken(token: string) {
    if (TokenManager.isBrowser()) {
      document.cookie = `refresh_token=${token}; path=/; secure; samesite=strict; max-age=${
        7 * 24 * 60 * 60
      }`;
    }
  }

  // Get refresh token (from cookie)
  static getRefreshToken(): string | undefined {
    if (TokenManager.isBrowser()) {
      const match = document.cookie.match(/(^|;\s*)refresh_token=([^;]*)/);
      return match ? decodeURIComponent(match[2]) : undefined;
    }
    return undefined;
  }

  // Clear tokens
  static clearTokens() {
    if (TokenManager.isBrowser()) {
      document.cookie = "access_token=; path=/; max-age=0";
      document.cookie = "refresh_token=; path=/; max-age=0";
    }
  }

  static validateAuth() {
    if (TokenManager.isBrowser()) {
      const accessToken = TokenManager.getAccessToken();
      const refreshToken = TokenManager.getRefreshToken();
      return !!(accessToken && refreshToken);
    }
    return false;
  }
}

export default TokenManager;
