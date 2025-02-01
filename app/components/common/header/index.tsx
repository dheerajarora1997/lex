"use client";

import Link from "next/link";
import styles from "./header.module.scss";
import AppButton from "@/app/components/common/appButton/index";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import TokenManager from "@/app/apiService/tokenManager";
import { useRouter } from "next/navigation";
import { useProfileQuery } from "@/app/apiService/services/profile";

// interface NavItem {
//   label: string;
//   href: string;
// }

const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes (to refresh before token expires)

function Header() {
  const route = useRouter();
  const pathname = usePathname();
  const { data, refetch: profile } = useProfileQuery({});
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

  useEffect(() => {
    if (!TokenManager.validateAuth()) {
      route.push("/auth/login");
    }
  }, []);

  useEffect(() => {
    if (TokenManager.validateAuth()) {
      profile();
    }
  }, [TokenManager.validateAuth()]);

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <div className={styles.logo_container}>
          <Link href="/" className={styles.brand_text}>
            LEX
          </Link>
        </div>

        {TokenManager.validateAuth() ? (
          <div className="dropdown">
            <button
              className="btn dropdown-toggle ps-5"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span
                className="bg-secondary d-inline-block rounded-circle position-absolute"
                style={{ width: 30, height: 30, top: 3, left: 11 }}
              ></span>
            </button>
            <ul className="dropdown-menu p-0 border-0 shadow rounded-2 overflow-hidden">
              <li className="px-3 py-3 bg-secondary text-white bg-opacity-25">
                {data?.first_name ? (
                  <span className="d-inline-block w-100 fw-bold text-darken">
                    {data?.first_name}
                  </span>
                ) : null}
                <small className="d-inline-block w-100 text-dark fs-6">
                  {data?.email}
                </small>
              </li>
              <li
                onClick={() => {
                  route.push("/auth/logout");
                }}
                style={{ cursor: "pointer" }}
                className="py-2 dropdown-item"
              >
                Logout
              </li>
            </ul>
          </div>
        ) : (
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
