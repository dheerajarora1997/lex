"use client";

import Sidebar from "../../components/common/sidebar";
import ConversationChat from "../ConversationChat";
import ModalDilogGroup from "@/app/ModalDilogGroup";
import Link from "next/link";
import { useAppSelector } from "../../store/store";
import { useEffect, useState } from "react";
import { useBookMarkConversationMutation } from "@/app/apiService/services/conversationApi";

const Page = () => {
  const pageThreadId = useAppSelector(
    (state) => state.frontendElements.threadId
  );
  const conversationId = useAppSelector(
    (state) => state.frontendElements.conversationId
  );
  const [bookMarkConversation, { data }] = useBookMarkConversationMutation();
  // const { refetch: starredThreads } = useStarredThreadsQuery({});
  const [pageId, setPageId] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPageId(window.location.pathname.split("/")[2]);
    } else {
      setPageId(conversationId ?? "");
    }
  }, [conversationId]);

  const bookmarkConvo = () => {
    bookMarkConversation(conversationId || pageId);
  };

  if (data) {
    // starredThreads();
  }

  return (
    <>
      <Sidebar />
      <div className="w-100 ps-4 ps-md-0 ms-2 ms-md-0">
        <div className="row m-0 mt-2 justify-content-between bg-body-tertiary p-2 border-bottom">
          <div className="col-12 col-sm-4">
            {pageThreadId && (
              <>
                <Link
                  className="text-decoration-none me-2 text-primary"
                  href={`/thread/${pageThreadId}`}
                >
                  🡐
                </Link>
                Back to Thread: {pageThreadId}
              </>
            )}
          </div>
          <div className="col-12 col-sm-6">
            <ul className="d-flex justify-content-end m-0 p-0">
              <li className="list-group-item mx-2">
                <button
                  className="btn p-0"
                  onClick={() => {
                    bookmarkConvo();
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2ZM18 4H6V19.4324L12 15.6707L18 19.4324V4Z"
                      fill="#8D8D8D"
                    />
                  </svg>
                </button>
              </li>
              <li className="list-group-item mx-2">
                <button className="btn p-0">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z"
                      fill="#8D8D8D"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <ConversationChat id={pageId} idType="conversation" />
      </div>
      <ModalDilogGroup />
    </>
  );
};

export default Page;
