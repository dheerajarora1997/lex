"use client";

import Sidebar from "../../components/common/sidebar";
import ConversationChat from "../ConversationChat";
import ModalDilogGroup from "@/app/ModalDilogGroup";
import Link from "next/link";
import { useAppSelector } from "../../store/store";
import { useEffect, useState } from "react";

const Page = () => {
  const pageThreadId = useAppSelector(
    (state) => state.frontendElements.threadId
  );
  const conversationId = useAppSelector(
    (state) => state.frontendElements.conversationId
  );

  const [pageId, setPageId] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPageId(window.location.pathname.split("/")[2]);
    } else {
      setPageId(conversationId ?? "");
    }
  }, [conversationId]);

  return (
    <>
      <Sidebar />
      <div className="w-100">
        <div className="row m-0 mt-2 justify-content-between bg-body-tertiary p-2 border-bottom">
          <div className="col-12">
            {pageThreadId && (
              <>
                <Link
                  className="text-decoration-none me-2 text-primary"
                  href={`/thread/${pageThreadId}`}
                >
                  🡐 <span className="text-darken"> Go to this research</span>
                </Link>
              </>
            )}
          </div>
        </div>
        <ConversationChat id={pageId} idType="conversation" />
      </div>
      <ModalDilogGroup />
    </>
  );
};

export default Page;
