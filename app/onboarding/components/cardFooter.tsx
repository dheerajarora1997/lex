import AppButton from "@/app/components/common/appButton";
import styles from "../styles/onboarding.module.scss";
import { ONBOARDING_CARD_DETAILS_LIST } from "../constants";
import { useRouter } from "next/navigation";

function CardFooter({
  activeStepIndex,
  setActiveStepIndex,
}: {
  activeStepIndex: number;
  setActiveStepIndex: (value: number) => void;
}) {
  const router = useRouter();
  return (
    <div className={styles.card_footer}>
      {activeStepIndex < ONBOARDING_CARD_DETAILS_LIST.length - 1 ? (
        <AppButton
          text="Skip"
          className={`${styles.left_cta} ${styles.cta}`}
          onClick={() => {
            router.push("conversation/new");
          }}
        />
      ) : (
        <div />
      )}
      <div className={styles.right_cta_container}>
        {activeStepIndex > 0 ? (
          <AppButton
            text="Back"
            onClick={() => setActiveStepIndex(activeStepIndex - 1)}
            className={`${styles.back_cta} ${styles.cta}`}
          />
        ) : (
          <div />
        )}
        <AppButton
          text={
            activeStepIndex === ONBOARDING_CARD_DETAILS_LIST.length - 1
              ? "Got It"
              : "Next"
          }
          onClick={() => {
            if (activeStepIndex === ONBOARDING_CARD_DETAILS_LIST.length - 1) {
              router.replace("/conversation/new");
            } else {
              setActiveStepIndex(activeStepIndex + 1);
            }
          }}
          className={`${styles.next_cta} ${styles.cta}`}
        />
      </div>
    </div>
  );
}

export default CardFooter;
