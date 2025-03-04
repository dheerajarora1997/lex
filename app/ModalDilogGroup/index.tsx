"use client";
import { useEffect, useState } from "react";
import "./modalOverwrite.scss";
import { useAppSelector } from "../store/store";
import {
  setModalData,
  setModalDetailId,
} from "../store/slices/frontendElements";
import { useDispatch } from "react-redux";
import {
  useGetJudmentFileQuery,
  useViewConversationQuery,
} from "../apiService/services/conversationApi";
import { showInfoToast } from "../hooks/useNotify";

export interface JsonData {
  [key: string]: string | number | null | JsonData | string[] | JsonData[];
}

export default function ModalDilogGroup() {
  const dispatch = useDispatch();
  const modalData = useAppSelector(
    (state) => state?.frontendElements?.modalData
  );
  const modalDetailId = useAppSelector(
    (state) => state?.frontendElements?.modalDetailId
  );

  const [fileId, setFileId] = useState<string | undefined>(undefined);
  const [pdfLink, setPdfLink] = useState<string>("");

  const EnableRightElement = () => {
    const modalRightElement = document.querySelector(".modal-right-element");
    const modalDialog = document.querySelector(
      ".modal.custom-slide-modal .modal-dialog"
    );
    modalRightElement?.classList?.remove("d-none");
    modalDialog?.classList?.add("modal-fullscreen");
  };
  const DisableRightElement = () => {
    const modalRightElement = document.querySelector(".modal-right-element");
    const modalDialog = document.querySelector(
      ".modal.custom-slide-modal .modal-dialog"
    );
    modalRightElement?.classList?.add("d-none");
    modalDialog?.classList?.remove("modal-fullscreen");
  };
  const resetAllData = () => {
    DisableRightElement();
    setFileId(undefined);
    setPdfLink("");
    dispatch(setModalData(null));
    dispatch(setModalDetailId(null));
  };

  const { data: conversationDataView, refetch: viewConversation } =
    useViewConversationQuery(
      { id: modalDetailId ? modalDetailId?.toString() : "" },
      { skip: !modalDetailId }
    );

  useEffect(() => {
    if (modalDetailId) {
      viewConversation();
    }
  }, [modalDetailId]);

  useEffect(() => {
    if (conversationDataView && modalDetailId) {
      dispatch(setModalData(conversationDataView?.search_results));
    }
  }, [conversationDataView, modalDetailId]);

  const {
    data,
    refetch: getJudmentFile,
    status,
    error,
  } = useGetJudmentFileQuery({ id: fileId ? fileId : "" }, { skip: !fileId });
  useEffect(() => {
    if (fileId) {
      getJudmentFile();
    }
  }, [fileId]);

  useEffect(() => {
    if (data) {
      setPdfLink(data?.presigned_url);
    }
  }, [data]);
  useEffect(() => {
    if (status == "rejected") {
      showInfoToast("This feature is only available for premium users.");
      setTimeout(() => {
        // setFileId(undefined);
        // setPdfLink("");
        // DisableRightElement();
      }, 1500);
      return;
    }
  }, [error]);

  return (
    <>
      <div
        className="modal custom-slide-modal"
        tabIndex={-1}
        id="firstModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Sources</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  resetAllData();
                }}
              ></button>
            </div>
            <div className="modal-body d-flex p-0">
              <div className="modal-left-element p-3">
                <div className="accordion" id="caseAccordion">
                  {modalData
                    ?.filter((result_detail) => result_detail?.is_cited)
                    ?.map((result_detail, index) => {
                      const caseData = result_detail.details;
                      return (
                        <div className="accordion-item" key={caseData?.case_id}>
                          <h2
                            className="accordion-header"
                            id={`heading${index}`}
                          >
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapse${index}`}
                              aria-expanded={false}
                              aria-controls={`collapse${index}`}
                            >
                              <strong>
                                {caseData?.judgment_analysis.caseTitle} {" - "}
                                {caseData?.case_number} <br />
                              </strong>
                              <div className="row my-1">
                                <div
                                  className="col-12 col-sm-6"
                                  style={{ fontSize: 12 }}
                                >
                                  {caseData?.judgment_analysis.courtName}
                                </div>
                                <div
                                  className="col-12 col-sm-6 text-end"
                                  style={{ fontSize: 12 }}
                                >
                                  {caseData?.judgment_analysis.dateOfJudgment}
                                </div>
                              </div>
                              <span
                                className="text-dark"
                                style={{ fontSize: 11 }}
                              >
                                {caseData?.judgment_analysis.outcome}
                              </span>
                            </button>
                          </h2>
                          <div
                            id={`collapse${index}`}
                            className={`accordion-collapse collapse`}
                            aria-labelledby={`heading${index}`}
                            data-bs-parent="#caseAccordion"
                          >
                            <div className="accordion-body">
                              {/* <p>
                                <strong>Date of Judgment:</strong>{" "}
                                {caseData?.judgment_analysis.dateOfJudgment}
                              </p>
                              <p>
                                <strong>Court:</strong>{" "}
                                {caseData?.judgment_analysis.courtName}
                              </p> */}
                              <p>
                                <strong>Outcome:</strong>{" "}
                                {caseData?.judgment_analysis.outcome}
                              </p>
                              <p>
                                <strong>Main Principle:</strong>{" "}
                                {caseData?.judgment_analysis.mainPrinciple}
                              </p>
                              <p>
                                <strong>Key Facts:</strong>
                              </p>
                              <ul>
                                {caseData?.judgment_analysis.keyFacts.map(
                                  (fact, i) => (
                                    <li key={i}>{fact}</li>
                                  )
                                )}
                              </ul>
                              <p>
                                <strong>Background:</strong>{" "}
                                {caseData?.judgment_analysis.factsBackground}
                              </p>
                              <p>
                                <strong>Court Reasoning:</strong>
                              </p>
                              <ul>
                                {caseData?.judgment_analysis?.courtReasoning?.map(
                                  (reason, i) => (
                                    <li key={i}>{reason}</li>
                                  )
                                )}
                              </ul>
                              <p>
                                <strong>Petitioner Basis:</strong>
                              </p>
                              <ul>
                                {caseData?.judgment_analysis?.petitionerBasis?.map(
                                  (reason, i) => (
                                    <li key={i}>{reason}</li>
                                  )
                                )}
                              </ul>
                              <p>
                                <strong>Petitioner Points:</strong>
                              </p>
                              <ul>
                                {caseData?.judgment_analysis?.petitionerPoints?.map(
                                  (reason, i) => (
                                    <li key={i}>{reason}</li>
                                  )
                                )}
                              </ul>
                              <p>
                                <strong>Respondent Basis:</strong>
                              </p>
                              <ul>
                                {caseData?.judgment_analysis?.respondentBasis?.map(
                                  (reason, i) => (
                                    <li key={i}>{reason}</li>
                                  )
                                )}
                              </ul>
                              <p>
                                <strong>Respondent Points:</strong>
                              </p>
                              <ul>
                                {caseData?.judgment_analysis?.respondentPoints?.map(
                                  (reason, i) => (
                                    <li key={i}>{reason}</li>
                                  )
                                )}
                              </ul>
                              {!pdfLink && (
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={() => {
                                    setFileId(caseData?.case_number);
                                    EnableRightElement();
                                  }}
                                >
                                  View Judgement
                                </button>
                              )}
                              {pdfLink && (
                                <button
                                  type="button"
                                  className="btn btn-outline-warning"
                                  onClick={() => {
                                    setFileId(undefined);
                                    setPdfLink("");
                                    DisableRightElement();
                                  }}
                                >
                                  Close Judgement File
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
                {modalData?.some((searchItem) => !searchItem.is_cited) && (
                  <h3 className="fs-6 mt-4 mb-3">Other Related Sources</h3>
                )}
                <div className="accordion" id="caseAccordion1">
                  {modalData
                    ?.filter((result_detail) => !result_detail?.is_cited)
                    ?.map((result_detail, otherIndex) => {
                      const caseData = result_detail.details;
                      return (
                        <div className="accordion-item" key={caseData?.case_id}>
                          <h2
                            className="accordion-header"
                            id={`other-heading${otherIndex}`}
                          >
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#other-collapse${otherIndex}`}
                              aria-expanded={false}
                              aria-controls={`other-collapse${otherIndex}`}
                            >
                              <strong>
                                {caseData?.judgment_analysis.caseTitle} {"-"} (
                                {caseData?.case_number}) <br />
                              </strong>
                              <div className="row my-1">
                                <div
                                  className="col-12 col-sm-6"
                                  style={{ fontSize: 12 }}
                                >
                                  {caseData?.judgment_analysis.courtName}
                                </div>
                                <div
                                  className="col-12 col-sm-6  text-end"
                                  style={{ fontSize: 12 }}
                                >
                                  {caseData?.judgment_analysis.dateOfJudgment}
                                </div>
                              </div>
                              <span
                                className="text-dark"
                                style={{ fontSize: 11 }}
                              >
                                {caseData?.judgment_analysis.outcome}
                              </span>
                            </button>
                          </h2>
                          <div
                            id={`other-collapse${otherIndex}`}
                            className={`accordion-collapse collapse`}
                            aria-labelledby={`other-heading${otherIndex}`}
                            data-bs-parent="#caseAccordion1"
                          >
                            <div className="accordion-body">
                              {/* <p>
                                <strong>Date of Judgment:</strong>{" "}
                                {caseData?.judgment_analysis.dateOfJudgment}
                              </p>
                              <p>
                                <strong>Court:</strong>{" "}
                                {caseData?.judgment_analysis.courtName}
                              </p> */}
                              <p>
                                <strong>Outcome:</strong>{" "}
                                {caseData?.judgment_analysis.outcome}
                              </p>
                              <p>
                                <strong>Main Principle:</strong>{" "}
                                {caseData?.judgment_analysis.mainPrinciple}
                              </p>
                              <p>
                                <strong>Key Facts:</strong>
                              </p>
                              <ul>
                                {caseData?.judgment_analysis.keyFacts.map(
                                  (fact, i) => (
                                    <li key={i}>{fact}</li>
                                  )
                                )}
                              </ul>
                              <p>
                                <strong>Background:</strong>{" "}
                                {caseData?.judgment_analysis.factsBackground}
                              </p>
                              <p>
                                <strong>Court Reasoning:</strong>
                              </p>
                              <ul>
                                {caseData?.judgment_analysis?.courtReasoning?.map(
                                  (reason, i) => (
                                    <li key={i}>{reason}</li>
                                  )
                                )}
                              </ul>
                              <p>
                                <strong>Petitioner Basis:</strong>
                              </p>
                              <ul>
                                {caseData?.judgment_analysis?.petitionerBasis?.map(
                                  (reason, i) => (
                                    <li key={i}>{reason}</li>
                                  )
                                )}
                              </ul>
                              <p>
                                <strong>Petitioner Points:</strong>
                              </p>
                              <ul>
                                {caseData?.judgment_analysis?.petitionerPoints?.map(
                                  (reason, i) => (
                                    <li key={i}>{reason}</li>
                                  )
                                )}
                              </ul>
                              <p>
                                <strong>Respondent Basis:</strong>
                              </p>
                              <ul>
                                {caseData?.judgment_analysis?.respondentBasis?.map(
                                  (reason, i) => (
                                    <li key={i}>{reason}</li>
                                  )
                                )}
                              </ul>
                              <p>
                                <strong>Respondent Points:</strong>
                              </p>
                              <ul>
                                {caseData?.judgment_analysis?.respondentPoints?.map(
                                  (reason, i) => (
                                    <li key={i}>{reason}</li>
                                  )
                                )}
                              </ul>
                              {!pdfLink && (
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={() => {
                                    setFileId(caseData?.case_number);
                                    EnableRightElement();
                                  }}
                                >
                                  View Judgement
                                </button>
                              )}
                              {pdfLink && (
                                <button
                                  type="button"
                                  className="btn btn-outline-warning"
                                  onClick={() => {
                                    setFileId(undefined);
                                    setPdfLink("");
                                    DisableRightElement();
                                  }}
                                >
                                  Close Judgement File
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="modal-right-element d-none">
                {pdfLink && (
                  <>
                    <button
                      className="bg-white text-dark rounded-5 d-inline-block d-md-none"
                      onClick={() => {
                        DisableRightElement();
                        setFileId(undefined);
                        setPdfLink("");
                      }}
                    >
                      Close
                    </button>
                    <iframe src={`${pdfLink}`}></iframe>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
