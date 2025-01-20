"use client";

import { useEffect } from "react";
import TokenManager from "../apiService/tokenManager";
import Sidebar from "../components/common/sidebar";
import { useRouter } from "next/navigation";
// import ConversationChat from "./ConversationChat";

function Conversation() {
  const route = useRouter();

  useEffect(() => {
    if (TokenManager.validateAuth()) {
      route.push("/conversation/new");
    } else {
      route.push("/auth/login");
    }
  }, []);
  return (
    <>
      <Sidebar />
      {/* <ConversationChat id="" idType="thread" /> */}
    </>
  );
}

export default Conversation;
