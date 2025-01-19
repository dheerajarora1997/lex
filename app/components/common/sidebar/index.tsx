"use client";

import {
  useDeleteThreadMutation,
  useStarredThreadsQuery,
  useThreadsQuery,
} from "@/app/apiService/services/conversationApi";
import "./sidebar.scss";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { setFrontendElement } from "@/app/store/slices/frontendElements";
import { useEffect } from "react";

interface IthreadItem {
  id: number; // Unique identifier for the thread
  title: string; // Title of the thread
  slug: string; // URL-friendly identifier for the thread
  description: string | null; // Description of the thread, can be null
  is_shareable: boolean; // Indicates if the thread is shareable
  is_starred: boolean; // Indicates if the thread is marked as starred
  created_at: string; // Date and time when the thread was created (ISO 8601 format)
  updated_at: string; // Date and time when the thread was last updated (ISO 8601 format)
}
export default function Sidebar() {
  const router = useRouter();
  const deviceWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  const isSidebarCollapsed = useSelector(
    (state: RootState) => state.frontendElements.sidebarCollapse
  );
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    dispatch(setFrontendElement(!isSidebarCollapsed));
  };

  const sendToThread = (id: string) => {
    id === "new"
      ? router.push(`/conversation/new`)
      : router.push(`/thread/${id}`);
    // router.push(`/conversation/${id}`);
  };

  const pathname = usePathname();
  const threadId = pathname.split("/")[2];

  const { data } = useThreadsQuery({});
  const { data: staredThreadsData } = useStarredThreadsQuery({});

  const [deleteThread] = useDeleteThreadMutation();

  useEffect(() => {
    if (deviceWidth < 768) {
      dispatch(setFrontendElement(true));
    }
  }, []);

  return (
    <aside
      className={`sidebar p-3 bg-white border-end z-3 ${
        isSidebarCollapsed ? "_collapse" : "_expended"
      } ${deviceWidth < 768 ? "position-absolute" : ""}`}
    >
      <div className="sidebar-btn-wrapper">
        <button
          className={`btn bg-transparent d-flex justify-content-between border py-2 px-3 ${
            deviceWidth > 768 ? "w-100" : ""
          }`}
          onClick={() => {
            sendToThread("new");
          }}
        >
          <span>New Research</span>
          <span className="fw-bold fs-5 lh-1">+</span>
        </button>
        <button
          className={`btn bg-transparent toggle-navbar ${
            isSidebarCollapsed ? "_collapse" : "_expended"
          } ${deviceWidth > 768 ? "d-none" : ""}`}
          onClick={() => {
            toggleSidebar();
          }}
        >
          <span className="toggle-navbar-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </svg>
          </span>
        </button>
      </div>
      <div className="recent-search mt-3">
        <h4 className="fs-6 fw-bold">Past Search</h4>
        <h6 className="text-dark small">This week</h6>
        <div className="search-result">
          {data?.results?.map((item: IthreadItem, index: number) => {
            if (index > 4) return null;
            return (
              <div
                className="search-result-item"
                key={index}
                data-slug={item?.slug}
                data-id={item?.id}
                onClick={() => {
                  sendToThread(item?.id.toString());
                }}
              >
                <span>{item?.title}</span>
                <span className="search-result-icons">
                  <button
                    className="p-0 border-0 bg-transparent"
                    onClick={() => {
                      deleteThread(item?.id.toString());
                    }}
                  >
                    🗑️
                  </button>
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="saved-search">
        <h4 className="fs-6 fw-bold">Bookmark</h4>
        <div className="search-result">
          {staredThreadsData?.results?.map(
            (item: IthreadItem, index: number) => {
              if (index > 4) return null;
              return (
                <div
                  className="search-result-item"
                  key={index}
                  onClick={() => {
                    sendToThread(item?.slug);
                  }}
                >
                  <span>{item?.title}</span>
                  <span className="search-result-icons">
                    <button
                      className="p-0 border-0 bg-transparent"
                      onClick={() => {
                        deleteThread(item?.id.toString());
                      }}
                    >
                      🗑️
                    </button>
                  </span>
                </div>
              );
            }
          )}
        </div>
      </div>
    </aside>
  );
}
