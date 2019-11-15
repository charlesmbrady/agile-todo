import React from "react";
// import "./style.css";
// import AUTH from "../../utils/AUTH";
// import API from "../../utils/API";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function EditTodo({ isOpen, toggle, userId, todo }) {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Todo</ModalHeader>
      <ModalBody>"Edit" Todo form here, here is the todo</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>
          Save
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
