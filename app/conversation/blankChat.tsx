"use client";
import { useEffect, useState } from "react";
import "../styles/components/blankChat.scss";
import { QUERY_SUGGESTIONS, SINGLE_SUGGESTION } from "./constants";
import { useCreateThreadMutation } from "../apiService/services/conversationApi";
import { isFetchBaseQueryError } from "../utils/apiErrorUtils";
import { showErrorToast } from "../hooks/useNotify";
import { APIErrorData } from "../models/commonApiModels";
import { APP_ERROR_MESSAGE } from "../constants/appConstants";

export default function BlankChat() {
  const [userQuery, setUserQuery] = useState("");
  const [createThread, { isLoading, isError, data, error, status }] =
    useCreateThreadMutation();
  console.log(createThread, { isLoading, isError, data, error, status });

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
    <div className="container">
      <div className="blank-chat m-auto">
        <div className="">
          <h1 className="fs-4 text-center">AI-Powered Search Revolution!</h1>
          <div className="form-group position-relative mb-4 col-sm-12 col-md-8 mx-auto">
            <input
              type="text"
              className="form-control rounded-5 pe-5"
              value={userQuery}
              onChange={(e) => {
                setUserQuery(e?.target?.value);
              }}
            />
            <button
              className="search-btn icon-btn rounded-5 btn btn-secondary d-flex justify-content-center align-items-center"
              onClick={() => {
                if (userQuery) {
                  createThread({ query: userQuery });
                } else {
                  alert("kindly add some text to search");
                }
              }}
            >
              🡒
            </button>
          </div>
          <div className="text-start">
            <h4 className="fs-6">Master the search game</h4>
            <button
              className="alert alert-light text-start w-100"
              onClick={() => {
                setUserQuery(SINGLE_SUGGESTION);
              }}
            >
              {SINGLE_SUGGESTION}
            </button>
            <div className="row">
              {QUERY_SUGGESTIONS?.map((suggestion: string, index: number) => {
                return (
                  <div key={index} className="col-sm-12 col-md-6">
                    <button
                      className="alert alert-light text-start w-100"
                      onClick={() => {
                        setUserQuery(suggestion);
                      }}
                    >
                      {suggestion}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
