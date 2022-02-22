import React, { useState, useEffect, useContext } from "react";
import Note from "./Note";
import Masonry from "react-masonry-css";
import { SearchItem, AlertData, NoteEditBox, Clicked } from "../App";

//get saved(Local) Notes
const getSavedNotes = () => {
  const data = localStorage.getItem("noteData");
  let resultData = JSON.parse(data);
  return resultData;
};

const getSavedArchiveNotes = () => {
  const data = localStorage.getItem("archiveData");
  let resultData = JSON.parse(data);
  return resultData ? resultData : false;
};

const getSavedTrashNotes = () => {
  const data = localStorage.getItem("trashData");
  let resultData = JSON.parse(data);
  return resultData;
};

const Archive = ({ noteStyle }) => {
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

  //search data
  const seacrchData = useContext(SearchItem);
  const alertData = useContext(AlertData);
  const noteEditBox = useContext(NoteEditBox);

  const storeData = () => {
    let result1 = localStorage.setItem("noteData", JSON.stringify(noteData));
    let result2 = localStorage.setItem(
      "archiveData",
      JSON.stringify(archiveData)
    );
    let result3 = localStorage.setItem("trashData", JSON.stringify(trashData));
  };

  useEffect(() => {
    storeData();
    setListStyle(noteStyle);
  }, [noteStyle, archiveData, trashData, noteData]);

  useEffect(() => {
    setSelectedNoteId("")
  }, [clicked])

  const breakpoints = {
    default: 4,
    700: 3,
    500: 2,
  };

  function onDelete(id) {
    alertData("Note trashed");
    setTrashData((data) => {
      const newData = archiveData.find((element, index) => index === id);
      return [...data, newData];
    });

    setArchiveData((data) => {
      return data.filter((element, index) => index !== id);
    });
  }

  const unArchiveNote = (id, note) => {
    alertData("Note unarchive");
    setNoteData((data) => {
      return [note, ...data];
    });
    setArchiveData((data) => {
      return data.filter((element, index) => index !== id);
    });
  };

  const editNoteItem = (id, note) => {
    noteEditBox([archiveData, id, "archiveData", setArchiveData]);
  };

  const noteThemeColor = (e, selectId) => {
    e.stopPropagation() 
    setSelectedNoteId(selectId)
  }

  const getColorOfNote = (id, color) => {
    const data = localStorage.getItem("archiveData");
    let resultData = JSON.parse(data);
    resultData[id].color = color
    let result1 = localStorage.setItem("archiveData", JSON.stringify(resultData));
    setArchiveData(resultData)
    return result1
  }

  return (
    <div id="archive_div" className={listStyle ? "list_style" : "grid_style"}>
      <div
        className={
          archiveData.length !== 0 ? "notes_wrapper" : "notes_wrapper empty"
        }
      >
        {archiveData.length !== 0 ? (
          <Masonry
            breakpointCols={breakpoints}
            className={listStyle ? "notes_grid listStyle" : "notes_grid"}
            columnClassName={
              listStyle ? "notes_grid_column listStyle" : "notes_grid_column"
            }
          >
            {archiveData
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
                    highLightText=""
                    element={element}
                    deleteItem={onDelete}
                    highLightText={seacrchData.toLocaleLowerCase()}
                    addUarchiveIcon={true}
                    unArchiveNote={unArchiveNote}
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
              <i className="fas fa-archive"></i>
            </span>
            <p>Your archived notes appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Archive;
