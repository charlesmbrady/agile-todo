import React from "react";
import ReactDOM from "react-dom";
import Backlog from "./Backlog";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Backlog />, div);
  ReactDOM.unmountComponentAtNode(div);
});
