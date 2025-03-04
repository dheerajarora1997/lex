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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { setFrontendElement } from "@/app/store/slices/frontendElements";
import ToggleIcon from "@/app/assets/icons/ToggleIcon";
// interface NavItem {
//   label: string;
//   href: string;
// }

const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes (to refresh before token expires)

function Header() {
  const route = useRouter();
  const pathname = usePathname();
  const { data, refetch: profile } = useProfileQuery(
    {},
    { skip: !TokenManager.validateAuth() }
  );
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
      } else if (pathname.includes("auth")) {
        setRightHandCta({ href: "/", name: "" });
      } else {
        setRightHandCta({ href: "/auth/logout", name: "Logout" });
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (
      !TokenManager.validateAuth() &&
      window !== undefined &&
      window.location !== undefined &&
      !window.location.pathname.includes("auth")
    ) {
      route.push("/auth/login");
    }
  }, []);

  useEffect(() => {
    if (TokenManager.validateAuth()) {
      profile();
    }
  }, [TokenManager.validateAuth()]);

  const isSidebarCollapsed = useSelector(
    (state: RootState) => state.frontendElements.sidebarCollapse
  );
  const dispatch = useDispatch();
  const deviceWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  const toggleSidebar = () => {
    dispatch(setFrontendElement(!isSidebarCollapsed));
  };
  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <div className={styles.logo_container}>
          <div className="d-flex">
            {TokenManager.validateAuth() && (
              <div className="">
                <button
                  className={`btn bg-transparent toggle-navbar ${
                    isSidebarCollapsed ? "_collapse" : "_expended"
                  } ${deviceWidth > 768 ? "d-none" : ""}`}
                  onClick={() => {
                    toggleSidebar();
                  }}
                >
                  <span className="toggle-navbar-icon">
                    <ToggleIcon />
                  </span>
                </button>
              </div>
            )}
            <Link href="https://thelexbot.com/" className={styles.brand_text}>
              <img
                src="https://storage.googleapis.com/lex_assets/lex.png"
                alt=""
                style={{ width: 87 }}
              />
            </Link>
          </div>
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
                className="bg-secondary d-inline-block rounded-circle position-absolute overflow-hidden"
                style={{ width: 30, height: 30, top: 3, left: 11 }}
              >
                <img
                  className="w-100 h-100 object-cover"
                  src="https://storage.googleapis.com/lex_assets/profile_avatar.png"
                  alt=""
                />
              </span>
            </button>
            <ul className="dropdown-menu p-0 border-0 shadow rounded-2 overflow-hidden">
              <li className="px-3 py-3 bg-secondary text-white bg-opacity-25">
                {data?.first_name ? (
                  <span className="d-inline-block w-100 fw-bold text-darken">
                    {data?.first_name} {data?.last_name}
                  </span>
                ) : (
                  <span className="d-inline-block w-100 fw-bold text-darken">
                    No Name
                  </span>
                )}
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
          rightHandCta.href &&
          rightHandCta.name && (
            <Link href={rightHandCta.href}>
              <AppButton
                text={rightHandCta.name}
                className={styles.login_button}
              />
            </Link>
          )
        )}
      </div>
    </header>
  );
}

export default Header;
