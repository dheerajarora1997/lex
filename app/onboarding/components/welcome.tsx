import AppButton from "@/app/components/common/appButton";
import styles from "../styles/onboarding.module.scss";

function Welcome({
  onClickStart,
  isActive,
}: {
  onClickStart: () => void;
  isActive: boolean;
}) {
  return (
    <div
      className={`${styles.welcome_container} ${styles.card_view} ${
        !isActive ? styles.active : ""
      }`}
    >
      <div className={styles.details_container}>
        <span className={styles.header}>Welcome to Lex!</span>
        <span className={styles.description}>
          {
            "We're excited for you to experience a new way of legal research: The Lex Way!"
          }
        </span>
      </div>

      <AppButton
        text={"Start"}
        onClick={() => {
          onClickStart();
        }}
        className={styles.start_cta}
      />
    </div>
  );
}

export default Welcome;
