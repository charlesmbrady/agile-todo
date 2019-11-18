import React, { useEffect, useState } from "react";
import "./style.css";
import AUTH from "../../utils/AUTH";
import API from "../../utils/API";
import TodoCard from "../../components/TodoCard/TodoCard";
import EditTodo from "./modals/EditTodo";

//TODO: add END sprint button

export default function ActiveSprint({ setAuthenticated }) {
  const [user, setUser] = useState({});
  const [todo, setTodo] = useState(null);
  const [todosList, setTodosList] = useState([]);
  const [sprint, setSprint] = useState({});

  //modal
  const [editTodoModal, setEditTodoModal] = useState(true);

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
          setSprint(activeSprintResponse.data[0]);
          setTodosList(activeSprintResponse.data[0].todos);
        });
        //need to get all todos in the active sprint and put them in one Todos list, and render them in swim lanes based on status
        // whenever the state of the todoslist is updated, rerender the swim lanes
      } else {
        setAuthenticated(false);
        setUser({});
      }
    });
  }, [todo]);

  return (
    <div>
      <h1>ActiveSprint</h1>

      <div className="swim-lanes-wrapper">
        <div className="swim-lane-wrapper">
          <div className="swim-lane-header-wrapper"></div>
          <div className="swim-lane-body-wrapper">
            {todosList
              .filter(todo => todo.status == "ready")
              .map(todo => (
                <TodoCard todo={todo} setTodo={() => setTodo(todo)} />
              ))}
          </div>
        </div>
        <div className="swim-lane-wrapper">
          <div className="swim-lane-header-wrapper"></div>
          <div className="swim-lane-body-wrapper">
            {todosList
              .filter(todo => todo.status == "working")
              .map(todo => (
                <TodoCard todo={todo} setTodo={() => setTodo(todo)} />
              ))}
          </div>
        </div>
        <div className="swim-lane-wrapper">
          <div className="swim-lane-header-wrapper"></div>
          <div className="swim-lane-body-wrapper other">
            {todosList
              .filter(todo => todo.status == "completed")
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
          // updateTodosList={updateTodosList}
          // sprintsList={sprintsList}
        />
      )}
    </div>
  );
}
