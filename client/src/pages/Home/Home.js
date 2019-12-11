import React from "react";
import "./style.css";
import API from "../../utils/API.js";
import MySketch from "./MySketch.js";

export default function Home() {
  const ping = () => {
    API.ping().then(response => {
      console.log(response);
    });
  };
  return (
    <div>
      <MySketch />
      <p> put starter info here </p>
      <button onClick={() => ping()}>Ping</button>
    </div>
  );
}
