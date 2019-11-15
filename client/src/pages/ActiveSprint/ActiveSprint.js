import React, { useEffect } from "react";
import "./style.css";
import AUTH from "../../utils/AUTH";
import API from "../../utils/API";

export default function ActiveSprint() {
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
    <div>
      <h1>ActiveSprint</h1>
    </div>
  );
}
