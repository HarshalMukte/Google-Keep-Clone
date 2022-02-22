import React, {
  createContext,
  useState,
  useRef,
  useEffect
} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//All Components
import Header from "./components/Header";
import Menu from "./components/Menu";
import Notes from "./components/Notes";
import Reminders from "./components/Reminders";
import EditLabels from "./components/EditLabels";
import Archive from "./components/Archive";
import Trash from "./components/Trash";
import "./style/App.css";

const Clicked = createContext();
const SearchItem = createContext();
const AlertData = createContext();
const NoteEditBox = createContext();
const MenuToggle = createContext();

//geting darkMode from local storage
const DarkmodeFunction = () => {
  const data = window.localStorage.getItem("darkMode");
  let resultData = JSON.parse(data);
  return resultData;
};

//geting listStyle from local storage
const listStyleFunction = () => {
  const data = window.localStorage.getItem("listStyle");
  let resultData = JSON.parse(data);
  return resultData;
};

const App = () => {
  const [bodyClicked, setBodyClicked] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
  const [listStyle, setListStyle] = useState(
    listStyleFunction ? listStyleFunction : false
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [navBarActive, setNavBarActive] = useState(false);
  const [editNoteItemData, setEditNoteItemData] = useState([]);
  const [alertText, setAlertText] = useState("");
  const [alertClassName, setAlertClassName] = useState("alertText");
  const [darkMode, setDarkMode] = useState(
    DarkmodeFunction() ? DarkmodeFunction() : false
  );
  const mainContainer = useRef();

  useEffect(() => {
    mainContainer.current.addEventListener("scroll", scrollFunction);
  }, []);

  useEffect(() => {
    alertText
      ? setAlertClassName("alertText active")
      : setAlertClassName("alertText");

    const timer = setTimeout(() => {
      setAlertClassName("alertText");
      setAlertText("");
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [alertText]);

  useEffect(() => {
    //set dark  mode to local storage
    let store = window.localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  //for scroll event
  const scrollFunction = () => {
    const ScrollTop = mainContainer.current
      ? mainContainer.current.scrollTop
      : 0;

    ScrollTop > 10 ? setNavBarActive(true) : setNavBarActive(false);
  };

  ///get search data
  const changeSearchItem = (searchData) => {
    setSearchTerm(searchData);
  };

  const changeNoteStyle = () => {
    setListStyle((pre) => !pre);
  };

  const noteChangeData = (e) => {
    const data = localStorage.getItem(editNoteItemData[2]);
    const resultData = JSON.parse(data);
    const data_name = e.target.getAttribute("data-name");
    resultData[editNoteItemData[1]][data_name] = e.target.innerText;
    //storing back updated data
    localStorage.setItem(editNoteItemData[2], JSON.stringify(resultData));
    //to set the noteData live
    editNoteItemData[3](() => resultData);
  };

  const disAbleNoteItem = (e) => {
    e.stopPropagation();
    setEditNoteItemData([]);
  };

  return (
    <Router>
      <Clicked.Provider value={bodyClicked}>
        <SearchItem.Provider value={searchTerm}>
          <AlertData.Provider value={setAlertText}>
            <NoteEditBox.Provider value={setEditNoteItemData}>
              <MenuToggle.Provider value={setMenuToggle}>
                <main
                  onClick={() => setBodyClicked((pre) => !pre)}
                  className={darkMode ? "dark" : "light"}
                >
                  <Header
                    noteStyle={changeNoteStyle}
                    SearchValue={changeSearchItem}
                    navBarActive={navBarActive}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                  />
                  <div className="main_container">
                    <Menu
                      menuToggle={menuToggle}
                      setMenuToggle={setMenuToggle}
                    />
                    <div className="content_container" ref={mainContainer}>
                      <Routes>
                        <Route
                          path="/"
                          element={<Notes noteStyle={listStyle}/>}
                        />
                        <Route path="/reminders" element={<Reminders />} />
                        <Route path="/labels" element={<EditLabels />} />
                        <Route
                          path="/archive"
                          element={<Archive noteStyle={listStyle} />}
                        />
                        <Route
                          path="/trash"
                          element={<Trash noteStyle={listStyle} />}
                        />
                      </Routes>
                    </div>
                  </div>
                </main>
                <div
                  className={`${alertClassName} ${darkMode ? "dark" : "light"}`}
                >
                  {alertText}
                  <span onClick={() => setAlertText("")}>
                    <i className="fas fa-times"></i>
                  </span>
                </div>
                <div
                  className={
                    editNoteItemData.length > 0 && darkMode
                      ? "noteEditContainer active dark"
                      : editNoteItemData.length > 0
                      ? "noteEditContainer active "
                      : "noteEditContainer"
                  }
                >
                  <div
                    className="noteBackground"
                    onClick={(e) => disAbleNoteItem(e)}
                  ></div>
                  <div
                    className={`noteEditBox ${editNoteItemData.length > 0 && editNoteItemData[0][editNoteItemData[1]].color}`}
                  >
                    <div className="content">
                      <div className="content_title">
                        <h3
                          contentEditable={true}
                          suppressContentEditableWarning={true}
                          placeholder="Title"
                          data-name="title"
                          onInput={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            noteChangeData(e);
                          }}
                        >
                          {editNoteItemData.length > 0 &&
                          editNoteItemData[0][editNoteItemData[1]].title
                            ? editNoteItemData[0][editNoteItemData[1]].title
                            : false}
                        </h3>
                      </div>
                      <div className="content_desc">
                        <p
                          contentEditable={true}
                          placeholder="Note"
                          suppressContentEditableWarning={true}
                          data-name="content"
                          onInput={(e) => noteChangeData(e)}
                        >
                          {editNoteItemData.length > 0 &&
                          editNoteItemData[0][editNoteItemData[1]].content
                            ? editNoteItemData[0][editNoteItemData[1]].content
                            : false}
                        </p>
                      </div>
                    </div>
                    <div className="button">
                      <button
                        className="closeBtn"
                        onClick={(e) => disAbleNoteItem(e)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </MenuToggle.Provider>
            </NoteEditBox.Provider>
          </AlertData.Provider>
        </SearchItem.Provider>
      </Clicked.Provider>
    </Router>
  );
};

export default App;
export { Clicked, SearchItem, AlertData, NoteEditBox, MenuToggle };
