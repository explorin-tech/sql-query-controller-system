import React from "react";

import "../../static/css/navBar.css";

import DropDownMenu from "../dropDownMenu";
import Logo from "../logo";

export default function Navbar() {
  return (
    <div className="navbar">
      <Logo />
      <DropDownMenu />
    </div>
  );
}
