import React, { useEffect } from "react";
import "./styles.scss";
import Features from "../../../components/Features";
import Intergrations from "../../../components/intergrations";
import TechTrust from "../../../components/Tech-trust";
import MoreEnquiry from "../../../components/more-inquiry";
import ChatInterface from '../../../components/chat/index'
function Chats() {
  useEffect(() => {
    const hasRefreshed = localStorage.getItem("hasRefreshed");
  
    if (!hasRefreshed) {
      localStorage.setItem("hasRefreshed", "true");
      localStorage.setItem("selectedItem", "chats");
      window.location.reload();
    } else {
      localStorage.setItem("hasRefreshed", "true");
    }
  }, []);
  useEffect(() => {
    window.watsonAssistantChatOptions = {
      integrationID: "c60710e8-ce57-4c1a-a1af-a3248da21f48",
      region: "us-south", 
      serviceInstanceID: "3e1f34c5-2bff-4a50-ace2-6d6a6f7ec59e",
      onLoad: async (instance) => {
        await instance.render();
      },
    };

    setTimeout(() => {
      const t = document.createElement("script");
      t.src =
        "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
        (window.watsonAssistantChatOptions.clientVersion || "latest") +
        "/WatsonAssistantChatEntry.js";
      document.head.appendChild(t);
    }, 0);
  }
  )

  return (
    <div className="chat-cont">
      <div className="chats">
        <div className="chat-int">
          <ChatInterface/>
        </div>
        <div className="text-container">
          <div id="typing-text"></div>
        </div>
      </div>
      <Features />
      <TechTrust />
      <Intergrations />
      <MoreEnquiry/>
    </div>
  );
}

export default Chats;
