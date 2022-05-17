import React, { Fragment } from 'react';

import { ConditionalLink } from './ConditionalLink';

export const MenuItem = ({ title, to, image, target = '', notification }) => (
  <Fragment>
    <ConditionalLink to={to} target={target}>
      <li aria-hidden="true" className="active-navbar-list">
        <img src={image} alt="icon" />
        <span>{title}</span>
        <div className="ms-auto">{notification}</div>
      </li>
    </ConditionalLink>
  </Fragment>
);