"use client";

import Sidebar from "../components/common/sidebar";
import ConversationChat from "./ConversationChat";

function Conversation() {
  return (
    <>
      <Sidebar />
      <ConversationChat threadId="" />
    </>
  );
}

export default Conversation;
