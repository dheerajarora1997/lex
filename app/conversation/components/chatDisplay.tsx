import { usePathname } from "next/navigation";
import InputBox from "./inputBox";
import styles from "../styles/chatDisplay.module.scss";
import SuggestionCards from "./suggestionCards";

function ChatDisplay() {
  const pathname = usePathname();
  const isNewThread = pathname === "/conversation/new";

  const onClickSubmit = () => {
    // Create conversation API to be called post the changes are implemented
  };

  return (
    <div
      className={`${styles.chat_display_container} ${
        isNewThread ? styles.new_thread : ""
      }`}
    >
      {isNewThread && (
        <div className={styles.new_chat_heading}>
          <span>AI-Powered Search Revolution!</span>
        </div>
      )}
      <InputBox onClickSubmit={onClickSubmit} isNewThread={isNewThread} />

      <SuggestionCards />
    </div>
  );
}

export default ChatDisplay;
