import React from "react";
// import "./style.css";
// import AUTH from "../../utils/AUTH";
// import API from "../../utils/API";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function CreateTodo({ isOpen, toggle, userId }) {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create Todo</ModalHeader>
      <ModalBody>Add todo form here</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>
          Submit
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
