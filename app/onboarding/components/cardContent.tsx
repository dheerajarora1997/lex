import { ONBOARDING_CARD_DETAILS_LIST } from "../constants";
import styles from "../styles/onboarding.module.scss";

function CardContent({ activeStepIndex }: { activeStepIndex: number }) {
  return (
    <div className={styles.card_content_container}>
      <div className={styles.left}>
        <div className="row">
          <div className="col-sm-12 text-center mb-3">
            <span className={styles.title}>
              {ONBOARDING_CARD_DETAILS_LIST[activeStepIndex].largeTitle}
            </span>

            <div className={styles.description}>
              <span>
                {ONBOARDING_CARD_DETAILS_LIST[activeStepIndex].largeText}
              </span>
            </div>
          </div>
          {ONBOARDING_CARD_DETAILS_LIST[activeStepIndex].title && (
            <div className="col-sm-12 col-md-6 my-3">
              <span className={styles.title}>
                {ONBOARDING_CARD_DETAILS_LIST[activeStepIndex].title}
              </span>

              <div className={styles.description}>
                <span>
                  {ONBOARDING_CARD_DETAILS_LIST[activeStepIndex].lineOne}
                </span>
              </div>
            </div>
          )}
          {ONBOARDING_CARD_DETAILS_LIST[activeStepIndex].title1 && (
            <div className="col-sm-12 col-md-6 my-3">
              <span className={styles.title}>
                {ONBOARDING_CARD_DETAILS_LIST[activeStepIndex].title1}
              </span>

              <div className={styles.description}>
                <span>
                  {ONBOARDING_CARD_DETAILS_LIST[activeStepIndex].lineOne1}
                </span>
              </div>
            </div>
          )}
          {ONBOARDING_CARD_DETAILS_LIST[activeStepIndex].title2 && (
            <div className="col-sm-12 col-md-6 my-3">
              <span className={styles.title}>
                {ONBOARDING_CARD_DETAILS_LIST[activeStepIndex].title2}
              </span>

              <div className={styles.description}>
                <span>
                  {ONBOARDING_CARD_DETAILS_LIST[activeStepIndex].lineOne2}
                </span>
              </div>
            </div>
          )}
          {ONBOARDING_CARD_DETAILS_LIST[activeStepIndex].title3 && (
            <div className="col-sm-12 col-md-6 my-3">
              <span className={styles.title}>
                {ONBOARDING_CARD_DETAILS_LIST[activeStepIndex].title3}
              </span>

              <div className={styles.description}>
                <span>
                  {ONBOARDING_CARD_DETAILS_LIST[activeStepIndex].lineOne3}
                </span>
              </div>
            </div>
          )}
          <div className="col-sm-12">
            <p className="mt-3 fw-bold text-center">
              {ONBOARDING_CARD_DETAILS_LIST[activeStepIndex].desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardContent;
