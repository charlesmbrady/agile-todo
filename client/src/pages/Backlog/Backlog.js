import React, { useEffect, useState } from "react";
import "./style.css";
import AUTH from "../../utils/AUTH";
import API from "../../utils/API.js";
import CreateSprint from "./modals/CreateSprint";
import CreateTodo from "./modals/CreateTodo";
import EditTodo from "./modals/EditTodo";
import { Table } from "reactstrap";
import TodoListItem from "../../components/TodoListItem/TodoListItem";

// need to chop some of this up and put a useEffect that updates especially the active sprint whenver
// a todo is update.  so whenever the todos list changes, the active sprint should be recalled for

// ^ disregard, just need to update the sprint itself iwth the todo id whenever a todo is updated
export default function Backlog({ setAuthenticated }) {
  const [user, setUser] = useState({});
  const [todo, setTodo] = useState(null);
  const [sprint, setSprint] = useState(null);
  const [todosList, setTodosList] = useState([]);
  const [sprintsList, setSprintsList] = useState([]);

  // const activeSprint = sprintsList.find(sprint.status === "inProgress");

  //SEPERATE sprints into it's own component? the pass todos, then filter those todos within sprint component
  // need to get all sprints in the sprints list
  // filter sprintsList and display the sprint that has status of "inProgress" first
  // then filter all the todos by this sprintId and display them

  //filter sprintsList and display the sprints with status of "notStarted"

  //Display all todos that are not complete and have no sprint ref

  //_____________________________ Modals ____________________________________//
  const [createSprintModal, setCreateSprintModal] = useState(false);
  const [createTodoModal, setCreateTodoModal] = useState(false);
  const [editTodoModal] = useState(true);

  const toggleCreateSprintModal = () => {
    setCreateSprintModal(!createSprintModal);
  };
  const toggleCreateTodoModal = () => {
    setCreateTodoModal(!createTodoModal);
  };
  ////////////////////////////////////////////////////////////////////////////////

  const getSprints = async userId => {
    API.getAllSprints(userId).then(res => {
      setSprintsList(res.data);
    });
  };
  const getTodos = async userId => {
    API.getAllTodos(userId).then(res => {
      setTodosList(res.data);
    });
  };

  useEffect(() => {
    //First make a call to get userId to get respective todos
    AUTH.checkToken().then(res => {
      if (res.status === 200) {
        setUser({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          id: res.data.id
        });
        // with the userId set, get all the todos and sprints for the user
        getTodos(res.data.id);
        getSprints(res.data.id);
      } else {
        // if the res.status is not 200, then log the user out.
        setAuthenticated(false);
        setUser({});
      }
    });
    // eslint-disable-next-line
  }, [todo, sprint]);

  return (
    <div className="backlog-page-wrapper">
      <div className="backlog-page-header-wrapper">
        <button
          id="create-sprint-button"
          className="backlog-page-header-item backlog-button btn"
          onClick={() => toggleCreateSprintModal()}
        >
          Create Sprint
        </button>
        <button
          id="create-todo-button"
          className="backlog-button btn"
          onClick={() => toggleCreateTodoModal()}
        >
          Create Todo
        </button>
      </div>

      {/* <div className="sprint-wrapper"> */}
      <h2>active sprint</h2>
      {sprintsList
        .filter(sprint => sprint.status === "inProgress")
        .map(sprint => {
          return <p>{sprint.name}</p>;
        })}
      {/* <div className="sprint-header-wrapper">
          <h6 className="sprint-header-item">
            {activeSprint === null ? (
              <span>No Active Sprint</span>
            ) : (
              <span>Active Sprint - {activeSprint.name}</span>
            )}
          </h6>
          {activeSprint !== null &&
            activeSprint.status === "active" &&
            activeSprint.todos.length !== 0 && (
              <button
                onClick={() => startSprint()}
                className="sprint-header-item"
                id="sprint-start-button"
              >
                Start Sprint
              </button>
            )}
          {activeSprint === null && (
            <button
              id="create-sprint-button"
              className="backlog-page-header-item"
              onClick={() => toggleCreateSprintModal()}
            >
              Create Sprint
            </button>
          )}
        </div> */}
      {/* <div className="sprint-body-wrapper todos-list">
          {activeSprint != null &&
            todosList.filter(todo => todo.sprint === activeSprint._id) && (
              <div className="sprint-table-wrapper">
                <Table responsive hover>
                  <tbody>
                    {todosList
                      .filter(todo => todo.sprint === activeSprint._id)
                      .map((todo, i) => (
                        <TodoListItem
                          todo={todo}
                          key={i}
                          setTodo={() => setTodo(todo)}
                        />
                      ))}
                  </tbody>
                </Table>
              </div>
            )}
        </div> */}
      {/* </div> */}
      {/* )} */}

      {/* <div className="backlog-wrapper"> */}
      {/* <div className="backlog-header-wrapper"> */}
      {/* <h6 className="backlog-header-item">
            Backlog -{" "}
            {todosList.filter(todo => todo.status === "backlog").length} Todos
          </h6> */}
      {/* </div> */}
      {/* <div className="backlog-body-wrapper todos-list">
          <div className="backlog-table-wrapper">
            <Table responsive hover>
              <tbody>
                {todosList
                  .filter(todo => todo.status === "backlog")
                  .map((todo, i) => (
                    <TodoListItem
                      todo={todo}
                      key={i}
                      setTodo={() => setTodo(todo)}
                    />
                  ))}
              </tbody>
            </Table>
          </div>
        </div> */}
      {/* </div> */}
      {createTodoModal && (
        <CreateTodo
          isOpen={createTodoModal}
          toggle={toggleCreateTodoModal}
          userId={user.id}
        />
      )}
      {todo && (
        <EditTodo
          isOpen={editTodoModal}
          toggle={setTodo}
          userId={user.id}
          todo={todo}
        />
      )}
      {createSprintModal && (
        <CreateSprint
          isOpen={createSprintModal}
          toggle={toggleCreateSprintModal}
          userId={user.id}
          sprint={sprint}
        />
      )}
    </div>
  );
}
