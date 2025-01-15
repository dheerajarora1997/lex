import styles from "../styles/onboarding.module.scss";
import CardContent from "./cardContent";
import CardFooter from "./cardFooter";
import CardHeader from "./cardHeader";

function StepsView({
  isActive,
  activeStepIndex,
  setActiveStepIndex,
}: {
  isActive: boolean;
  activeStepIndex: number;
  setActiveStepIndex: (value: number) => void;
}) {
  return (
    <div
      className={`${styles.steps_container} ${styles.card_view} ${
        isActive ? styles.active : ""
      }`}
    >
      <div className={styles.main}>
        <CardHeader />
        {/* <div className={styles.steps_highligher_container}>
          {new Array(4).fill(null).map((value, index) => (
            <div
              className={`${styles.step} ${
                index === activeStepIndex ? styles.active : ""
              }`}
              key={index}
            />
          ))}
        </div> */}

        <CardContent activeStepIndex={activeStepIndex} />

        <CardFooter
          setActiveStepIndex={setActiveStepIndex}
          activeStepIndex={activeStepIndex}
        />
      </div>
    </div>
  );
}

export default StepsView;
