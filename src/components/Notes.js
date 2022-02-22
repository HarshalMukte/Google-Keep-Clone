import React, { useEffect, useState, useContext } from "react";
import InputBox from "./InputBox";
import Note from "./Note";
import { SearchItem, AlertData, NoteEditBox, Clicked } from "../App";
import Masonry from "react-masonry-css";

//get saved(Local) Notes
const getSavedNotes = () => {
  const data = localStorage.getItem("noteData");
  let resultData = JSON.parse(data);
  return resultData;
};

const getSavedArchiveNotes = () => {
  const data = localStorage.getItem("archiveData");
  let resultData = JSON.parse(data);
  return resultData;
};
const getSavedTrashNotes = () => {
  const data = localStorage.getItem("trashData");
  let resultData = JSON.parse(data);
  return resultData;
};

const Notes = ({ noteStyle }) => {

  const [noteData, setNoteData] = useState(
    getSavedNotes() ? getSavedNotes() : []
  );
  const [archiveData, setArchiveData] = useState(
    getSavedArchiveNotes() ? getSavedArchiveNotes() : []
  );
  const [trashData, setTrashData] = useState(
    getSavedTrashNotes() ? getSavedTrashNotes() : []
  );

  const clicked = useContext(Clicked);

  //for theme color
  const [selectedNoteId, setSelectedNoteId] = useState('')

  const [listStyle, setListStyle] = useState(false);

  //geting serach data
  const seacrchData = useContext(SearchItem);
  const alertData = useContext(AlertData);
  const noteEditBox = useContext(NoteEditBox);

  const storeData = () => {
    let result1 = localStorage.setItem("noteData", JSON.stringify(noteData));
    let result2 = localStorage.setItem("archiveData",JSON.stringify(archiveData));
    let result3 = localStorage.setItem("trashData", JSON.stringify(trashData));
  };

  useEffect(() => {
    storeData();
    setListStyle(noteStyle);
  }, [noteStyle, noteData, archiveData, trashData]);

  useEffect(() => {
    setSelectedNoteId("")
  }, [clicked])

  const breakpoints = {
    default: 4,
    800: 3,
    700: 2,
  };

  const ArchiveItems = (id) => {
    alertData("Note archived");
    setArchiveData((data) => {
      const newData = noteData.find((element, index) => index === id);
      return [newData, ...data];
    });

    setNoteData((data) => {
      return data.filter((element, index) => index != id);
    });
  };

  const editNoteItem = (id, note) => {
    noteEditBox([noteData, id, "noteData", setNoteData]);
  };

  const noteThemeColor = (e, selectId) => {
    e.stopPropagation() 
    setSelectedNoteId(selectId)
  }

  const getColorOfNote = (id, color) => {
    const data = localStorage.getItem("noteData");
    let resultData = JSON.parse(data);
    resultData[id].color = color
    let result1 = localStorage.setItem("noteData", JSON.stringify(resultData));
    setNoteData(resultData)
    return result1
  }
 
  return (
    <div id={"Notes_div"} className={listStyle ? "list_style" : "grid_style"}>
      <InputBox passNote={addNote} />
      <div
        className={
          noteData.length !== 0 ? "notes_wrapper" : "notes_wrapper empty"
        }
      >
        {noteData.length !== 0 ? (
          <Masonry
            //for masonry
            breakpointCols={breakpoints}
            className={listStyle ? "notes_grid listStyle" : "notes_grid"}
            columnClassName={
              listStyle ? "notes_grid_column listStyle" : "notes_grid_column"
            }
          >
            {noteData
              .filter((val) => {
                const valData = Object.values(val)
                  .join(" ")
                  .toLocaleLowerCase()
                  .includes(seacrchData.toLocaleLowerCase());
                return valData;
              })
              .map((element, index) => {
                return (
                  <Note
                    key={index}
                    id={index}
                    element={element}
                    deleteItem={onDelete}
                    highLightText={seacrchData.toLocaleLowerCase()}
                    getArchiveItems={ArchiveItems}
                    addArchiveIcon={true}
                    editNoteItem={editNoteItem}
                    noteThemeColor={noteThemeColor}
                    selectedNoteId={index === selectedNoteId ? true : false}
                    getColorOfNote={getColorOfNote}
                  />
                );
              })}
          </Masonry>
        ) : (
          <div className="noData">
            <span>
              <i className="far fa-lightbulb"></i>
            </span>
            <p>Notes you add appear here</p>
          </div>
        )}
      </div>
    </div>
  );

  function addNote(note) {
    setNoteData((data) => {
      return [note, ...data];
    });
  }

  function onDelete(id) {
    alertData("Note trashed");
    setTrashData((data) => {
      const newData = noteData.find((element, index) => index === id);
      return [newData, ...data];
    });
    setNoteData((data) => {
      return data.filter((element, index) => index != id);
    });
  }
};

export default Notes;
