"use client";
import { useEffect, useState } from "react";
import "./modalOverwrite.scss";

export default function ModalDilogGroup() {
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
                  setIframeOpen(false);
                }}
              ></button>
            </div>
            <div className="modal-body d-flex p-0">
              <div className="modal-left-element p-3">
                <p>
                  Accessibility tip: Using color to add meaning only provides a
                  visual indication, which will not be conveyed to users of
                  assistive technologies like screen readers. Please ensure the
                  meaning is obvious from the content itself (e.g., the visible
                  text with a sufficient color contrast) or is included through
                  alternative means, such as additional text hidden with the
                  .visually-hidden class. Accessibility tip: Using color to add
                  meaning only provides a visual indication, which will not be
                  conveyed to users of assistive technologies like screen
                  readers. Please ensure the meaning is obvious from the content
                  itself (e.g., the visible text with a sufficient color
                  contrast) or is included through alternative means, such as
                  additional text hidden with the .visually-hidden class.
                  Accessibility tip: Using color to add meaning only provides a
                  visual indication, which will not be conveyed to users of
                  assistive technologies like screen readers. Please ensure the
                  meaning is obvious from the content itself (e.g., the visible
                  text with a sufficient color contrast) or is included through
                  alternative means, such as additional text hidden with the
                  .visually-hidden class.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setIframeOpen(!iframeOpen);
                  }}
                >
                  View Judgement
                </button>
              </div>
              <div className="modal-right-element d-none">
                <iframe src="https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
