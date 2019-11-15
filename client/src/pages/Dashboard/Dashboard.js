import React, { useEffect, useState } from "react";
import "./style.css";
import AUTH from "../../utils/AUTH";
import API from "../../utils/API";

export default function Dashboard({ setAuthenticated }) {
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

  const ping = () => {
    API.ping().then(res => {
      console.log(res);
    });
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => ping()}>Ping</button>
      <button>Get Cookie not functional</button>
    </div>
  );
}
