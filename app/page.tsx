"use client";

import { useEffect } from "react";
import TokenManager from "./apiService/tokenManager";
import { useRouter } from "next/navigation";

export default function App() {
  const accessToken = TokenManager.getAccessToken();
  const refreshToken = TokenManager.getAccessToken();

  const route = useRouter();

  useEffect(() => {
    if (accessToken && refreshToken) {
      route.push("/conversation/new");
    } else {
      route.push("/auth/login");
    }
  }, []);
  return <div></div>;
}
