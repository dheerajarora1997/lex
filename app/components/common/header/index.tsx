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
      } else if (pathname === "/auth/signup") {
        setRightHandCta({ href: "/auth/login", name: "Login" });
      } else {
        setRightHandCta({ href: "/auth/logout", name: "Logout" });
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

        {TokenManager.validateAuth() ? (
          <Link href={rightHandCta.href}>
            <AppButton
              text={rightHandCta.name}
              className={styles.login_button}
            />
          </Link>
        ) : (
          <>
            {pathname === "/auth/login" ? (
              <Link href="/auth/signup">
                <button className="btn btn-primary text-white fw-bold">
                  Sign up
                </button>
              </Link>
            ) : pathname === "/auth/signup" ? (
              <Link href="/auth/login">
                <button className="btn btn-primary text-white fw-bold">
                  Login
                </button>
              </Link>
            ) : null}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
