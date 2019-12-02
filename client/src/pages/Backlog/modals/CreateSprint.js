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
  const [pointsProjection, setPointsProjection] = useState(null);

  const createSprint = () => {
    const sprint = {
      name,
      pointsProjection,
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
      <ModalHeader toggle={toggle}>Create Sprint</ModalHeader>
      <ModalBody>
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
            <Label for="pointsProjection">Points Projection</Label>
            <Input
              type="number"
              name="number"
              id="pointsProjection"
              placeholder=""
              value={pointsProjection}
              onChange={e => setPointsProjection(e.target.value)}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
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
