import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

export const ConditionalLink = ({ to, children }) => {

  return (
    <Fragment>
      <NavLink
        exact={true}
        className={isActive => (!isActive ? "" : "active-navbar")}
        to={to}
      >
        {children}
      </NavLink>
    </Fragment>
  );
};
