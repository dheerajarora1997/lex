import { ONBOARDING_CARD_DETAILS_LIST } from "../constants";
import styles from "../styles/onboarding.module.scss";

function CardContent({ activeStepIndex }: { activeStepIndex: number }) {
  return (
    <div className={styles.card_content_container}>
      <div className={styles.left}>
        <span className={styles.title}>
          {ONBOARDING_CARD_DETAILS_LIST[activeStepIndex].title}
        </span>

        <div className={styles.description}>
          <span>{ONBOARDING_CARD_DETAILS_LIST[activeStepIndex].lineOne}</span>
          <br />
          <span>{ONBOARDING_CARD_DETAILS_LIST[activeStepIndex].lineTwo}</span>
        </div>
      </div>

      {/* To be replaced with assets */}
      <div className={styles.right}></div>
    </div>
  );
}

export default CardContent;
