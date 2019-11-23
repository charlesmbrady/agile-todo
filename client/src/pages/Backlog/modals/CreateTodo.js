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
  Row,
  Col,
  FormGroup,
  Label,
  Input
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
      <ModalHeader className="my-modal" toggle={toggle}>
        Create Todo
      </ModalHeader>
      <ModalBody className="my-modal">
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

          <Row form>
            <Col md={2}>
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
            </Col>
            <Col md={1}>
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
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter className="my-modal">
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
