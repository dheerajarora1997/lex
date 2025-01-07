"use client";

import { useDispatch } from "react-redux";
import "./sidebar.scss";
import { useAppSelector } from "@/app/store/hooks";

export default function Sidebar() {
  const dispatch = useDispatch();
  const conversationData = useAppSelector((state) => state?.conversationData);

  console.log(conversationData, dispatch);

  return (
    <aside className="sidebar p-3 border-end">
      <div className="sidebar-btn-wrapper">
        <button
          className="btn btn-light w-100 d-flex justify-content-between"
          onClick={() => {
            //   dispatch(increment());

            console.log("button clicked");
          }}
          data-bs-toggle="modal"
          data-bs-target="#firstModal"
        >
          <span>New Research</span>
          <span className="fw-bold fs-5 lh-1">+</span>
        </button>
      </div>
      <div className="recent-search mt-3">
        <h4 className="fs-6 fw-bold">Past Search</h4>
        <h6 className="text-dark small">This week</h6>
        <div className="search-result">
          <div className="search-result-item">
            <span>Item #1 text and overflow test</span>
            <span className="search-result-icons">
              <button className="p-0 border-0 bg-transparent">🗑️</button>
            </span>
          </div>
          <div className="search-result-item">
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
          <div className="search-result-item">
            <span>Item #1 text and overflow test</span>
            <span className="search-result-icons">
              <button className="p-0 border-0 bg-transparent">🗑️</button>
            </span>
          </div>
          <div className="search-result-item">
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
