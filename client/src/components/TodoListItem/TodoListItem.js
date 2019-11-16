import "./style.css";
import React from "react";

export default function TodoListItem({}) {
  return (
    <tr className="todo-list-item" onClick={() => setTodo(todo)}>
      <td>{todo.type}</td>
      <td>{todo.subject}</td>
      <td>{todo.priority}</td>
      <td>{todo.points}</td>
    </tr>
  );
}
