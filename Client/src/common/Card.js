import React, { Fragment } from 'react';

export default function Cards({ appName, db, type }) {
  return (
    <Fragment>
      <div className="mb-4 col-sm-12 col-md-12 col-lg-4 cards">
        <h5>Application Name - [{appName}]</h5>
        <h6>Database Name - [{db}]</h6>
        <h6>Type - [{type}]</h6>
      </div>
    </Fragment>
  );
}
