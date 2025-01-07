import { useState } from "react";
import Welcome from "./welcome";
import styles from "../styles/onboarding.module.scss";
import StepsView from "./stepsView";

function OnboardingCard() {
  const [showSteps, setShowSteps] = useState<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  return (
    <div className={styles.onboarding_card}>
      <Welcome isActive={!showSteps} onClickStart={() => setShowSteps(true)} />
      <StepsView
        isActive={showSteps}
        activeStepIndex={activeStepIndex}
        setActiveStepIndex={(value: number) => setActiveStepIndex(value)}
      />
    </div>
  );
}

export default OnboardingCard;
