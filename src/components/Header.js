import React, { useContext, useState, useEffect } from "react";
import Logo from "../images/logo.png";
import { Clicked, MenuToggle } from "../App";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

//geting listStyle from local storage
const listStyleFunction = () => {
  const data = window.localStorage.getItem("listStyle");
  let resultData = JSON.parse(data);
  return resultData;
};

const Header = ({
  noteStyle,
  SearchValue,
  navBarActive,
  darkMode,
  setDarkMode,
}) => {
  const [searchActive, setSearchActive] = useState(false);
  const [listStyle, setListStyle] = useState(listStyleFunction ? listStyleFunction : false);
  const [searchTerm, setSearchTerm] = useState("");

  const clicked = useContext(Clicked);
  const menuToggle = useContext(MenuToggle);

  useEffect(() => {
    setSearchActive(false);
  }, [clicked]);

  useEffect(() => {
    SearchValue(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
     //set dark  mode to local storage
     let store = window.localStorage.setItem("listStyle", listStyle);
  }, [listStyle])
  

  const menuToggleFunction = () => {
    menuToggle((pre) => !pre);
  };

  const refreshFunction = () => {
    window.location.reload();
  };

  const toggleTheme = () => {
    setDarkMode((pre) => !pre);
  };

  return (
    <div id="header" className={navBarActive ? "scrolled" : ""}>
      <div className="menu_data">
        <Tippy content="Main menu">
          <div className="menu" onClick={() => menuToggleFunction()}>
            <i className="fas fa-bars"></i>
          </div>
        </Tippy>
        <Link to={"/"} className="logoLink">
          <div className="logo">
            <img src={Logo} alt="logo" /> Keep
          </div>
        </Link>
      </div>
      <div
        className={!searchActive ? "input" : "input active"}
        onClick={(e) => {
          e.stopPropagation();
          return setSearchActive(true);
        }}
      >
        <div className="search">
          <i className="fas fa-search"></i>
        </div>
        <div className="toHomePage">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(element) =>
              setSearchTerm(element.target.value.trimStart())
            }
          />
        </div>
        <div
          className={searchTerm ? "cross active" : "cross"}
          onClick={() => {
            setSearchTerm("");
          }}
        >
          <i className="fas fa-times"></i>
        </div>
      </div>
      <div className="action_data">
        <Tippy content="Refresh">
          <div className="refresh" onClick={() => refreshFunction()}>
            <i className="fas fa-redo"></i>
          </div>
        </Tippy>
        <Tippy content={listStyle ? "Grid view" : "List view"}>
          <div className="viewList" onClick={() => changeNoteStyle()}>
            <i className={listStyle ? "fas fa-border-all" : "fas fa-list"}></i>
          </div>
        </Tippy>
        <Tippy content="Change theme">
          <div className="theme" onClick={() => toggleTheme()}>
            {darkMode ? (
              <i className="fa-solid fa-sun"></i>
            ) : (
              <i className="fas fa-moon"></i>
            )}
          </div>
        </Tippy>
        <div className="profile">
          <span>H</span>
        </div>
      </div>
    </div>
  );

  function changeNoteStyle() {
    noteStyle();
    setListStyle((pre) => !pre);
  }
};

export default Header;
