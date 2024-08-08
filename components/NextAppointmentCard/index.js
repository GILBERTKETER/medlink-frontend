import React from "react";
import "./styles.scss";
import { Button, Heading } from "@carbon/react";
import { Information, TrashCan } from "@carbon/icons-react";

function NextAppCard({docImage, test, name, date}) {
  
  return (
    <div className="appointment">
      <div className="appointment-image">
        <img className="img-app" src={docImage} alt="appointment" />
      </div>
      <div className="test-description">
        <Heading className="test">{test}</Heading>
        <Heading className="name">Dr. {name}</Heading>
        <p>ADV: {date}</p>
      </div>
      <div className="edit-icons">
       
          <TrashCan
            className="edit-icon"
            style={{ color: "red" }}
          />
        <Information className="edit-icon" />
      </div>
    </div>
  );
}

export default NextAppCard;
