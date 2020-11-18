import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function Dialog({
  handleConfirm,
  handleCancel,
  handleOnHide,
  title,
  body,
  confirmText = "Ok",
  cancelText = "Cancelar",
  show = false,
}) {
  return (
    <Modal show={show} onHide={() => handleOnHide && handleOnHide()}>
      <div className="dialogContainer">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{body}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => handleCancel && handleCancel()}
          >
            {cancelText}
          </Button>

          <Button
            variant="outline-secondary"
            onClick={() => handleConfirm && handleConfirm()}
          >
            {confirmText}
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}
