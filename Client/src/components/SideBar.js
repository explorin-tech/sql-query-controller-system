import React from 'react';
import { MenuItem } from '../common/MenuItem';

import '../static/css/sideBar.css';

export default function Sidebar() {
  return (
    <div className="sideBar">
      <div className="sideBarUpper">
        <MenuItem
          to="/home"
          image={require('../static/images/dummy.png')}
          title="Home"
        />
        <MenuItem
          to="/query"
          image={require('../static/images/dummy.png')}
          title="Query Window"
        />
        <MenuItem
          to="/application"
          image={require('../static/images/dummy.png')}
          title="Add Application"
        />
        <MenuItem
          to="/database"
          image={require('../static/images/dummy.png')}
          title="Add Database"
        />
        <MenuItem
          to="/user"
          image={require('../static/images/dummy.png')}
          title="User Window"
        />
        <MenuItem
          to="/draft"
          image={require('../static/images/dummy.png')}
          title="Open Draft Queries"
        />
      </div>
    </div>
  );
}
