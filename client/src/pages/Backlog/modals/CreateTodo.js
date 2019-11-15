import React from "react";
import "./style.css";
// import AUTH from "../../utils/AUTH";
// import API from "../../utils/API";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";

export default function CreateTodo({ isOpen, toggle, userId }) {
  return (
    <Modal className="my-modal" isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create Todo</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="subject">Subject</Label>
            <Input type="text" name="subject" id="subject" placeholder="" />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input type="textarea" name="text" id="description" />
          </FormGroup>
          <FormGroup>
            <Label for="priority">Priority</Label>
            <Input type="select" name="select" id="priority">
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="points">Estimated Points</Label>
            <Input type="number" name="number" id="points" placeholder="" />
          </FormGroup>
        </Form>
      </ModalBody>
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
