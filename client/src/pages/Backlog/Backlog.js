import React, { useEffect, useState } from "react";
import "./style.css";
import AUTH from "../../utils/AUTH";
import API from "../../utils/API";
import CreateTodo from "./modals/CreateTodo";

export default function Backlog({ setAuthenticated }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    AUTH.checkToken().then(res => {
      if (res.status === 200) {
        // setAuthenticated(true);
        setUser({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          id: res.data.id
        });
      } else {
        setAuthenticated(false);
        setUser({});
      }
    });
  };

  return (
    <div className="backlog-wrapper">
      <h1>Backlog</h1>
      <button>create todo</button>
      <CreateTodo isOpen={} toggle={} userId={} />
    </div>
  );
}
