import React, { useState, useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router";
import "./Header_fb.css";

import {
  FaBeer,
  FaCog,
  FaCoffee,
  FaPaperPlane,
  FaHome,
  FaBolt,
  FaCaretRight,
  FaCaretDown,
} from "react-icons/fa";
import { Link } from "react-router-dom";
function Header_fb() {
  const loca = useLocation().pathname;
  const [wid, setwidth] = useState("");
  const [mob_title, setmob_title] = useState([
    { title: "home", icon: <FaHome /> },
    { title: "projects", icon: <FaBolt /> },
    { title: "contacts", icon: <FaPaperPlane /> },
  ]);

  useEffect(() => {
    window.addEventListener("resize", set_wid);
    console.log("getting the navbar width");
    set_wid();
    return () => {
      console.log("clean up ");
      window.removeEventListener("resize", set_wid);
    };
  }, []);
  const set_wid = () => {
    setwidth(document.body.querySelector(".navbar").clientWidth);
  };
  console.log("rendered the navbar");

  return (
    <Navbar>
      {wid > 600 && <NavItems />}

      <NavItem
        icon={<FaCaretRight />}
        iconto={<FaCaretDown />}
        path_name={loca}
      >
        <Dropdown mob_title={mob_title} wid={wid} />
      </NavItem>

      {/* last - dropdown */}
    </Navbar>
  );
}
function Navbar(props) {
  return (
    <nav className="navbar">
      <span className="brand">r1558</span>
      <ul className="navbar_nav">{props.children}</ul>
    </nav>
  );
}
function NavItem(props) {
  const [open, setopen] = useState(false);

  return (
    <li className="nav-item">
      <Link
        to={props.path_name}
        className="icon"
        onClick={() => {
          setopen(!open);
        }}
      >
        {props.iconto ? open ? props.iconto : props.icon : <>{props.icon}</>}
      </Link>

      {open && props.children}
    </li>
  );
}
function NavItems() {
  return (
    <>
      <NavItem icon={<FaHome />} path_name="/home" text="home" />
      <NavItem icon={<FaBeer />} path_name="/youtube" text="youtube" />
      <NavItem icon={<FaBolt />} path_name="/projects" text="projects" />
      <NavItem icon="😎" path_name="/contact" text="contact" />
    </>
  );
}
function Dropdown({ mob_title, wid }) {
  function DropdownItem(props) {
    return (
      <Link to={"/" + props.text} className="menuitems">
        <span className="iconleft">{props.left}</span>
        {props.text}

        <span className="iconright">{props.right} </span>
      </Link>
    );
  }
  function DropdownItemMobile({ mob_title }) {
    return (
      <>
        {mob_title.map((x) => (
          <DropdownItem text={x.title} left={x.icon} />
        ))}
      </>
    );
  }
  console.log(mob_title);
  return (
    <div className="dropdown">
      {wid <= 600 && <DropdownItemMobile mob_title={mob_title} />}
      <DropdownItem text="but me a coffee" left={<FaCoffee />} />
      <DropdownItem text="setting" left={<i className="fas fa-cog"></i>} />
    </div>
  );
}
export default Header_fb;
