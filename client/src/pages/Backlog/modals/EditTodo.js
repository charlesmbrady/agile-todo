import React, { useState } from "react";
// import "./style.css";
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

export default function EditTodo({
  isOpen,
  toggle,
  userId,
  todo,
  sprintsList
}) {
  const [newTodo, setNewTodo] = useState(todo.subject);
  const updateTodo = () => {
    const tempTodo = { ...newTodo };
    console.log(tempTodo);
    toggle(null);
  };

  return (
    <Modal isOpen={isOpen} toggle={() => toggle(null)}>
      <ModalHeader toggle={() => toggle(null)}>Edit Todo</ModalHeader>
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
            <Label for="points">Points</Label>
            <Input type="number" name="number" id="points" placeholder="" />
          </FormGroup>
          <FormGroup>
            <Label for="sprint">Sprint</Label>
            <Input type="select" name="select" id="sprint">
              {sprintsList.map(sprint => (
                <option value={sprint._id}>{sprint.name}</option>
              ))}
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </Input>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => updateTodo()}>
          Save
        </Button>{" "}
        <Button color="secondary" onClick={() => toggle(null)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
