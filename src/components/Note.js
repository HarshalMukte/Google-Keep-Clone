import React, { useEffect, useRef, useState } from "react";
//for tooltips
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";


const Note = (props) => {
  const [noteVanishClass, setNoteVanishClass] = useState(false);
  // const [colorTheme, setColorTheme] = useState(false)
  const [displayNoteColor, setDisplayNoteColor] = useState(false)
  const headingData = useRef("");
  const titleData = useRef("");

  //geting all props
  const {
    element,
    id,
    deleteItem,
    unArchiveNote,
    restoreNote,
    highLightText,
    getArchiveItems,
    addArchiveIcon,
    displayRestoreTrashIcon,
    removeBackgroundColorIcon,
    addUarchiveIcon,
    editNoteItem,
    noteThemeColor,
    selectedNoteId,
    getColorOfNote
  } = props;

  //for marking the search iteams
  const markData = () => {
    let replaceData =
      highLightText && highLightText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    let pattern = new RegExp(`${replaceData}`, "gi");
    highLightText
      ? (headingData.current.innerHTML =
          headingData.current.textContent.replace(
            pattern,
            (match) => `<mark>${match}</mark>`
          ))
      : (headingData.current.innerHTML = element.title);

    highLightText
      ? (titleData.current.innerHTML = titleData.current.textContent.replace(
          pattern,
          (match) => `<mark>${match}</mark>`
        ))
      : (titleData.current.innerHTML = element.content);
  };

  useEffect(() => {
    markData();
  }, [highLightText]);

  const noteVanish = (runFunction) => {
    setNoteVanishClass(true);
    setTimeout(() => {
      runFunction(id, element);
      setNoteVanishClass(false);
    }, 300);
  };

  const displayColor = (e, selectId) => {
    noteThemeColor(e, selectId)
    setDisplayNoteColor(pre => !pre)
  }
  const changeNoteColor = (e) => {
    e.stopPropagation() 
    const data_color = e.target.getAttribute("data-color")
    getColorOfNote(id, data_color)
  }

  return (
    <div id="note" className={noteVanishClass ? `vanished ${element.color}` : `visible ${element.color}`}>
      <div className="content" onClick={() => editNoteItem(id, element)}>
        <h3 ref={headingData}>{element.title}</h3>
        <p ref={titleData}>{element.content}</p>
      </div>
      <div className="todo_action">
        {!removeBackgroundColorIcon && (
          <Tippy content="Background options">
            <div className="todo_icons background_color" onClick={(e) => displayColor(e, id)}>
              <i className="fas fa-palette"></i>
            </div>
          </Tippy>
        )}
        {displayRestoreTrashIcon && (
          <Tippy content="Restore">
            <div
              className="todo_icons restore"
              onClick={() => noteVanish(restoreNote)}
            >
              <i className="fas fa-trash-restore"></i>
            </div>
          </Tippy>
        )}
        {addUarchiveIcon && (
          <Tippy content="Unarchive">
            <div
              className="todo_icons unArchive"
              onClick={() => noteVanish(unArchiveNote)}
            >
              <i className="fas fa-archive"></i>
            </div>
          </Tippy>
        )}
        {addArchiveIcon && (
          <Tippy content="Archive">
            <div
              className="todo_icons archive"
              onClick={() => noteVanish(getArchiveItems)}
            >
              <i className="fas fa-archive"></i>
            </div>
          </Tippy>
        )}
        <Tippy
          content={displayRestoreTrashIcon ? "Delete Forever" : "Delete Note"}
        >
          <div
            className="todo_icons delete"
            onClick={() => noteVanish(deleteItem)}
          >
            <i className="fas fa-trash-alt"></i>
          </div>
        </Tippy>
      </div>
      <div className={selectedNoteId && displayNoteColor ? "colorTheme active" : "colorTheme"}>
       <Tippy content="Default"><div className="color none" data-color="default" onClick={(e) => changeNoteColor(e)}><i className="fa-solid fa-droplet-slash"></i></div></Tippy>
        <Tippy content="Red"><div className="color red" data-color="red" onClick={(e) => changeNoteColor(e)} ></div></Tippy>
        <Tippy content="Orange"><div className="color orange" data-color="orange" onClick={(e) => changeNoteColor(e)} ></div></Tippy>
        <Tippy content="Yellow"><div className="color yellow" data-color="yellow" onClick={(e) => changeNoteColor(e)} ></div></Tippy>
        <Tippy content="Green"><div className="color green" data-color="green" onClick={(e) => changeNoteColor(e)} ></div></Tippy>
        <Tippy content="Teal"><div className="color teal" data-color="teal" onClick={(e) => changeNoteColor(e)} ></div></Tippy>
        <Tippy content="Blue"><div className="color blue" data-color="blue" onClick={(e) => changeNoteColor(e)} ></div></Tippy>
        <Tippy content="Darkblue"><div className="color darkblue" data-color="darkblue" onClick={(e) => changeNoteColor(e)} ></div></Tippy>
        <Tippy content="Purple"><div className="color purple" data-color="purple" onClick={(e) => changeNoteColor(e)} ></div></Tippy>
        <Tippy content="Pink"><div className="color pink" data-color="pink" onClick={(e) => changeNoteColor(e)} ></div></Tippy>
        <Tippy content="Brown"><div className="color brown" data-color="brown" onClick={(e) => changeNoteColor(e)} ></div></Tippy>
        <Tippy content="Gray"><div className="color gray" data-color="gray" onClick={(e) => changeNoteColor(e)} ></div></Tippy>
      </div>
    </div>
  );
};

export default Note;
