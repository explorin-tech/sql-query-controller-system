import React, { Fragment } from 'react';
import { Accordion } from 'react-bootstrap';

export default function Acrdn({ data }) {
  return (
    <Fragment>
      <Accordion className="acrdn">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Queries</Accordion.Header>
          <Accordion.Body>{data}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Fragment>
  );
}
