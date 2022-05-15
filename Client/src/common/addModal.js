import React from 'react';
import { Modal } from 'react-bootstrap';

import '../static/css/addModal.css';

export default function AddModal({ modalShow, setModalShow, title, ...props }) {
  const saveData = () => {
    setModalShow(false);
  };

  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="addModal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className="title">
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="body">{props.children}</Modal.Body>
        <Modal.Footer>
          <br />
          <button className="greenButton" onClick={() => saveData()}>
            Save changes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
