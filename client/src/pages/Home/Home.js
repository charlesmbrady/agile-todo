import React from "react";
import "./style.css";
import API from "../../utils/API.js";

export default function Home() {
  const ping = () => {
    API.ping().then(response => {
      console.log(response);
    });
  };
  return (
    <div>
      <p> put starter info here </p>
      <button onClick={() => ping()}>Ping</button>
    </div>
  );
}
