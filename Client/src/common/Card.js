import React from 'react';

export default function Cards({ appName, db }) {
  return (
    <div className="mb-4 col-sm-12 col-md-12 col-lg-4 cards">
      <h5>{appName}</h5>
      <h6>{db}</h6>
    </div>
  );
}
