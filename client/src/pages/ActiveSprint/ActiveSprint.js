import React, { useEffect, useState } from "react";
import "./style.css";
import AUTH from "../../utils/AUTH";
import API from "../../utils/API";
import TodoCard from "../../components/TodoCard/TodoCard";
import EditTodo from "./modals/EditTodo";
import { Redirect } from "react-router-dom";

export default function ActiveSprint({ setAuthenticated }) {
  const [user, setUser] = useState({});
  const [todo, setTodo] = useState(null);
  const [todosList, setTodosList] = useState([]);
  const [sprint, setSprint] = useState({});
  const [redirect, setRedirect] = useState(false);

  let todosTotalPoints = 0;
  let todosCompletedPoints = 0;

  todosList.forEach(todo => {
    if (todo.status === "completed") {
      todosCompletedPoints += parseInt(todo.points);
    }
    todosTotalPoints += parseInt(todo.points);
  });

  //modal
  const [editTodoModal] = useState(true);

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to="/backlog" />;
    }
  };

  const endSprint = () => {
    const tempSprint = {
      // todos: [],
      status: "completed",
      endDate: Date.now(),
      user: sprint.user,
      name: sprint.name,
      createdDate: sprint.createdDate,
      lastUpdateDate: Date.now(),
      startDate: sprint.startDate,
      projectedPoints: todosTotalPoints,
      completedPoints: todosCompletedPoints,
      active: false,
      _id: sprint._id
    };
    API.updateSprint(tempSprint).then(sprintUpdateResponse => {
      console.log("sprint update response " + sprintUpdateResponse);
      setRedirect(true);

      const event = {
        type: "sprint ended",
        completedPoints: todosCompletedPoints,
        totalPoints: todosTotalPoints,
        sprint: sprint
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
        API.getActiveSprint(res.data.id).then(activeSprintResponse => {
          if (activeSprintResponse.data[0]) {
            setSprint(activeSprintResponse.data[0]);
            setTodosList(activeSprintResponse.data[0].todos);
          }
        });
        //need to get all todos in the active sprint and put them in one Todos list, and render them in swim lanes based on status
        // whenever the state of the todoslist is updated, rerender the swim lanes
      } else {
        setAuthenticated(false);
        setUser({});
      }
    });
    // eslint-disable-next-line
  }, [todo]);

  return (
    <div>
      {renderRedirect()}
      {/* <h1>ActiveSprint</h1> */}
      <div className="active-sprint-header-wrapper">
        <h5 className="active-sprint-header-item">
          {sprint.name}{" "}
          <span className="dates">
            <em>
              {sprint.createdDate || "start date"} -{" "}
              {sprint.endDate || "end date"}
            </em>
          </span>
        </h5>{" "}
        <h5 className="active-sprint-header-item points">
          {todosCompletedPoints}/{todosTotalPoints} points completed
        </h5>{" "}
        <button
          className="active-sprint-header-item"
          id="end-sprint-button"
          onClick={() => endSprint()}
        >
          End Sprint
        </button>
      </div>
      <div className="container-fluid">
        <div className="swim-lanes-wrapper row">
          <div className="swim-lane-wrapper col-md-4">
            <div className="swim-lane-header-wrapper">
              <h5 className="swim-lane-header">Ready</h5>
            </div>
            <div className="swim-lane-body-wrapper">
              {todosList
                .filter(todo => todo.status === "ready")
                .map(todo => (
                  <TodoCard todo={todo} setTodo={() => setTodo(todo)} />
                ))}
            </div>
          </div>
          <div className="swim-lane-wrapper col-md-4">
            <div className="swim-lane-header-wrapper">
              <h5 className="swim-lane-header">Working</h5>
            </div>
            <div className="swim-lane-body-wrapper">
              {todosList
                .filter(todo => todo.status === "working")
                .map(todo => (
                  <TodoCard todo={todo} setTodo={() => setTodo(todo)} />
                ))}
            </div>
          </div>
          <div className="swim-lane-wrapper col-md-4">
            <div className="swim-lane-header-wrapper">
              <h5 className="swim-lane-header">Completed</h5>
            </div>
            <div className="swim-lane-body-wrapper other">
              {todosList
                .filter(todo => todo.status === "completed")
                .map(todo => (
                  <TodoCard todo={todo} setTodo={() => setTodo(todo)} />
                ))}
            </div>
          </div>
        </div>

        {todo && (
          <EditTodo
            isOpen={editTodoModal}
            toggle={setTodo}
            userId={user.id}
            todo={todo}
            sprintId={sprint._id}
            totalPoints={todosTotalPoints}
            completedPoints={todosCompletedPoints}
            // updateTodosList={updateTodosList}
            // sprintsList={sprintsList}
          />
        )}
      </div>
    </div>
  );
}
