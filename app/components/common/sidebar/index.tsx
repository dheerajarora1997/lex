"use client";

// import { useThreadsQuery } from "@/app/apiService/services/conversationApi";
import "./sidebar.scss";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const sendToThread = (id: string) => {
    router.push(`/conversation/${id}`);
  };

  const pathname = usePathname();
  const threadId = pathname.split("/")[2];
  console.log(threadId);

  // const [{ isLoading, isError, data, error, status }] = useThreadsQuery();
  // console.log({ isLoading, isError, data, error, status });

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
          <div
            className="search-result-item"
            onClick={() => {
              sendToThread("qwe-qweqweqw-qweqweqwe");
            }}
          >
            <span>Item #1 text and overflow test</span>
            <span className="search-result-icons">
              <button className="p-0 border-0 bg-transparent">🗑️</button>
            </span>
          </div>
          <div
            className="search-result-item"
            onClick={() => {
              sendToThread("dfsdf-sdfsdf-sdf");
            }}
          >
            <span>Item #2 text and overflow test</span>
            <span className="search-result-icons">
              <button className="p-0 border-0 bg-transparent">🗑️</button>
            </span>
          </div>
        </div>
      </div>
      <div className="saved-search">
        <h4 className="fs-6 fw-bold">Bookmark</h4>
        <div className="search-result">
          <div
            className="search-result-item"
            onClick={() => {
              sendToThread("fsdf-sdfsd-sdfsdfdsf");
            }}
          >
            <span>Item #1 text and overflow test</span>
            <span className="search-result-icons">
              <button className="p-0 border-0 bg-transparent">🗑️</button>
            </span>
          </div>
          <div
            className="search-result-item"
            onClick={() => {
              sendToThread("sdfsdf-sdfsdf-sdsdf");
            }}
          >
            <span>Item #2 text and overflow test</span>
            <span className="search-result-icons">
              <button className="p-0 border-0 bg-transparent">🗑️</button>
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
