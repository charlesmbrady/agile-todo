import React, { useState, useEffect } from "react";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Backlog from "./pages/Backlog/Backlog";
import ActiveSprint from "./pages/ActiveSprint/ActiveSprint";
import Header from "./components/Header/Header";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import AUTH from "./utils/AUTH";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const checkAuth = () => {
    AUTH.checkToken().then(res => {
      if (res.status === 200) {
        setAuthenticated(true);
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

  useEffect(() => {
    checkAuth();
    setLoading(false);
  }, []);

  return (
    <Router>
      <div>
        <Header
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
          setUser={setUser}
        />

        <Switch>
          <Route exact path="/">
            <Home
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          </Route>
          <ProtectedRoute
            path="/dashboard"
            user={user}
            setUser={setUser}
            component={Dashboard}
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            loading={loading}
            setLoading={setLoading}
          />
          <ProtectedRoute
            path="/backlog"
            component={Backlog}
            user={user}
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            loading={loading}
            setLoading={setLoading}
          />
          <ProtectedRoute
            path="/activesprint"
            component={ActiveSprint}
            user={user}
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            loading={loading}
            setLoading={setLoading}
          />
          <Route path="/register">
            <Register
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          </Route>
          <Route path="/login">
            <Login
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
