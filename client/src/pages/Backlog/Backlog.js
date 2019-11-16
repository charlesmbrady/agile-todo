import React, { useEffect, useState } from "react";
import "./style.css";
import AUTH from "../../utils/AUTH";
import API from "../../utils/API.js";
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
  const [activeSprint, setActiveSprint] = useState(null);

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
            sprintsResponse.data.forEach(sprint => {
              if (sprint.status === "active" || sprint.status == "underway") {
                setActiveSprint(sprint);
              }
            });
            setSprintsList(sprintsResponse.data);
          });
        });
      } else {
        setAuthenticated(false);
        setUser({});
      }
    });
  }, []);

  const updateTodosList = givenTodo => {
    const tempTodos = [...todosList];
    let newTodo = true;

    tempTodos.forEach((loopTodo, i) => {
      if (loopTodo._id === givenTodo._id) {
        tempTodos[i] = givenTodo;
        newTodo = false;
      }
    });
    if (newTodo) {
      tempTodos.unshift(givenTodo);
    }
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
      {!activeSprint && (
        <button onClick={() => toggleCreateSprintModal()}>Create Sprint</button>
      )}
      {activeSprint && (
        <div className="sprint-wrapper">
          <div className="sprint-wrapper-header">
            <h6>{activeSprint.name}</h6>
            {activeSprint.status == "active" && <button>Start Sprint</button>}
          </div>
          <div className="sprint-table-wrapper">
            {todosList
              .filter(todo => todo.sprint == activeSprint._id)
              .map((todo, i) => (
                <p>{todo.subject}</p>
              ))}
          </div>
        </div>
      )}
      <Table responsive hover>
        <tbody>
          {todosList.map((todo, i) => (
            <tr
              className="todo-list-item"
              index={i}
              onClick={() => setTodo(todo)}
            >
              <td>{todo.type}</td>
              <td>{todo.subject}</td>
              <td>{todo.priority}</td>
              <td>{todo.points}</td>
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
          updateTodosList={updateTodosList}
          // subject={todo.subject}
          // description={todo.description}
          sprintsList={sprintsList}
        />
      )}
      {createSprintModal && (
        <CreateSprint
          isOpen={createSprintModal}
          toggle={toggleCreateSprintModal}
          userId={user.id}
          setActiveSprint={setActiveSprint}
          addToSprintsList={addToSprintsList}
        />
      )}
    </div>
  );
}
