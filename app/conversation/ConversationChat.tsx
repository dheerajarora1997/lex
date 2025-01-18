"use client";

import { useEffect, useState } from "react";
import "../styles/components/ConversationChat.scss";
import { isFetchBaseQueryError } from "../utils/apiErrorUtils";
import { showErrorToast } from "../hooks/useNotify";
import { APIErrorData } from "../models/commonApiModels";
import { APP_ERROR_MESSAGE } from "../constants/appConstants";
import {
  useViewThreadQuery,
  useCreateConversationMutation,
  useViewConversationQuery,
} from "../apiService/services/conversationApi";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Loader from "../components/common/Loader";

interface ConversationChatProps {
  threadId: string;
}

interface Ichat {
  id: string;
  message: string;
  sender: "userInput" | "aiResponse";
}

interface IcaseDetails {
  banch?: string;
  case_number: string;
  case_id: string;
}

export default function ConversationChat({ threadId }: ConversationChatProps) {
  const isSidebarCollapsed = useSelector(
    (state: RootState) => state.frontendElements.sidebarCollapse
  );

  const [userQuery, setUserQuery] = useState("");
  const [chatList, setChatList] = useState<Ichat[]>([]);
  const [paramsCondition, setParamsCondition] = useState<boolean>(false);
  const {
    isLoading,
    isError,
    data: threadData,
    error,
    status,
    refetch: viewThread,
  } = useViewThreadQuery({ id: threadId });
  console.log(isLoading, status);

  const [
    createConversation,
    {
      data: conversationData,
      isLoading: conversationIsLoading,
      isError: conversationIsError,
      error: conversationError,
      status: conversationStatus,
    },
  ] = useCreateConversationMutation();

  console.log(conversationIsLoading, conversationStatus);

  const { data: conversationDataView, refetch: viewConversation } =
    useViewConversationQuery(
      { id: threadData?.id.toString() },
      {
        skip: !threadData,
      }
    );

  console.log(conversationDataView);

  useEffect(() => {
    if (threadId) {
      viewThread();
      setParamsCondition(Boolean(window?.location?.search));
    }
  }, [threadId]);

  useEffect(() => {
    if (threadData) {
      if (paramsCondition) {
        setChatList([]);
        viewConversation();
      } else {
        createConversation({
          thread: threadData?.id.toString() || "",
          user_input: threadData?.title || "",
        });
        const chat: Ichat[] = [];
        chat.push({
          id: threadData?.id.toString(),
          message: threadData?.title,
          sender: "userInput",
        });
        setChatList(chat);
      }
    }
  }, [threadData]);

  useEffect(() => {
    if (isError && error) {
      if (isFetchBaseQueryError(error) && error?.status === 401) {
        const errorData = error.data as APIErrorData;
        showErrorToast(errorData?.detail ?? APP_ERROR_MESSAGE);
      } else {
        showErrorToast(APP_ERROR_MESSAGE);
      }
    }
  }, [isError, error, conversationIsError, conversationError]);

  useEffect(() => {
    if (conversationIsError && conversationError) {
      if (
        isFetchBaseQueryError(conversationError) &&
        conversationError?.status === 401
      ) {
        const errorData = conversationError.data as APIErrorData;
        showErrorToast(errorData?.detail ?? APP_ERROR_MESSAGE);
      } else {
        showErrorToast(APP_ERROR_MESSAGE);
      }
    }
  }, [conversationIsError, conversationError]);

  // First conversation Data
  useEffect(() => {
    if (conversationData) {
      setChatList([]);
    }
    const userMessage: Ichat = {
      id: conversationData?.id?.toString(),
      message: conversationData?.user_input,
      sender: "userInput",
    };

    const aiMessage: Ichat = {
      id: conversationData?.id?.toString(),
      message:
        `${conversationData?.ai_response} ${
          conversationData?.details?.length
            ? `<hr /><div class="conversationDetail-list"><h4 class="fs-6">Source:</h4> <ol class="">${conversationData?.details?.map(
                (detailItem: IcaseDetails, index: number) =>
                  `<li key="${index}"><span class="fw-bold">${detailItem?.case_id}</span><span>${detailItem?.case_number}</span></li>`
              )}</ol><div>`
            : ""
        }` || "",
      sender: "aiResponse",
    };
    setChatList(() => [userMessage, aiMessage]);
  }, [conversationData]);

  // view already created conversation

  useEffect(() => {
    if (conversationDataView) {
      // To Do set data in Set chat list
      setChatList([]);
      const userMessage: Ichat = {
        id: conversationDataView?.id?.toString(),
        message: conversationDataView?.user_input,
        sender: "userInput",
      };

      const aiMessage: Ichat = {
        id: conversationDataView?.id?.toString(),
        message:
          `${conversationDataView?.ai_response} ${
            conversationDataView?.details?.length
              ? `<hr /><div class="conversationDetail-list"><h4 class="fs-6">Source:</h4> <ol class="">${conversationDataView?.details?.map(
                  (detailItem: IcaseDetails, index: number) =>
                    `<li key="${index}"><span class="fw-bold">${detailItem?.case_id}</span><span>${detailItem?.case_number}</span></li>`
                )}</ol><div>`
              : ""
          }` || "",
        sender: "aiResponse",
      };
      setChatList(() => [userMessage, aiMessage]);
    }
  }, [conversationDataView]);

  return (
    <>
      {(isLoading || conversationIsLoading) && (
        <div className="backdrop">
          <Loader />
        </div>
      )}
      <div className={`chat-container ${isSidebarCollapsed ? "px-5" : ""}`}>
        <div className="chat-wrapper">
          <div className="chat-box">
            {/* chat bubbles will be gen here */}
            {chatList.map((chat, index) => (
              <div
                key={index}
                className={`chat-bubble ${
                  chat?.sender === "userInput" ? "person1" : "person2"
                }`}
              >
                {chat?.sender === "userInput" ? (
                  chat.message
                ) : chat.message ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: chat?.message,
                    }}
                  />
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
          <div
            className={`chat-input-wrapper ${isSidebarCollapsed ? "px-5" : ""}`}
          >
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
    </>
  );
}
