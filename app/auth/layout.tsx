"use client";

import AuthCarousel from "./components/authCarousel";
import styles from "./styles/authLayout.module.scss";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pageURL = typeof window !== "undefined" ? window.location.pathname : "";
  const deviceWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  return (
    <div className={`${styles.auth_layout_container} bg-error`}>
      <div className={styles.auth_layout_inner_container}>
        <div
          className={`${styles.left_container} ${
            pageURL.includes("signup") && deviceWidth < 640 ? "d-none" : ""
          }`}
        >
          <AuthCarousel />
        </div>
        <div className={styles.right_container}>{children}</div>
      </div>
    </div>
  );
}
