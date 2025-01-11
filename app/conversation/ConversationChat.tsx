"use client";

import "../styles/components/ConversationChat.scss";

export default function ConversationChat() {
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
                //   value={newMessage}
                //   onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="chat-input form-control rounded-5"
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
