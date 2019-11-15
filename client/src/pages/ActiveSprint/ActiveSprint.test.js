import React from "react";
import ReactDOM from "react-dom";
import ActiveSprint from "./ActiveSprint";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ActiveSprint />, div);
  ReactDOM.unmountComponentAtNode(div);
});
