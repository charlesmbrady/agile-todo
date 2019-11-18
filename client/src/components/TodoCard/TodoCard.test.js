import React from "react";
import ReactDOM from "react-dom";
import TodoCard from "./TodoCard";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TodoCard />, div);
  ReactDOM.unmountComponentAtNode(div);
});
