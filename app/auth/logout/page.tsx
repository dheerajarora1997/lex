"use client";

import { useEffect } from "react";
import TokenManager from "@/app/apiService/tokenManager";
import { useRouter } from "next/navigation";

function Logout() {
  const route = useRouter();
  useEffect(() => {
    TokenManager.clearTokens();
    route.push("/auth/login");
  });
  return (
    <>
      <h2>You have been logout Successfully!</h2>
    </>
  );
}

export default Logout;
