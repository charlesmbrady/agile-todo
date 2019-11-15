import React, { useState } from "react";
import AUTH from "../../utils/AUTH";
import { Redirect, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./style.css";

export default function Register({ setAuthenticated }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to="/dashboard" />;
    }
  };

  const handleSignup = () => {
    const user = { firstName, lastName, username, password };
    AUTH.signup(user).then(res => {
      if (res.status === 200) {
        setAuthenticated(true);
        setRedirect(true);
      }
    });
  };
  return (
    <motion.div
      initial={{ y: 1000 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
      className="Signup"
    >
      {renderRedirect()}
      <h3 className="form-header" data-test="signup-header">
        Signup
      </h3>

      <div className="form-wrapper">
        <div className="form-element">
          <h6 className="form-label">First Name</h6>
          <input
            id="first-name"
            className="form-input"
            // placeholder="First Name"
            name="firstName"
            data-test="signup-input-first-name"
            onChange={e => setFirstName(e.target.value)}
          />
        </div>

        <div className="form-element">
          <h6 className="form-label">Last Name</h6>
          <input
            id="last-name"
            className="form-input"
            // placeholder="Last Name"
            name="lastName"
            data-test="signup-input-last-name"
            onChange={e => setLastName(e.target.value)}
          />
        </div>

        <div className="form-element">
          <h6 className="form-label">Username</h6>
          <input
            id="username"
            className="form-input"
            // placeholder="Email/Username"
            name="username"
            data-test="signup-input-username"
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div className="form-element">
          <h6 className="form-label">Password</h6>
          <input
            id="password"
            className="form-input"
            // placeholder="Password"
            name="password"
            type="password"
            data-test="signup-input-password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button
          data-test="signup-submit-button"
          id="submit-button"
          className="form-options btn btn-primary"
          onClick={() => handleSignup()}
        >
          Submit
        </button>
        <p className="form-options">
          Already signed up?{" "}
          <Link to="/login" data-test="signup-login-button" id="login-button">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
