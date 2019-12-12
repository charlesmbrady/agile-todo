import React, { useState } from "react";
import "./style.css";
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
  Input
} from "reactstrap";

export default function CreateSprint({ isOpen, toggle, userId }) {
  const [name, setName] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const createSprint = () => {
    const sprint = {
      name,
      startDate,
      endDate,
      user: userId
    };
    API.createSprint(sprint).then(sprintResponse => {
      if (sprintResponse.status === 200) {
        toggle();
      }
    });
  };

  return (
    <Modal className="my-modal" isOpen={isOpen} toggle={toggle}>
      <ModalHeader className="my-modal" toggle={toggle}>
        Create Sprint
      </ModalHeader>
      <ModalBody className="my-modal">
        <Form>
          <FormGroup>
            <Label for="subject">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder=""
            />
          </FormGroup>

          <FormGroup>
            <Label for="startDate">Start Date</Label>
            <Input
              type="date"
              name="startDate"
              id="startDate"
              placeholder="date placeholder"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="endDate">End Date</Label>
            <Input
              type="date"
              name="endDate"
              id="endDate"
              placeholder="date placeholder"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter className="my-modal">
        <Button color="primary" onClick={() => createSprint()}>
          Submit
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
