import React from "react";
import { Accordion } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";

export default function Acrdn({data}) {
  return (
    <>
      <Accordion className="acrdn">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Queries</Accordion.Header>
          <Accordion.Body>
            {data}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}