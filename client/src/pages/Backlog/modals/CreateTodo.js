import React, { useState } from "react";
import "./style.css";
// import AUTH from "../../utils/AUTH";
import API from "../../../utils/API";
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

export default function CreateTodo({
  isOpen,
  toggle,
  userId,
  updateTodosList
}) {
  const [subject, setSubject] = useState(null);
  const [description, setDescription] = useState(null);
  const [priority, setPriority] = useState(null);
  const [points, setPoints] = useState(null);

  const createTodo = () => {
    const todo = {
      subject,
      description,
      priority,
      points,
      user: userId
    };
    API.createTodo(todo).then(todoResponse => {
      if (todoResponse.status === 200) {
        updateTodosList(todoResponse.data);
        toggle();
      }
    });
  };

  return (
    <Modal className="my-modal" isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create Todo</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="subject">Subject</Label>
            <Input
              type="text"
              name="subject"
              id="subject"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder=""
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="textarea"
              name="text"
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="priority">Priority</Label>
            <Input
              type="select"
              name="select"
              id="priority"
              value={priority}
              onChange={e => setPriority(e.target.value)}
            >
              <option>Medium</option>
              <option>High</option>
              <option>Low</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="points">Points</Label>
            <Input
              type="number"
              name="number"
              id="points"
              placeholder=""
              value={points}
              onChange={e => setPoints(e.target.value)}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <button onClick={() => createTodo()}>createtodo</button>
        <Button color="primary" onClick={() => createTodo()}>
          Submit
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
