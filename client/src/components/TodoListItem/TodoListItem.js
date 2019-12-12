import "./style.css";
import React from "react";
import { motion } from "framer-motion";

export default function TodoListItem({ todo, setTodo }) {
  return (
    <motion.tr
      className="todo-list-item"
      onClick={setTodo}
      initial={{ x: 1000 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* <td>{todo.type}</td> */}
      <td>{todo.subject}</td>
      <td>{todo.priority}</td>
      <td>{todo.points}</td>
    </motion.tr>
  );
}
