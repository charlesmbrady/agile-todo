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
  const [todosList, setTodosList] = useState([{}]);
  const [sprintsList, setSprintsList] = useState([{}]);
  const [activeSprint, setActiveSprint] = useState(null);

  //SEPERATE sprints into it's own component? the pass todos, then filter those todos within sprint component
  // need to get all sprints in the sprints list
  // filter sprintsList and display the sprint that has status of "inProgress" first
  // then filter all the todos by this sprintId and display them

  //filter sprintsList and display the sprints with status of "notStarted"

  //Display all todos that are not complete and have no sprint ref

  //Modals
  const [createSprintModal, setCreateSprintModal] = useState(false);
  const [createTodoModal, setCreateTodoModal] = useState(false);
  const [editTodoModal] = useState(true);

  const toggleCreateSprintModal = () => {
    setCreateSprintModal(!createSprintModal);
  };
  const toggleCreateTodoModal = () => {
    setCreateTodoModal(!createTodoModal);
  };

  const startSprint = () => {
    let tempActiveSprint = { ...activeSprint };
    tempActiveSprint.status = "inProgress";
    API.startSprint({ _id: tempActiveSprint._id }).then(sprintResponse => {
      setActiveSprint(tempActiveSprint);

      let totalPoints = 0;
      todosList.forEach(todo => {
        if (todo.sprint === activeSprint._id) {
          totalPoints += parseInt(todo.points);
        }
      });

      const event = {
        type: "sprint started",
        completedPoints: 0,
        totalPoints: totalPoints,
        sprint: activeSprint._id
      };
      API.createEvent(event).then(eventResponse => {
        console.log(eventResponse.data);
      });
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
        // with the userId set, get all the todos for the user
        API.getAllTodos(res.data.id).then(todosResponse => {
          setTodosList(todosResponse.data);
          API.getAllSprints(res.data.id).then(sprintsResponse => {
            sprintsResponse.data.forEach(sprint => {
              if (
                sprint.status === "active" ||
                sprint.status === "inProgress"
              ) {
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
    // eslint-disable-next-line
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
    <div className="backlog-page-wrapper">
      <div className="backlog-page-header-wrapper">
        {/* {!activeSprint && (
          <button
            id="create-sprint-button"
            className="backlog-page-header-item"
            onClick={() => toggleCreateSprintModal()}
          >
            Create Sprint
          </button>
        )} */}
      </div>

      {/* {activeSprint && ( */}
      <div className="sprint-wrapper">
        <div className="sprint-header-wrapper">
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
        </div>
        <div className="sprint-body-wrapper todos-list">
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
        </div>
      </div>
      {/* )} */}

      <div className="backlog-wrapper">
        <div className="backlog-header-wrapper">
          <h6 className="backlog-header-item">
            Backlog -{" "}
            {todosList.filter(todo => todo.status === "backlog").length} Todos
          </h6>
          <button
            id="create-todo-button"
            onClick={() => toggleCreateTodoModal()}
          >
            Create Todo
          </button>
        </div>
        <div className="backlog-body-wrapper todos-list">
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
        </div>
      </div>
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
