"use client";

import {
  useDeleteThreadMutation,
  useStarredThreadsQuery,
  useThreadsQuery,
} from "@/app/apiService/services/conversationApi";
import "./sidebar.scss";
import { useRouter, usePathname } from "next/navigation";

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

  const sendToThread = (id: string) => {
    router.push(`/conversation/${id}`);
  };

  const pathname = usePathname();
  const threadId = pathname.split("/")[2];
  console.log(threadId);

  const { data, isLoading, isError, error } = useThreadsQuery({});
  const { data: staredThreadsData } = useStarredThreadsQuery({});

  const [deleteThread] = useDeleteThreadMutation();

  console.log(data, isLoading, isError, error, "sidebar", staredThreadsData);

  return (
    <aside className="sidebar p-3 border-end">
      <div className="sidebar-btn-wrapper">
        <button
          className="btn bg-transparent w-100 d-flex justify-content-between border px-3 py-2"
          onClick={() => {
            sendToThread("new");
          }}
        >
          <span>New Research</span>
          <span className="fw-bold fs-5 lh-1">+</span>
        </button>
      </div>
      <div className="recent-search mt-3">
        <h4 className="fs-6 fw-bold">Past Search</h4>
        <h6 className="text-dark small">This week</h6>
        <div className="search-result">
          {data?.results?.map((item: IthreadItem, index: number) => {
            return (
              <div
                className="search-result-item"
                key={index}
                data-slug={item?.slug}
                data-id={item?.id}
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
          })}
        </div>
      </div>
      <div className="saved-search">
        <h4 className="fs-6 fw-bold">Bookmark</h4>
        <div className="search-result">
          {staredThreadsData?.results?.map(
            (item: IthreadItem, index: number) => {
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
