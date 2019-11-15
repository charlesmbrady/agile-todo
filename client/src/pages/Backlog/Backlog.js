import React, { useEffect, useState } from "react";
import "./style.css";
import AUTH from "../../utils/AUTH";
import API from "../../utils/API";
import CreateSprint from "./modals/CreateSprint";
import CreateTodo from "./modals/CreateTodo";
import EditTodo from "./modals/EditTodo";
import { Table } from "reactstrap";

export default function Backlog({ setAuthenticated }) {
  const [user, setUser] = useState({});
  const [todo, setTodo] = useState(null);
  const [todosList, setTodosList] = useState([{}]);
  //Modals
  const [createSprintModal, setCreateSprintModal] = useState(false);
  const [createTodoModal, setCreateTodoModal] = useState(false);
  const [editTodoModal, setEditTodoModal] = useState(true);

  const toggleCreateSprintModal = () => {
    setCreateSprintModal(!createSprintModal);
  };
  const toggleCreateTodoModal = () => {
    setCreateTodoModal(!createTodoModal);
  };
  const toggleEditTodoModal = todo => {
    if (todo) {
      // setTodo(todo);
      setEditTodoModal(!editTodoModal);
    } else {
      // setTodo(null);
      setEditTodoModal(!editTodoModal);
    }
    // setEditTodoModal(!editTodoModal);
  };

  useEffect(() => {
    setEditTodoModal(!editTodoModal);
  }, [todo]);

  const createTodo = () => {};
  const editTodo = () => {};
  const createSprint = () => {};

  useEffect(() => {
    //First make a call to get userId to get respective todos
    AUTH.checkToken().then(res => {
      if (res.status === 200) {
        setUser({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          id: res.data.id
        });
        // with the userId set, get all the todos for the user
        API.getAllTodos(res.data.id).then(todosResponse => {
          setTodosList(todosResponse.data);
        });
      } else {
        setAuthenticated(false);
        setUser({});
      }
    });
  }, []);

  return (
    <div className="backlog-wrapper">
      <h1>Backlog</h1>
      <button onClick={() => toggleCreateTodoModal()}>Create Todo</button>
      <Table responsive hover>
        <tbody>
          {todosList.map((todo, i) => (
            <tr key={i} onClick={toggleEditTodoModal}>
              <td>Type</td>
              <td>subject</td>
              <td>priority</td>
              <td>points</td>
            </tr>
          ))}
        </tbody>
      </Table>
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
