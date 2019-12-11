import React, { useEffect, useState } from "react";
import "./style.css";
import AUTH from "../../utils/AUTH";
import API from "../../utils/API.js";
import CreateSprint from "./modals/CreateSprint";
import CreateTodo from "./modals/CreateTodo";
import EditTodo from "./modals/EditTodo";
import { Table } from "reactstrap";
import TodoListItem from "../../components/TodoListItem/TodoListItem";

export default function Backlog({ setAuthenticated }) {
  const [user, setUser] = useState({});
  const [todo, setTodo] = useState(null);
  const [sprint, setSprint] = useState(null);
  const [todosList, setTodosList] = useState([]);
  const [sprintsList, setSprintsList] = useState([]);

  const [createSprintModal, setCreateSprintModal] = useState(false);
  const [createTodoModal, setCreateTodoModal] = useState(false);
  const [editTodoModal] = useState(true);
  const backlogTodos = todosList.filter(
    todo => todo.sprint === undefined || null
  );
  let hasActiveSprint;
  sprintsList.filter(sprint => sprint.status === "inProgress").length === 0
    ? (hasActiveSprint = false)
    : (hasActiveSprint = true);

  const toggleCreateSprintModal = () => {
    setCreateSprintModal(!createSprintModal);
  };
  const toggleCreateTodoModal = () => {
    setCreateTodoModal(!createTodoModal);
  };
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
  const startSprint = sprint => {
    sprint.status = "inProgress";
    API.updateSprint(sprint).then(res => {
      if (res.status === 200) {
        setSprint({});
      }
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
  }, [todo, sprint, createSprintModal, createTodoModal, editTodoModal]);

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
      <div className="sprints-section">
        <h3>Sprints</h3>
        {sprintsList.filter(sprint => sprint.status !== "completed").length ===
          0 && <div className="no-list">No sprints...</div>}
        {sprintsList
          .filter(sprint => sprint.status !== "completed")
          .map((sprint, i) => {
            return (
              <div className="sprint-wrapper">
                <div className="sprint-header-wrapper">
                  <h6 className="sprint-header-item sprint-name">
                    {sprint.name}
                  </h6>
                  {hasActiveSprint === false && i === 0 && (
                    <button
                      id="start-sprint-button"
                      onClick={() => startSprint(sprint)}
                    >
                      Start Sprint
                    </button>
                  )}
                </div>
                <div className="sprint-body">
                  {todosList.filter(todo => todo.sprint === sprint._id)
                    .length === 0 && (
                    <div className="no-list">
                      No todos for this sprint yet...
                    </div>
                  )}
                  <Table responsive hover>
                    <tbody>
                      {todosList
                        .filter(todo => todo.sprint === sprint._id)
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
              </div>
            );
          })}
      </div>

      <div className="backlog-todos-wrapper">
        <div className="backlog-todos-header-wrapper">
          <h3>Backlog</h3>
        </div>
        <div className="backlog-todos-body-wrapper">
          {backlogTodos.length === 0 && (
            <div className="no-list">No todos in backlog...</div>
          )}
          <Table responsive hover>
            <tbody>
              {todosList
                .filter(todo => todo.sprint === undefined || null)
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
      </div>

      {/* _______________________________________ MODALS _______________________________________ */}
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
          sprintsList={sprintsList}
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
