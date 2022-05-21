import React, { useState, Fragment } from 'react';

import '../static/css/home.css';
import Card from '../common/Card';
import Acrdn from '../common/Accordion';

const data = [
  {
    applicationName: 'App One',
    database: 'Application One db',
  },
  {
    applicationName: 'App Two',
    database: 'Application Two db',
  },
  {
    applicationName: 'App Three',
    database: 'Application Three db',
  },
  {
    applicationName: 'App Four',
    database: 'Application Four db',
  },
];

export default function Home(props) {
  const [error, setError] = useState('');
  return (
    <Fragment>
      <div className="homePage">
        <h4>Applications</h4>
        <div className="row">
          {data.map((item, index) => {
            return (
              <Card
                key={index}
                appName={item.applicationName}
                db={item.database}
              />
            );
          })}
        </div>
        <h4>Pending for Approval</h4>
        <div className="row">
          <Acrdn data="Hi" />
        </div>
        <h4>Recent Queries</h4>
        <div className="row">
          <Acrdn data="Hi" />
        </div>
      </div>
    </Fragment>
  );
}
