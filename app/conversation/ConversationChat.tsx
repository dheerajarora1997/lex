"use client";

import { FormEvent, useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import Loader from "../components/common/Loader";
import { useRouter } from "next/navigation";
import {
  setModalData,
  setPageThreadId,
  setConversationId,
} from "../store/slices/frontendElements";

interface ConversationChatProps {
  id: string;
  idType: "thread" | "conversation";
}

interface Ichat {
  id: string;
  message: string;
  sender: "userInput" | "aiResponse";
  thread?: string;
  search_results?: IcaseDetails[];
  details?: IcaseDetails[];
}

export interface IcaseDetails {
  banch?: string;
  case_number: string;
  case_id: string;
  result_id?: string;
  result_type?: string;
  case_content?: string;
  is_cited?: boolean;
}

interface IConvoThreadData {
  id: number;
  user_input: string;
  ai_response: string;
  thread?: string;
  search_results?: IcaseDetails[];
}

export default function ConversationChat({
  id,
  idType,
}: ConversationChatProps) {
  const route = useRouter();
  const dispatch = useDispatch();
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

  const {
    data: convoThreadData,
    error: convoThreadError,
    isError: isConvoThreadError,
    status: convoThreadStatus,
    isLoading: convoThreadIsLoading,
    refetch: viewConvoThread,
  } = useViewConvoThreadQuery({ id: id }, { skip: !id || idType !== "thread" });

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

  const {
    data: conversationDataView,
    error,
    isError,
    status,
    isLoading,
    refetch: viewConversation,
  } = useViewConversationQuery(
    { id: id?.toString() },
    { skip: !!id && idType !== "conversation" }
  );

  const chatWrapper =
    typeof document !== undefined &&
    document.querySelector(".chat-container .chat-wrapper");

  useEffect(() => {
    if (id && idType === "thread") {
      viewConvoThread();
    } else if (id && idType === "conversation") {
      viewConversation();
    }
    dispatch(setModalData(null));
  }, [id, idType]);

  useEffect(() => {
    if (
      isError ||
      error ||
      conversationIsError ||
      conversationError ||
      convoThreadError ||
      isConvoThreadError
    ) {
      if (isFetchBaseQueryError(error)) {
        const errorData = error.data as APIErrorData;
        showErrorToast(errorData?.detail ?? APP_ERROR_MESSAGE);
      } else {
        showErrorToast(APP_ERROR_MESSAGE);
      }
    }
    // if (
    //   status === "rejected" ||
    //   conversationStatus === "rejected" ||
    //   convoThreadStatus === "rejected"
    // ) {
    //   route.push("/auth/login");
    // }
  }, [
    isError,
    error,
    conversationIsError,
    conversationError,
    convoThreadError,
    isConvoThreadError,
    status,
    conversationStatus,
    convoThreadStatus,
  ]);

  // First conversation Data
  useEffect(() => {
    const userMessage: Ichat = {
      id: conversationData?.id?.toString(),
      thread: conversationData?.thread?.toString(),
      message: conversationData?.user_input,
      sender: "userInput",
    };

    const aiMessage: Ichat = {
      id: conversationData?.id?.toString(),
      thread: conversationData?.thread?.toString(),
      message: conversationData?.ai_response,
      search_results: conversationData?.search_results,
      details: conversationData?.details,
      sender: "aiResponse",
    };
    setChatList((prev) => [...prev, userMessage, aiMessage]);
    setTimeout(() => {
      if (chatWrapper) {
        chatWrapper.scrollTop = chatWrapper.scrollHeight;
      }
    }, 1000);
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
        message: conversationDataView?.ai_response,
        search_results: conversationDataView?.search_results,
        details: conversationDataView?.details,
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
            thread: dataItem?.thread?.toString(),
          };

          // AI message with details if search results exist
          const aiMessage: Ichat = {
            id: dataItem.id.toString(),
            message: dataItem.ai_response,
            sender: "aiResponse",
            thread: dataItem?.thread?.toString(),
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

  const [threadId, setThreadId] = useState<string | undefined>(undefined);
  useEffect(() => {
    setThreadId(chatList?.[0]?.thread);
  }, [chatList]);

  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createConversation({
      thread: idType === "thread" ? id : threadId,
      user_input: userQuery,
    });
  };

  // useEffect(() => {
  //   if (idType === "conversation" && chatList?.length) {
  //     dispatch(setPageThreadId(chatList?.[0]?.thread));
  //     dispatch(setConversationId(chatList?.[0]?.id));
  //   }
  // }, [chatList]);

  return (
    <>
      {(conversationIsLoading || convoThreadIsLoading || isLoading) && (
        <Loader />
      )}

      <div className={`chat-container ${deviceWidth < 768 ? "ps-5" : ""}`}>
        <div className="chat-wrapper pb-5">
          <div className="chat-box">
            {/* chat bubbles will be gen here */}
            {chatList?.map((chat, index) => {
              return (
                <div
                  key={index}
                  data-id={chat.id}
                  data-thread={chat?.thread}
                  onClick={() => {
                    if (idType === "thread") {
                      dispatch(setPageThreadId(chat?.thread));
                      dispatch(setConversationId(chat?.id));
                      setTimeout(() => {
                        sendToConvo(chat?.id);
                      }, 1000);
                    }
                  }}
                  className={`chat-bubble ${
                    chat?.sender === "userInput" ? "person1" : "person2"
                  }`}
                >
                  {chat?.sender === "userInput" ? (
                    chat.message
                  ) : chat.message ? (
                    <div dangerouslySetInnerHTML={{ __html: chat?.message }} />
                  ) : (
                    <></>
                  )}
                  {chat?.search_results?.length ? (
                    <>
                      <hr />
                      <div className="conversationDetail-list">
                        <h4 className="fs-6">Source:</h4>
                        <ol>
                          {chat?.search_results?.map(
                            (searchItem: IcaseDetails, index: number) => {
                              if (!searchItem?.is_cited) return;
                              return (
                                <li
                                  key={index}
                                  data-option="two"
                                  data-bs-toggle="modal"
                                  data-bs-target="#firstModal"
                                  onClick={() =>
                                    dispatch(
                                      setModalData(
                                        // chat?.details?.length ?
                                        {
                                          caseTitle: "Case Details",
                                          caseContent: chat.details?.[index],
                                          caseFile:
                                            "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                                        }
                                        // : null
                                      )
                                    )
                                  }
                                >
                                  <span>{searchItem?.result_id}</span>
                                  <div className="d-flex">
                                    <span className="text-dark">
                                      Case Number :
                                    </span>
                                    <span className="fw-bold">
                                      {chat.details?.[index]?.case_number}
                                    </span>
                                  </div>
                                  <span className="text-dark">
                                    {searchItem?.result_type}
                                  </span>
                                </li>
                              );
                            }
                          )}
                        </ol>
                      </div>
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div
            className={`chat-input-wrapper ${isSidebarCollapsed ? "px-5" : ""}`}
          >
            <div className="chat-input-container">
              <div className="form-group w-100 position-relative">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    formSubmit(e);
                  }}
                >
                  <input
                    type="text"
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    placeholder="Type a message..."
                    className="chat-input form-control rounded-5 pe-5"
                  />
                  <button
                    type="submit"
                    className="search-btn icon-btn rounded-5 btn btn-secondary d-flex justify-content-center align-items-center"
                  >
                    🡒
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
