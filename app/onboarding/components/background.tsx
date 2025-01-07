import React from "react";
import styles from "../styles/onboarding.module.scss";

function Background({ children }: { children: React.ReactNode }) {
  return <div className={styles.onboarding_background}>{children}</div>;
}

export default Background;
