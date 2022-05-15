import React from 'react';

import '../static/css/navBar.css';

import DropDownMenu from '../common/DropDownMenu';
import Logo from '../common/Logo';

export default function Navbar() {
  return (
    <div className="navbar">
      <Logo />
      <DropDownMenu />
    </div>
  );
}
