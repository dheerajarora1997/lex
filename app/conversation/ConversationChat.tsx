"use client";

import { useEffect, useState } from "react";
import "../styles/components/ConversationChat.scss";
import { isFetchBaseQueryError } from "../utils/apiErrorUtils";
import { showErrorToast } from "../hooks/useNotify";
import { APIErrorData } from "../models/commonApiModels";
import { APP_ERROR_MESSAGE } from "../constants/appConstants";
import {
  useViewConvoThreadQuery,
  useCreateConversationMutation,
  useViewConversationQuery,
} from "../apiService/services/conversationApi";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Loader from "../components/common/Loader";
import { useRouter } from "next/navigation";

interface ConversationChatProps {
  id: string;
  idType: "thread" | "conversation";
}

interface Ichat {
  id: string;
  message: string;
  sender: "userInput" | "aiResponse";
  thread?: string;
}

interface IcaseDetails {
  banch?: string;
  case_number: string;
  case_id: string;
  result_id?: string;
  result_type?: string;
}

interface IConvoThreadData {
  id: number;
  user_input: string;
  ai_response: string;
  search_results?: IcaseDetails[];
}

export default function ConversationChat({
  id,
  idType,
}: ConversationChatProps) {
  const route = useRouter();
  const isSidebarCollapsed = useSelector(
    (state: RootState) => state.frontendElements.sidebarCollapse
  );
  const deviceWidth = typeof window !== "undefined" ? window.innerWidth : 0;

  const [userQuery, setUserQuery] = useState("");
  const [chatList, setChatList] = useState<Ichat[]>([]);

  // const {
  //   isLoading,
  //   isError,
  //   data: threadData,
  //   error,
  //   // refetch: viewThread,
  // } = useViewThreadQuery({ id: id });

  const { data: convoThreadData, refetch: viewConvoThread } =
    useViewConvoThreadQuery({ id: id }, { skip: !!id && idType !== "thread" });

  const [
    createConversation,
    {
      data: conversationData,
      isLoading: conversationIsLoading,
      isError: conversationIsError,
      error: conversationError,
    },
  ] = useCreateConversationMutation();

  const { data: conversationDataView, refetch: viewConversation } =
    useViewConversationQuery(
      { id: id?.toString() },
      { skip: !!id && idType !== "conversation" }
    );

  useEffect(() => {
    if (id && idType === "thread") {
      viewConvoThread();
    } else if (id && idType === "conversation") {
      viewConversation();
    }
    if (false) {
      createConversation({});
    }
  }, [id, idType]);

  useEffect(() => {
    if (false) {
      setChatList([]);
      viewConversation();
    }
    //  else {
    //   createConversation({
    //     thread: threadData?.id.toString() || "",
    //     user_input: threadData?.title || "",
    //   });
    //   const chat: Ichat[] = [];
    //   chat.push({
    //     id: threadData?.id.toString(),
    //     message: threadData?.title,
    //     sender: "userInput",
    //   });
    //   setChatList(chat);
    // }
  }, []);

  // useEffect(() => {
  //   if (isError && error) {
  //     if (isFetchBaseQueryError(error) && error?.status === 401) {
  //       const errorData = error.data as APIErrorData;
  //       showErrorToast(errorData?.detail ?? APP_ERROR_MESSAGE);
  //     } else {
  //       showErrorToast(APP_ERROR_MESSAGE);
  //     }
  //   }
  // }, [isError, error, conversationIsError, conversationError]);

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
      thread: conversationData?.thread?.toString(),
      message: conversationData?.user_input,
      sender: "userInput",
    };

    const aiMessage: Ichat = {
      id: conversationData?.id?.toString(),
      thread: conversationData?.thread?.toString(),
      message:
        `${conversationData?.ai_response} ${
          conversationData?.search_results?.length
            ? `<hr /><div class="conversationDetail-list"><h4 class="fs-6">Source:</h4> <ol class="">${conversationData?.search_results?.map(
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
        thread: conversationDataView?.thread?.toString(),
        message: conversationDataView?.user_input,
        sender: "userInput",
      };

      const aiMessage: Ichat = {
        id: conversationDataView?.id?.toString(),
        thread: conversationDataView?.thread?.toString(),
        message:
          `${conversationDataView?.ai_response} ${
            conversationDataView?.details?.length
              ? `<hr /><div class="conversationDetail-list"><h4 class="fs-6">Details:</h4> <ol class="">${conversationDataView?.details?.map(
                  (detailItem: IcaseDetails, index: number) =>
                    `<li key="${index}"><span class="fw-bold">${detailItem?.case_id}</span><span>${detailItem?.case_number}</span></li>`
                )}</ol><div>`
              : ""
          } ${
            conversationDataView?.search_results?.length
              ? `<hr /><div class="conversationDetail-list"><h4 class="fs-6">Source:</h4> <ol class="">${conversationDataView?.details?.map(
                  (detailItem: IcaseDetails, index: number) =>
                    `<li key="${index}"><span class="fw-bold">${detailItem?.result_id}</span><span>${detailItem?.result_type}</span></li>`
                )}</ol><div>`
              : ""
          }` || "",
        sender: "aiResponse",
      };
      setChatList(() => [userMessage, aiMessage]);
    }
  }, [conversationDataView]);

  // view thread connvo data
  useEffect(() => {
    if (convoThreadData) {
      setChatList([]);
      const updatedChatList = convoThreadData.map(
        (dataItem: IConvoThreadData) => {
          // User message
          const userMessage: Ichat = {
            id: dataItem.id.toString(),
            message: dataItem.user_input,
            sender: "userInput",
          };

          // AI message with details if search results exist
          const aiMessage: Ichat = {
            id: dataItem.id.toString(),
            message:
              `${dataItem.ai_response} ${
                dataItem.search_results?.length
                  ? `<hr /><div class="conversationDetail-list">
                      <h4 class="fs-6">Source:</h4> 
                      <ol class="">
                        ${dataItem.search_results
                          .map(
                            (detailItem: IcaseDetails, index: number) =>
                              `<li key="${index}">
                                <span class="fw-bold">${detailItem.result_id}</span>
                                <span>${detailItem.result_type}</span>
                              </li>`
                          )
                          .join("")}
                      </ol>
                    </div>`
                  : ""
              }` || "",
            sender: "aiResponse",
          };

          return [userMessage, aiMessage];
        }
      );

      // Flatten the chat list
      setChatList(updatedChatList.flat());
    }
  }, [convoThreadData]);

  const sendToConvo = (convoId: string) => {
    route.push(`/conversation/${convoId}`);
  };

  return (
    <>
      {conversationIsLoading && (
        <div className="backdrop">
          <Loader />
        </div>
      )}
      <div className={`chat-container ${deviceWidth < 768 ? "ps-5" : ""}`}>
        <div className="chat-wrapper">
          <div className="chat-box">
            {/* chat bubbles will be gen here */}
            {chatList?.map((chat, index) => {
              const convoId = chat?.id;
              return (
                <div
                  key={index}
                  data-id={chat.id}
                  data-thread={chat?.thread}
                  onClick={() => {
                    if (idType === "thread") {
                      sendToConvo(convoId);
                    }
                  }}
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
              );
            })}
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
