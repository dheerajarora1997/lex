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
            "Welcome to Lex! We're excited to help you transform your legal research. Here's a quick guide to get you started."
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
