import React from "react";
import { Route, Link } from "react-router-dom";

export default function ProtectedRoute({
  component: Component,
  path,
  loading,
  authenticated,
  setAuthenticated
}) {
  return (
    <Route
      path={path}
      render={() => {
        if (loading) return <h3 align={"center"}>Validating session...</h3>;
        if (!authenticated) {
          return (
            <div>
              Not authenticated, please <Link to="/login">Login</Link> or{" "}
              <Link to="/register">Register</Link>
            </div>
          );
        }
        return (
          <Component
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        );
      }}
    />
  );
}
