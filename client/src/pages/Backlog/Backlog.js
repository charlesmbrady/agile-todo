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
  const [sprint, setSprint] = useState(null);
  const [sprintsList, setSprintsList] = useState([{}]);

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

  const editTodo = () => {};

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
          API.getAllSprints(res.data.id).then(sprintsResponse => {
            setSprintsList(sprintsResponse.data);
          });
        });
      } else {
        setAuthenticated(false);
        setUser({});
      }
    });
  }, []);

  const updateTodosList = todo => {
    const tempTodos = [...todosList];
    tempTodos.unshift(todo);
    setTodosList(tempTodos);
  };

  const addToSprintsList = sprint => {
    const tempSprints = [...sprintsList];
    tempSprints.unshift(sprint);
    setSprintsList(tempSprints);
  };

  return (
    <div className="backlog-wrapper">
      <h1>Backlog</h1>
      <button onClick={() => toggleCreateTodoModal()}>Create Todo</button>
      <button onClick={() => toggleCreateSprintModal()}>Create Sprint</button>
      <Table responsive hover>
        <tbody>
          {todosList.map((todo, i) => (
            <tr key={i} onClick={() => setTodo(todo)}>
              <td>Type</td>
              <td>{todo.subject}</td>
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
          updateTodosList={updateTodosList}
        />
      )}
      {todo && (
        <EditTodo
          isOpen={editTodoModal}
          toggle={setTodo}
          userId={user.id}
          todo={todo}
          sprintsList={sprintsList}
        />
      )}
      {createSprintModal && (
        <CreateSprint
          isOpen={createSprintModal}
          toggle={toggleCreateSprintModal}
          userId={user.id}
          addToSprintsList={addToSprintsList}
        />
      )}
    </div>
  );
}
