import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import "../Styles/login.css";
import Axios from "axios";
import { UserContext } from "./UserContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const login = () => {
    Axios.post("http://localhost:3001/user/login", {
      username: username,
      password: password,
    }).then((response) => {
      setUser({
        id: response.data[0].id,
        username: response.data[0].username,
        status: "Logged in",
      });
    });
    console.log(user);
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
      <div className="login">
        <h2> Login</h2>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          type="button"
          className="login-btn"
          onClick={async () => {
            await login();
          }}
        >
          Login
        </button>
      </div>
    </>
  );
}

export default Login;
