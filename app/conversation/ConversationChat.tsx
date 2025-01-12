"use client";

import { useEffect, useState } from "react";
import "../styles/components/ConversationChat.scss";
import { useViewThreadQuery } from "../apiService/services/conversationApi";
import { isFetchBaseQueryError } from "../utils/apiErrorUtils";
import { showErrorToast } from "../hooks/useNotify";
import { APIErrorData } from "../models/commonApiModels";
import { APP_ERROR_MESSAGE } from "../constants/appConstants";

interface ConversationChatProps {
  threadId: string;
}

export default function ConversationChat({ threadId }: ConversationChatProps) {
  const [userQuery, setUserQuery] = useState("");
  const {
    isLoading,
    isError,
    data,
    error,
    status,
    refetch: viewThread,
  } = useViewThreadQuery({ id: threadId });

  console.log({ isLoading, isError, data, error, status });
  useEffect(() => {
    if (threadId) {
      viewThread();
    }
  }, [threadId]);

  useEffect(() => {
    if (isError && error) {
      if (isFetchBaseQueryError(error) && error?.status === 401) {
        const errorData = error.data as APIErrorData;
        showErrorToast(errorData?.detail ?? APP_ERROR_MESSAGE);
      } else {
        showErrorToast(APP_ERROR_MESSAGE);
      }
    }
  }, [isError, error]);
  return (
    <div className="chat-container">
      <div className="chat-wrapper">
        <div className="chat-box">
          {/* chat bubbles will be gen here */}
          <div className={`chat-bubble person1`}>
            Accessibility tip: Using color to add meaning only provides a visual
            indication, which will not be conveyed to users of assistive
            technologies like screen readers.
          </div>
          <div className={`chat-bubble person2`}>
            <p>
              Accessibility tip: Using color to add meaning only provides a
              visual indication, which will not be conveyed to users of
              assistive technologies like screen readers. Please ensure the
              meaning is obvious from the content itself (e.g., the visible text
              with a sufficient color contrast) or is included through
              alternative means, such as additional text hidden with the
              .visually-hidden class.
            </p>
            <button
              className="btn btn-secondary btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#firstModal"
            >
              Open Modal
            </button>
          </div>
          <div className={`chat-bubble person1`}>
            Please ensure the meaning is obvious from the content itself (e.g.,
            the visible text with a sufficient color contrast) or is included
            through alternative means, such as additional text hidden with the
            .visually-hidden class.
          </div>
          <div className={`chat-bubble person2`}>
            Accessibility tip: Using color to add meaning only provides a visual
            indication, which will not be conveyed to users of assistive
            technologies like screen readers. Please ensure the meaning is
            obvious from the content itself (e.g., the visible text with a
            sufficient color contrast) or is included through alternative means,
            such as additional text hidden with the .visually-hidden class.
          </div>
        </div>
        <div className="chat-input-wrapper">
          <div className="chat-input-container">
            <div className="form-group w-100 position-relative">
              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="Type a message..."
                className="chat-input form-control rounded-5 pe-5"
              />
              <button
                className="search-btn icon-btn rounded-5 btn btn-secondary d-flex justify-content-center align-items-center"
                onClick={() => {
                  console.log("btn click");
                  // dispatch(increment());
                }}
              >
                🡒
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
