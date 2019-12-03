import React, { useState } from "react";
import AUTH from "../../utils/AUTH";
import { Redirect, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./style.css";

export default function Login({ authenticated, setAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleLogin = () => {
    const user = { username, password };
    AUTH.login(user).then(res => {
      if (res.status === 200) {
        setAuthenticated(true);
        setRedirect(true);
      }
    });
  };

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to="/backlog" />;
    }
  };

  return (
    <motion.div
      className="Login"
      initial={{ y: 1000 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
    >
      {renderRedirect()}

      <h3 className="form-header" data-test="login-header">
        Login
      </h3>
      <div className="form-wrapper">
        <div className="form-element">
          <h6 className="form-label">Username</h6>
          <input
            id="username"
            className="form-input"
            // placeholder="email/username"
            name="username"
            data-test="login-input-username"
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="form-element">
          <h6 className="form-label">Password</h6>
          <input
            id="password"
            // placeholder="password"
            className="form-input"
            name="password"
            type="password"
            data-test="login-input-password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button
          data-test="login-submit-button"
          id="login-button"
          className="form-button form-options btn btn-primary"
          onClick={() => handleLogin()}
        >
          Submit
        </button>
        <p className="form-options">
          Not registered yet?{" "}
          <Link
            to="/register"
            data-test="login-signup-button"
            id="signup-button"
          >
            Register
          </Link>
        </p>
        {/* <button
        data-test="login-signup-button"
        id="signup-button"
        className="authentication options btn btn-secondary"
      >
        Signup
      </button> */}
      </div>
    </motion.div>
  );
}
