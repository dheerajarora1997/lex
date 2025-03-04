"use client";
import { FormEvent, useEffect, useState } from "react";
import "../styles/components/blankChat.scss";
import { QUERY_SUGGESTIONS } from "./constants";
import {
  useCreateThreadMutation,
  useCreateConversationMutation,
} from "../apiService/services/conversationApi";
import { isFetchBaseQueryError } from "../utils/apiErrorUtils";
import { showErrorToast } from "../hooks/useNotify";
import { APP_ERROR_MESSAGE } from "../constants/appConstants";
import { useRouter } from "next/navigation";
import Loader from "../components/common/Loader";
import RightArrow from "../assets/icons/RightArrow";
import FancyLoader from "../components/common/FancyLoader";
interface FetchBaseQueryError {
  data?: {
    non_field_errors?: string[];
    message?: string;
  };
}

export default function BlankChat() {
  const deviceWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  const router = useRouter();
  const [userQuery, setUserQuery] = useState("");
  const [fancyLoader, setFancyLoader] = useState(false);
  const [createThread, { data: createThreadData, isLoading, isError, error }] =
    useCreateThreadMutation();

  const [
    createConversation,
    { data: conversationData, isLoading: conversationLoading },
  ] = useCreateConversationMutation();

  useEffect(() => {
    if (createThreadData && userQuery) {
      setFancyLoader(true);
      createConversation({
        thread: createThreadData?.id.toString() || "",
        user_input: createThreadData?.title || "",
      });
      // To need to route on conversation page
      // router.push(`/thread/${createThreadData?.id}`);
    }
  }, [createThreadData]);

  useEffect(() => {
    if (conversationData) {
      router.push(`/conversation/${conversationData.id}`);
    }
  }, [conversationData]);

  useEffect(() => {
    if (isError && error) {
      if (isFetchBaseQueryError(error) && error?.status === 401) {
        const errorMessage =
          (error as FetchBaseQueryError)?.data?.message || "An error occurred";
        showErrorToast(errorMessage);
      } else {
        showErrorToast(APP_ERROR_MESSAGE);
      }
    }
  }, [isError, error]);

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!conversationLoading || !isLoading) {
      if (userQuery) {
        createThread({ title: userQuery });
      } else {
        alert("kindly add some text to search");
      }
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {fancyLoader && <FancyLoader title={userQuery} />}
      {!fancyLoader && (
        <div
          className="container mt-3 d-flex justify-content-center align-items-center"
          style={{ minHeight: "calc(100vh - 50px)" }}
        >
          <div
            className={`blank-chat m-auto ${deviceWidth < 768 ? "ps-2" : ""}`}
          >
            <div className="">
              <h1 className="fs-4 text-center">
                What would you like to search today?
              </h1>
              <div className="form-group position-relative mb-4 col-sm-12 col-md-8 mx-auto">
                <form onSubmit={submitForm}>
                  <input
                    type="text"
                    className="form-control rounded-5 pe-5 shadow"
                    placeholder="Search here..."
                    value={userQuery}
                    onChange={(e) => {
                      setUserQuery(e?.target?.value);
                    }}
                  />
                  <button className="search-btn icon-btn rounded-5 btn btn-secondary d-flex justify-content-center align-items-center bg-dark text-white p-1">
                    <RightArrow />
                  </button>
                </form>
              </div>
              <div className="text-start">
                <h4 className="fs-6">Trending Searches…</h4>
                <div className="row">
                  {QUERY_SUGGESTIONS?.map(
                    (suggestion: string, index: number) => {
                      return (
                        <div key={index} className="col-sm-12 col-md-6">
                          <button
                            className="alert bg-primary bg-opacity-10 text-start w-100 shadow mb-2 mb-md-4"
                            onClick={() => {
                              setUserQuery(suggestion);
                            }}
                          >
                            {suggestion}
                          </button>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
