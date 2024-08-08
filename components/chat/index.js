import React from "react";
import "./styles.scss";
import { Button, Heading, NumberInput, Tag, TextInput } from "@carbon/react";
import {
  Add,
  AddAlt,
  Email,
  Microphone,
  SendAltFilled,
  SendFilled,
} from "@carbon/icons-react";
function Chats() {
  return (
    <div className="my-chat">
      <section className="chat-nav">
        <Button className="chat-btns" kind="primary" size="sm" renderIcon={Add}>
          Start New Chat
        </Button>
        <Button className="chat-btns" kind="secondary" size="sm">
          Current Chat
        </Button>
        <Button className="chat-btns" kind="tertiary" size="sm">
          Saved Messages
        </Button>
      </section>
      <section className="chat-interface">
        <Heading
          className="chat-heading"
          style={{ fontSize: "20px", fontWeight: "bold" }}
        >
          Hello Ano, Lets discuss your Health
        </Heading>
        <div className="chattings">
          <div className="my-tags">
            {[
              "My medical History",
              "Health care tips and recommendations",
              "Make an Appointment",
            ].map((tag) => (
              <Tag key={tag} className="" type="outline">
                {tag}
              </Tag>
            ))}
          </div>
          <div className="chat-input">
            <TextInput id="text-input-1" type="text" renderIcon={Microphone}
            placeholder="Type your message here..." 
            slug={Microphone} />
            <div className="send-btn">
              <SendAltFilled size={32} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Chats;
