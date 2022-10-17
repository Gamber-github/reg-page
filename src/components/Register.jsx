import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/register.css";
import Axios from "axios";

function Register() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const register = () => {
    Axios.post("http://localhost:3001/user/register", {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <>
      <nav className="navigation">
        <ul className="menu">
          <li className="menu-item">
            <Link to="/Dashboard">Dashboard</Link>
          </li>
          <li className="menu-item">
            <Link to="/Login">Login</Link>
          </li>
          <li className="menu-item">
            <Link to="/Register">Register</Link>
          </li>
        </ul>
      </nav>

      <div className="registration">
        <h2> Registration</h2>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <button onClick={register}>Register</button>
      </div>
    </>
  );
}

export default Register;
