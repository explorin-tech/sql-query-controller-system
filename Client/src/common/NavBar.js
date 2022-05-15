import React from 'react';

import '../static/css/navBar.css';

import DropDownMenu from './DropDownMenu';
import Logo from './Logo';

export default function Navbar() {
  return (
    <div className="navbar">
      <Logo />
      <DropDownMenu />
    </div>
  );
}
