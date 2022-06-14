import React, { Fragment } from 'react';
import { Accordion } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function Acrdn({ data, heading }) {
  const history = useHistory();

  const handleQueryRedirection = (e) => {
    history.push(`/query/${e.target.value}`);
  };
  return (
    <Fragment>
      <Accordion className="acrdn">
        <Accordion.Item eventKey="0">
          <Accordion.Header>{heading}</Accordion.Header>
          <Accordion.Body>
            <div>
              <div>
                {data?.map((each_query) => {
                  return (
                    <li
                      key={each_query['Q_ID']}
                      value={each_query['Q_ID']}
                      onClick={handleQueryRedirection}
                      className="queryListItem"
                    >
                      {each_query['Q_UserDefName']}
                    </li>
                  );
                })}
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Fragment>
  );
}
