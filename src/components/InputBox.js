import React, { useContext, useEffect, useState } from "react";
import { Clicked, SearchItem } from "../App";

const InputBox = ({ passNote }) => {
  //for open up the input area
  const [inputActive, setInputActive] = useState(false);

  //for useContext
  const clicked = useContext(Clicked);
  const searchData = useContext(SearchItem);

  //to run when clicked is changed
  useEffect(() => {
    addNote()
    setInputActive(false)
  }, [clicked]);

  //to get input data
  const [note, setNote] = useState({
    title: "",
    content: "",
    color:"transparent"
  });

  return (
    <div className={ searchData ? "input_box deActive" : "input_box" }>
      {inputActive ? (
        <div className="input" onClick={displayInput} >
          <input
            type="text"
            placeholder="Title"
            value={note.title}
            name="title"
            onChange={(e) => getInputData(e)}
            autoComplete="off"
          />
          <input
            type="text"
            placeholder="Take a note..."
            value={note.content}
            name="content"
            onChange={(e) => getInputData(e)}
            onKeyPress={e => e.key === "Enter" && closeNAddNote(e)}
            autoFocus
            autoComplete="off"
          />
          <button className="close" onClick={(e) => closeNAddNote(e)}>
            Close
          </button>
        </div>
      ) : (
        <div className="input" onClick={displayInput}>
          <p>Take a note..</p>
        </div>
      )}
    </div>
  );

  function displayInput(e) {
    e.stopPropagation()
    setInputActive(true)
  }

  function closeNAddNote(e) {
    e.stopPropagation()
    addNote()
  }

  function addNote() {

    setInputActive(false)

    if (note.title && note.title.trim() != "" || note.content && note.content.trim() != "") {
      passNote(note);
    }
    setNote({
      title: "",
      content: "",
      color: "transparent"
    });
  }

  function getInputData(element) {
    const { name, value } = element.target;

    setNote((data) => {
      return {
        ...data,
        [name]: value,
      };
    });
  }
};

export default InputBox;
