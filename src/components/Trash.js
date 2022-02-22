import React, { useState, useEffect, useContext } from "react";
import Note from "./Note";
import Masonry from "react-masonry-css";
import { SearchItem, AlertData } from "../App";

//get saved(Local) Notes
const getSavedNotes = () => {
  const data = localStorage.getItem("noteData");
  let resultData = JSON.parse(data);
  return resultData;
};

const getSavedTrashNotes = () => {
  const data = localStorage.getItem("trashData");
  let resultData = JSON.parse(data);
  return resultData;
};

const Trash = ({ noteStyle }) => {
  const [noteData, setNoteData] = useState(
    getSavedNotes() ? getSavedNotes() : []
  );
  const [trashData, setTrashData] = useState(
    getSavedTrashNotes() ? getSavedTrashNotes() : []
  );
  const [listStyle, setListStyle] = useState(false);

  //search data
  const seacrchData = useContext(SearchItem);
  const alertData = useContext(AlertData);

  useEffect(() => {
    storeData();
    setListStyle(noteStyle);
  }, [noteStyle, trashData, noteData]);

  const breakpoints = {
    default: 4,
    700: 3,
    500: 2,
  };

  const storeData = () => {
    let result1 = localStorage.setItem("noteData", JSON.stringify(noteData));
    let result2 = localStorage.setItem("trashData", JSON.stringify(trashData));
  };

  const onDelete = (id) => {
    alertData("Note Deleted permenently");
    setTrashData((data) => {
      return data.filter((element, index) => index !== id);
    });
  };

  const emptyTrashFuction = () => {
    alertData("Note Deleted permenently");
    setTrashData([]);
    storeData();
  };

  const restoreNote = (id, note) => {
    alertData("Note restore");
    setNoteData((data) => {
      return [note, ...data];
    });
    setTrashData((data) => {
      return data.filter((element, index) => index !== id);
    });
  };

  const editNoteItem = (id, note) => {
    alertData("Can’t edit in Trash");
  };

  return (
    <div id="trash_div" className={listStyle ? "list_style" : "grid_style"}>
      <div className="trashContent">
        <p>Notes in Trash are deleted after 7 days.</p>
        <button
          className={
            trashData.length !== 0 ? "emptyTrash active" : "emptyTrash"
          }
          onClick={() => emptyTrashFuction()}
        >
          Empty Trash
        </button>
      </div>
      <div
        className={
          trashData.length !== 0 ? "notes_wrapper" : "notes_wrapper empty"
        }
      >
        {trashData.length !== 0 ? (
          <Masonry
            breakpointCols={breakpoints}
            className={listStyle ? "notes_grid listStyle" : "notes_grid"}
            columnClassName={
              listStyle ? "notes_grid_column listStyle" : "notes_grid_column"
            }
          >
            {trashData
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
                    restoreNote={restoreNote}
                    highLightText={seacrchData.toLocaleLowerCase()}
                    displayRestoreTrashIcon={true}
                    removeBackgroundColorIcon={true}
                    editNoteItem={editNoteItem}
                  />
                );
              })}
          </Masonry>
        ) : (
          <div className="noData">
            <span>
              <i className="fas fa-trash-alt"></i>
            </span>
            <p>No notes in Trash</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trash;
