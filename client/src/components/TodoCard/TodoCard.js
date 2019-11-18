import "./style.css";
import React from "react";

export default function TodoCard({ todo, setTodo }) {
  return (
    <div className="todo-card-wrapper">
      <div className="todo-card-body-wrapper" onClick={setTodo}>
        <h5>{todo.subject}</h5>
      </div>
      <div className="todo-card-footer-wrapper">
        <p className="todo-card-footer-item">Points: {todo.points}</p>
        <p className="todo-card-footer-item">Priority: {todo.priority}</p>
      </div>
    </div>
  );
}
