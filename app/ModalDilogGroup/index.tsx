"use client";
import { useEffect, useState } from "react";
import "./modalOverwrite.scss";
import { useAppSelector } from "../store/store";
import { setModalData } from "../store/slices/frontendElements";
import { useDispatch } from "react-redux";

export interface JsonData {
  [key: string]: string | number | null | JsonData | string[] | JsonData[];
}

export default function ModalDilogGroup() {
  const dispatch = useDispatch();
  const modalData = useAppSelector(
    (state) => state?.frontendElements?.modalData
  );
  const [iframeOpen, setIframeOpen] = useState(false);
  const slideRightElement = () => {
    const modalRightElement = document.querySelector(".modal-right-element");
    const modalDialog = document.querySelector(
      ".modal.custom-slide-modal .modal-dialog"
    );
    modalRightElement?.classList.toggle("d-none");
    if (modalDialog instanceof HTMLElement) {
      modalDialog.style.width = "1050px";
      modalDialog.style.maxWidth = "80%";
    }
  };
  useEffect(() => {
    if (iframeOpen) {
      slideRightElement();
    } else {
      const modalRightElement = document.querySelector(".modal-right-element");
      const modalDialog = document.querySelector(
        ".modal.custom-slide-modal .modal-dialog"
      );
      modalRightElement?.classList.add("d-none");
      if (modalDialog instanceof HTMLElement) {
        modalDialog.style.width = "";
        modalDialog.style.maxWidth = "";
      }
    }
  }, [iframeOpen]);

  function addSpacesToCamelCase(str: string) {
    return str.replace(/([A-Z])/g, " $1").trim();
  }

  const renderData = (
    key: string,
    value: string | number | JsonData | string[] | JsonData[] | null,
    parentkey?: string
  ) => {
    if (typeof value === "object" && value !== null) {
      if (Array.isArray(value)) {
        if (parentkey !== "judgment_analysis") return null;
        return (
          <p key={key}>
            <strong className="text-capitalize">
              {addSpacesToCamelCase(key).replaceAll("_", " ")}:{" "}
            </strong>
            {value.join(", ")}
          </p>
        );
      } else {
        if (key !== "judgment_analysis") return null;
        const parentkey = key;
        return (
          <div key={key}>
            <strong className="text-capitalize mb-2 d-inline-block fs-5">
              {addSpacesToCamelCase(key).replaceAll("_", " ")}:{" "}
            </strong>
            <div>
              {Object.entries(value).map(([subKey, subValue]) =>
                renderData(subKey, subValue, parentkey)
              )}
            </div>
          </div>
        );
      }
    }
    if (key !== "judgment_analysis") return null;
    return (
      <p key={key}>
        <strong className="text-capitalize">
          {addSpacesToCamelCase(key).replaceAll("_", " ")}:{" "}
        </strong>
        {value}
      </p>
    );
  };

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
              <h5 className="modal-title">
                {modalData?.caseTitle || "Source"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setIframeOpen(false);
                  dispatch(setModalData(null));
                }}
              ></button>
            </div>
            <div className="modal-body d-flex p-0">
              <div className="modal-left-element p-3">
                {Object.entries(modalData?.caseContent || {}).map(
                  ([key, value]) => renderData(key, value)
                )}
                {modalData?.caseFile && (
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setIframeOpen(!iframeOpen);
                    }}
                  >
                    View Judgement
                  </button>
                )}
              </div>
              <div className="modal-right-element d-none">
                <iframe
                  src={`${
                    modalData?.caseFile
                      ? modalData?.caseFile
                      : "https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf"
                  }`}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
