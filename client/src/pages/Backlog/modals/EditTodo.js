import React, { useState } from "react";
// import "./style.css";
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

export default function EditTodo({
  isOpen,
  toggle,
  userId,
  todo,
  sprintsList,
  updateTodosList
}) {
  const [subject, setSubject] = useState(todo.subject);
  const [description, setDescription] = useState(todo.description);
  const [priority, setPriority] = useState(todo.priority);
  const [points, setPoints] = useState(todo.points);
  const [sprint, setSprint] = useState(sprintsList[0]._id);

  const updateTodo = () => {
    const newTodo = {
      id: todo._id,
      subject,
      type: todo.type,
      description,
      priority,
      points,
      sprint,
      user: userId
    };
    API.updateTodo(newTodo).then(todoResponse => {
      if (todoResponse.status === 200) {
        updateTodosList(todoResponse.data);
        toggle(null);
      }
    });
  };

  return (
    <Modal isOpen={isOpen} toggle={() => toggle(null)}>
      <ModalHeader toggle={() => toggle(null)}>Edit Todo</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="subject">Subject</Label>
            <Input
              type="text"
              name="subject"
              id="subject"
              placeholder=""
              value={subject}
              onChange={e => setSubject(e.target.value)}
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
              <option>High</option>
              <option>Medium</option>
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
          <FormGroup>
            <Label for="sprint">Sprint</Label>
            <Input
              type="select"
              name="select"
              id="sprint"
              value={sprint}
              onChange={e => setSprint(e.target.value)}
            >
              <option value={null}>Add to sprint...</option>
              {sprintsList.map(sprint => (
                <option
                  value={sprint._id}
                  onClick={() => setSprint(sprint._id)}
                >
                  {sprint.name}
                </option>
              ))}
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
