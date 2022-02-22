import React from "react";
import { Link } from "react-router-dom";

const Reminders = () => {
  return (
    <div id="reminder">
      <Link to={"/"} className="linkToHome">
        <div className="input_box">
          <div className="input">
            <p>Take a note..</p>
          </div>
        </div>
      </Link>
      <div className="icon">
        <i className="far fa-bell"></i>
      </div>
      <div className="content">
        <p>Notes with upcoming reminders appear here</p>
      </div>
    </div>
  );
};

export default Reminders;
