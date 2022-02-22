import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Menu = ({ menuToggle, setMenuToggle }) => {
  const [menuOpen, setMenuOpen] = useState(true);

  const year = new Date().getFullYear();

  const openMenuFunction = () => {
    if (menuToggle) {
      setMenuOpen(false);
    }
  };

  const closeMenuFunction = () => {
    if (menuToggle) {
      setMenuOpen(true);
    }
  };

  return (
    <div
      id="aside_menu"
      className={menuToggle && menuOpen ? "menu_toggle" : "aside_menu"}
      onMouseEnter={() => openMenuFunction()}
      onMouseLeave={() => closeMenuFunction()}
    >
      <div className="links">
        <NavLink to={"/"} className="menu-items">
          <i className="fas fa-lightbulb"></i>
          <span>{menuToggle && menuOpen ? "" : "Notes"}</span>
        </NavLink>
        <NavLink to={"/reminders"} className="menu-items">
          <i className="fas fa-bell"></i>
          <span>{menuToggle && menuOpen ? "" : "Reminders"}</span>
        </NavLink>
        <NavLink to={"/labels"} className="menu-items">
          <i className="fas fa-pencil-alt"></i>
          <span>{menuToggle && menuOpen ? "" : "Edit labels"}</span>
        </NavLink>
        <NavLink to={"/archive"} className="menu-items">
          <i className="fas fa-archive"></i>
          <span>{menuToggle && menuOpen ? "" : "Archive"}</span>
        </NavLink>
        <NavLink to={"/trash"} className="menu-items">
          <i className="fas fa-trash-alt"></i>
          <span>{menuToggle && menuOpen ? "" : "Trash"}</span>
        </NavLink>
      </div>
      {menuToggle && menuOpen ? (
        ""
      ) : (
        <div id="footer">
          <p>copyright © {year}</p>
        </div>
      )}
    </div>
  );
};

export default Menu;
