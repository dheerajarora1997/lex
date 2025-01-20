"use client";

import ChatDisplay from "./components/chatDisplay";
import Sidebar from "./components/sidebar";
import styles from "./styles/conversationLayout.module.scss";

function ConversationLayout() {
  // const { isSidebarOpen } = useAppSelector((state) => state.conversationData);

  return (
    <div className={styles.chatLayout}>
      {/* {isSidebarOpen && <Sidebar />} */}
      <Sidebar />
      <div className={styles.mainContent}>
        <ChatDisplay />
      </div>
    </div>
  );
}

export default ConversationLayout;
