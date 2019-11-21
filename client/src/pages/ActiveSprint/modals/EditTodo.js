import React, { useState } from "react";
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
  sprintId,
  totalPoints,
  completedPoints
  // updateTodosList
}) {
  const [subject, setSubject] = useState(todo.subject);
  const [description, setDescription] = useState(todo.description);
  const [priority, setPriority] = useState(todo.priority);
  const [points, setPoints] = useState(todo.points);
  const [status, setStatus] = useState(todo.status);
  const [sprint, setSprint] = useState(sprintId);

  const updateTodo = () => {
    const newTodo = {
      id: todo._id,
      subject,
      type: todo.type,
      description,
      priority,
      points,
      sprint,
      user: userId,
      status
    };

    API.updateTodo(newTodo).then(todoResponse => {
      if (todoResponse.status === 200) {
        // updateTodosList(todoResponse.data);
        //make api call to insert the todo id into the todos array on the sprint if the sprint is there
        // ***********************************
        // *********************************
        // what if i do this on the backend in the update todo controller

        let newCompletedPoints = parseInt(completedPoints) + parseInt(points);
        const event = {
          type: "todo completed",
          completedPoints: newCompletedPoints,
          totalPoints: totalPoints,
          sprint: sprint
        };
        if (status === "completed") {
          API.createEvent(event).then(eventResponse => {
            console.log(eventResponse.data);
          });
        }

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
            <Label for="status">Status</Label>
            <Input
              type="select"
              name="select"
              id="status"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option>Select status</option>
              <option value="ready" onClick={e => setStatus(e.target.value)}>
                Ready
              </option>
              <option value="working" onClick={e => setStatus(e.target.value)}>
                Working
              </option>
              <option
                value="completed"
                onClick={e => setStatus(e.target.value)}
              >
                Completed
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
