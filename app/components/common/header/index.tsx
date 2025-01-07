"use client";

import Link from "next/link";
import styles from "./header.module.scss";
import AppButton from "@/app/components/common/appButton/index";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import TokenManager from "@/app/apiService/tokenManager";

// interface NavItem {
//   label: string;
//   href: string;
// }

const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes (to refresh before token expires)

function Header() {
  const pathname = usePathname();
  const [rightHandCta, setRightHandCta] = useState({ href: "", name: "" });

  const { refreshToken } = useAuth();

  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshToken();
    }, REFRESH_INTERVAL);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [refreshToken]);

  useEffect(() => {
    if (pathname) {
      if (pathname === "/auth/login") {
        setRightHandCta({ href: "/auth/signup", name: "Signup" });
      } else {
        setRightHandCta({ href: "/auth/login", name: "Login" });
      }
    }
  }, [pathname]);
  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <div className={styles.logo_container}>
          <Link href="/" className={styles.brand_text}>
            LEX
          </Link>
        </div>

        {TokenManager.validateAuth() && (
          <Link href={rightHandCta.href}>
            <AppButton
              text={rightHandCta.name}
              className={styles.login_button}
            />
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
