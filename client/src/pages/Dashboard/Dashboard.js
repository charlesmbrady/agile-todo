import React, { useEffect } from "react";
import "./style.css";
import AUTH from "../../utils/AUTH";
import API from "../../utils/API";

export default function Dashboard() {
  useEffect(() => {
    AUTH.checkToken().then(res => {
      console.log(res);
    });
  });
  const createDecision = () => {
    API.createDecision().then(res => {
      console.log(res);
    });
  };
  const ping = () => {
    API.ping().then(res => {
      console.log(res);
    });
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => ping()}>Ping</button>
      <button onClick={() => createDecision()}>Create Decision</button>
    </div>
  );
}
