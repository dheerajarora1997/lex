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
} from "../apiService/services/conversationApi";

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
  console.log({
    conversationIsLoading,
    conversationStatus,
  });

  console.log({ isLoading, status });
  useEffect(() => {
    if (threadId) {
      viewThread();
      setParamsCondition(Boolean(window.location.search));
    }
  }, [threadId]);

  useEffect(() => {
    if (threadData && !paramsCondition) {
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
    if (!paramsCondition) {
      setChatList([]);
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

  useEffect(() => {
    if (conversationData) {
      setChatList([]);
    }
    console.log(conversationData, "conversationData");
    const userMessage: Ichat = {
      id: conversationData?.id?.toString(),
      message: conversationData?.user_input,
      sender: "userInput",
    };

    const aiMessage: Ichat = {
      id: conversationData?.id?.toString(),
      message:
        `${
          conversationData?.ai_response
        } <hr /> <ul className="conversationDetail-list">${conversationData?.details?.map(
          (detailItem: IcaseDetails, index: number) => {
            return `<li key="${index}"><span>${detailItem?.case_id}</span><span>${detailItem?.case_number}</span></li>`;
          }
        )}</ul>` || "",
      sender: "aiResponse",
    };
    setChatList(() => [userMessage, aiMessage]);
  }, [conversationData]);

  return (
    <div className="chat-container">
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
