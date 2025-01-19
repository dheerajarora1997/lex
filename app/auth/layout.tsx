"use client";

import AuthCarousel from "./components/authCarousel";
import styles from "./styles/authLayout.module.scss";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${styles.auth_layout_container} bg-error`}>
      <div className={styles.auth_layout_inner_container}>
        <div className={styles.left_container}>
          <AuthCarousel />
        </div>
        <div className={styles.right_container}>{children}</div>
      </div>
    </div>
  );
}
