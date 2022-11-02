import React, { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "../Styles/login.css";
import Axios from "axios";
import { UserContext } from "./UserContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const localData = localStorage.getItem("isLogged");
    localData === "true" ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [user]);

  function handleSubmit() {
    Axios.post("http://localhost:3001/user/login", {
      username: username,
      password: password,
    }).then((response) => {
      setUser({
        id: response.data[0].id,
        username: response.data[0].username,
      });
      localStorage.setItem("isLogged", true);
    });
  }

  if (isLoggedIn === true) {
    return <Navigate to="/dashboard" />;
  } else {
    return (
      <>
        <div className="login">
          <form>
            <h2> Login</h2>
            <input
              type="text"
              placeholder="Username"
              className="login_usernameInput"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              className="login_passwordInput"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button className="login-btn" onClick={handleSubmit}>
              Login
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Login;
