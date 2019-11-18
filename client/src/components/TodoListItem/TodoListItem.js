import "./style.css";
import React from "react";

export default function TodoListItem({ todo, setTodo }) {
  return (
    <tr className="todo-list-item" onClick={setTodo}>
      <td>{todo.type}</td>
      <td>{todo.subject}</td>
      <td>{todo.priority}</td>
      <td>{todo.points}</td>
    </tr>
  );
}
