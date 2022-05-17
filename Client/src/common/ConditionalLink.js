import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

export const ConditionalLink = ({ to, children, target }) => {
  const isExternal = to.startsWith('https://') || to.startsWith('http://');

  if (isExternal) {
    let externalTarget = target || '_blank';
    return (
      <a
        href={to}
        target={externalTarget}
        rel={(externalTarget === '_blank' && 'noreferrer').toString()}
        className="text-decoration-none"
      >
        {children}
      </a>
    );
  }

  return (
    <Fragment>
      <NavLink
        target={target}
        rel={(target === '_blank' && 'noreferrer').toString()}
        activeClassName="active-navbar"
        to={to}
        className="text-decoration-none"
      >
        {children}
      </NavLink>
    </Fragment>
  );
};
