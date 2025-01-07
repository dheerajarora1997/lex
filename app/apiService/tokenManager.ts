class TokenManager {
  // Set access token (in cookie)
  static setAccessToken(token: string) {
    document.cookie = `access_token=${token}; path=/; max-age=300; HttpOnly`;
  }

  // Get access token (from cookie)
  static getAccessToken(): string | undefined {
    const match = document.cookie.match(/(^|;\s*)access_token=([^;]*)/);
    return match ? decodeURIComponent(match[2]) : undefined;
  }

  // Set refresh token (in cookie)
  static setRefreshToken(token: string) {
    document.cookie = `refresh_token=${token}; path=/; secure; samesite=strict; max-age=${
      7 * 24 * 60 * 60
    }`;
  }

  // Get refresh token (from cookie)
  static getRefreshToken(): string | undefined {
    const match = document.cookie.match(/(^|;\s*)refresh_token=([^;]*)/);
    return match ? decodeURIComponent(match[2]) : undefined;
  }

  // Clear tokens
  static clearTokens() {
    document.cookie = "access_token=; path=/; max-age=0"; // Expire the cookie
    document.cookie = "refresh_token=; path=/; max-age=0"; // Expire the cookie
  }

  static validateAuth() {
    const accessToken = TokenManager.getAccessToken();
    const refreshToken = TokenManager.getRefreshToken();

    if (!accessToken || !refreshToken) {
      return false;
    }
    return true;
  }
}

export default TokenManager;
