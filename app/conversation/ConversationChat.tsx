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

import { useBookMarkConversationMutation } from "../apiService/services/bookMarkApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import Loader from "../components/common/Loader";
// import { useRouter } from "next/navigation";
import {
  CaseData,
  setConversationId,
  setModalData,
  setModalDetailId,
  setPageThreadId,
} from "../store/slices/frontendElements";
import CopyIcon from "../assets/icons/CopyIcon";
import BookmarkIcon from "../assets/icons/BookmarkIcon";
import BookmarkedIcon from "../assets/icons/BookmarkedIcon";
import LikeIcon from "../assets/icons/LikeIcon";
import DislikeIcon from "../assets/icons/DislikeIcon";
import { showSuccessToast } from "@/app/hooks/useNotify";
import RightArrow from "../assets/icons/RightArrow";

interface ConversationChatProps {
  id: string;
  idType: "thread" | "conversation";
}

export interface Ichat {
  id: string;
  message: string;
  sender: "userInput" | "aiResponse";
  thread?: string;
  search_results?: IcaseDetails[];
  is_starred?: boolean;
}

export interface IcaseDetails {
  case_number: string;
  case_name: string;
  case_id: string;
  result_id?: string;
  result_type?: string;
  case_content?: string;
  is_cited?: boolean;
  details?: CaseData;
  metadata?: {
    case_name?: string;
  };
}

interface IConvoThreadData {
  id: number;
  user_input: string;
  ai_response: string;
  thread?: string;
  search_results?: IcaseDetails[];
  is_starred?: boolean;
}

interface FetchBaseQueryError {
  data?: {
    non_field_errors?: string[];
    message?: string;
  };
}

export default function ConversationChat({
  id,
  idType,
}: ConversationChatProps) {
  // const route = useRouter();
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

  const [bookMarkConversation, { status: bookmarkStatus }] =
    useBookMarkConversationMutation();

  const bookmarkConvo = (id: string) => {
    bookMarkConversation(id);
  };

  useEffect(() => {
    if (bookmarkStatus === "fulfilled") {
      showSuccessToast("Conversation Bookmarked");
    }
  }, [bookmarkStatus]);

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
        const errorData =
          (error.data as APIErrorData) ||
          (conversationError as APIErrorData) ||
          (convoThreadError as APIErrorData);
        const errorMessage =
          (error as FetchBaseQueryError)?.data?.message ||
          (conversationError as FetchBaseQueryError)?.data?.message ||
          (convoThreadError as FetchBaseQueryError)?.data?.message ||
          "An error occurred";
        showErrorToast(errorMessage);
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
        sender: "aiResponse",
        is_starred: conversationDataView?.is_starred,
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
            search_results: dataItem?.search_results,
            is_starred: dataItem?.is_starred,
          };

          return [userMessage, aiMessage];
        }
      );

      // Flatten the chat list
      setChatList(updatedChatList.flat());
    }
  }, [convoThreadData]);

  // const sendToConvo = (convoId: string) => {
  //   route.push(`/conversation/${convoId}`);
  // };

  const [threadId, setThreadId] = useState<string | undefined>(undefined);
  useEffect(() => {
    setThreadId(chatList?.[0]?.thread);
    setUserQuery("");
  }, [chatList]);

  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userQuery) {
      alert("Kindly add some text to search");
      return;
    }
    createConversation({
      thread: idType === "thread" ? id : threadId,
      user_input: userQuery,
    });
  };

  useEffect(() => {
    if (idType === "conversation" && chatList?.length) {
      dispatch(setPageThreadId(chatList?.[0]?.thread));
      dispatch(setConversationId(chatList?.[0]?.id));
    }
  }, [chatList]);

  return (
    <>
      {(conversationIsLoading || convoThreadIsLoading || isLoading) && (
        <Loader />
      )}

      <div className={`chat-container ${deviceWidth < 768 ? "ps-0" : ""}`}>
        <div className="chat-wrapper pb-5">
          <div className="chat-box">
            {/* chat bubbles will be gen here */}
            {chatList?.map((chat: Ichat, index: number) => {
              return (
                <div
                  key={index}
                  data-id={chat.id}
                  data-thread={chat?.thread}
                  className={`chat-bubble ${
                    chat?.sender === "userInput" ? "person1" : "person2"
                  }`}
                >
                  {chat?.sender !== "userInput" && (
                    <div className="chat-bubble-actions">
                      <button
                        className="btn p-0"
                        onClick={() => {
                          bookmarkConvo(chat?.id);
                        }}
                        title="Bookmark"
                      >
                        {chat?.is_starred ? (
                          <BookmarkedIcon />
                        ) : (
                          <BookmarkIcon />
                        )}
                      </button>
                      <button
                        className="btn p-0"
                        onClick={() => {
                          navigator.clipboard.writeText(chat?.message);
                          showSuccessToast("Data copied to clipboard");
                        }}
                        title="Copy to  Clipboard"
                      >
                        <CopyIcon />
                      </button>
                      <button className="btn p-0 d-none">
                        <LikeIcon />
                      </button>
                      <button className="btn p-0 d-none">
                        <DislikeIcon />
                      </button>
                    </div>
                  )}
                  {chat?.sender === "userInput" ? (
                    chat.message
                  ) : chat.message ? (
                    <div dangerouslySetInnerHTML={{ __html: chat?.message }} />
                  ) : (
                    <></>
                  )}
                  {chat?.search_results?.length &&
                  chat?.search_results?.some(
                    (searchItem) => searchItem.is_cited
                  ) ? (
                    <>
                      <hr />
                      <div className="conversationDetail-list">
                        <h4 className="fs-6">Sources:</h4>
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
                                  onClick={() => {
                                    if (idType === "conversation") {
                                      dispatch(
                                        setModalData(
                                          chat?.search_results ?? null
                                        )
                                      );
                                    } else {
                                      dispatch(setModalDetailId(chat?.id));
                                    }
                                  }}
                                >
                                  <div className="d-flex flex-column">
                                    <span className="text-dark">
                                      Case Name :
                                    </span>
                                    <span className="fw-bold">
                                      {searchItem?.metadata?.case_name}
                                    </span>
                                  </div>
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
            className={`chat-input-wrapper ${isSidebarCollapsed ? "ps-0" : ""}`}
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
                    className="chat-input form-control rounded-5 pe-5 shadow ps-3"
                  />
                  <button
                    type="submit"
                    className="search-btn icon-btn rounded-5 btn btn-secondary d-flex justify-content-center align-items-center bg-dark text-white p-1"
                  >
                    <RightArrow />
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
