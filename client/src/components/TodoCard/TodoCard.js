import "./style.css";
import React from "react";
import { motion } from "framer-motion";

export default function TodoCard({ todo, setTodo }) {
  return (
    <motion.div
      className="todo-card-wrapper"
      initial={{ y: 1000 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="todo-card-body-wrapper" onClick={setTodo}>
        <h5>{todo.subject}</h5>
      </div>
      <div className="todo-card-footer-wrapper">
        <p className="todo-card-footer-item">Points: {todo.points}</p>
        <p className="todo-card-footer-item">Priority: {todo.priority}</p>
      </div>
    </motion.div>
  );
}
