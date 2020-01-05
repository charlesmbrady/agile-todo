import React from "react";
import "./style.css";
import API from "../../utils/API.js";

export default function Home() {
  return (
    <div>
      <h1 className="home-head home-header-main">Welcome to Agile-Todos</h1>
      <h3 className="home-head home-header-secondary">
        Create and manage your todos list using agile methodologies
      </h3>
    </div>
  );
}
