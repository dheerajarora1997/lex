"use client";

import Sidebar from "../components/sidebar";
import BlankChat from "../blankChat";
import ConversationChat from "../ConversationChat";

function Conversation() {
  return (
    <>
      {true ? (
        <>
          <Sidebar />
          <ConversationChat />
        </>
      ) : (
        <BlankChat />
      )}
    </>
  );
}

export default Conversation;
