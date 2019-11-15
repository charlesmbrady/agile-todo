import React, { useEffect, useState } from "react";
import "./style.css";
import AUTH from "../../utils/AUTH";
import API from "../../utils/API";
import CreateSprint from "./modals/CreateSprint";
import CreateTodo from "./modals/CreateTodo";
import EditTodo from "./modals/EditTodo";

export default function Backlog({ setAuthenticated }) {
  const [user, setUser] = useState({});
  const [todo, setTodo] = useState({});
  const [todosList] = useState([{}]);
  //Modals
  const [createSprintModal, setCreateSprintModal] = useState(false);
  const [createTodoModal, setCreateTodoModal] = useState(false);
  const [editTodoModal, setEditTodoModal] = useState(false);

  const toggleCreateSprintModal = () => {
    setCreateSprintModal(!createSprintModal);
  };
  const toggleCreateTodoModal = () => {
    setCreateTodoModal(!createTodoModal);
  };
  const toggleEditTodoModal = todo => {
    setTodo(todo);
    setEditTodoModal(!editTodoModal);
  };

  const getTodos = () => {};

  const createTodo = () => {};

  const editTodo = () => {};

  const createSprint = () => {};
  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    AUTH.checkToken().then(res => {
      if (res.status === 200) {
        // setAuthenticated(true);
        setUser({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          id: res.data.id
        });
      } else {
        setAuthenticated(false);
        setUser({});
      }
    });
  };

  return (
    <div className="backlog-wrapper">
      <h1>Backlog</h1>
      <button onClick={() => toggleCreateTodoModal()}>create todo</button>
      {createTodoModal && (
        <CreateTodo
          isOpen={createTodoModal}
          toggle={toggleCreateTodoModal}
          userId={user.id}
        />
      )}
      {editTodoModal && (
        <EditTodo
          isOpen={editTodoModal}
          toggle={toggleEditTodoModal}
          userId={user.id}
          todo={todo}
        />
      )}
      {createSprintModal && (
        <CreateSprint
          isOpen={createSprintModal}
          toggle={toggleCreateSprintModal}
          userId={user.id}
        />
      )}
    </div>
  );
}
