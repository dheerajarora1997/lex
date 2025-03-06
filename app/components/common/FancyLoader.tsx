import { Ichat } from "@/app/conversation/ConversationChat";
import { useEffect, useState } from "react";

export default function FancyLoader({ title = "loading" }) {
  const deviceWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  const [chatList, setChatList] = useState<Ichat[]>([]);
  useEffect(() => {
    const userMessage: Ichat = {
      id: `${new Date().getTime()}`,
      message: title,
      sender: "userInput",
    };
    setChatList([userMessage]);
  }, [title]);
  return (
    <div className={`chat-container ${deviceWidth < 768 ? "ps-0" : ""}`}>
      <div className="chat-wrapper pb-5">
        <div className="chat-box pb-0">
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
                {chat.message}
              </div>
            );
          })}
        </div>
        <div className="px-3">
          <img
            src="https://storage.googleapis.com/lex_assets/loader.gif"
            alt=""
            style={{ width: 70 }}
          />
        </div>
      </div>
    </div>
  );
}
