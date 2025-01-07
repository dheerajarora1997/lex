import Image from "next/image";
import styles from "../styles/chatDisplay.module.scss";
import { QUERY_SUGGESTIONS } from "../constants";
import { setActiveQuery } from "@/app/store/slices/conversationSlice";
import { useDispatch } from "react-redux";

function SuggestionCards() {
  const dispatch = useDispatch();
  return (
    <div className={styles.suggestion_cards_container}>
      <div className={styles.header}>
        <Image
          src={
            "https://storage.cloud.google.com/lex_assets/eye_hidden.png?authuser=1"
          }
          alt=""
          width={24}
          height={24}
        />
        <span className={styles.header_text}>Master the search game</span>
      </div>

      <div className={styles.card_container}>
        {QUERY_SUGGESTIONS.map((suggestion, index) => (
          <div
            key={index}
            className={`${styles.card} ${index === 0 ? styles.large_card : ""}`}
            onClick={() => {
              dispatch(setActiveQuery(suggestion));
            }}
          >
            {suggestion}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuggestionCards;
