import React, { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "../css/login.css";
import Axios from "axios";
import { UserContext } from "./UserContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  useEffect(() => {
    const localData = localStorage.getItem("isLogged");
    localData === "true" ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [user]);

  //TODO: Change login methos to work in Form.
  const login = async () => {
    try {
      const response = await Axios.post("http://localhost:3001/user/login", {
        username: username,
        password: password,
      });
      setUser({
        id: response.data[0].id,
        username: response.data[0].username,
      });
      await localStorage.setItem("isLogged", true);
    } catch (err) {
      if (err?.response.status === 404) {
        setErrMsg("User does not exist in the system.");
      }
      if (err?.response.status === 401) {
        setErrMsg("Wrong username password combination.");
      }
    }
  };

  if (isLoggedIn === true) {
    return <Navigate to="/dashboard" />;
  } else {
    return (
      <>
        <div className="container">
          <div className="login">
            <h2 className="login--header font-large"> Login</h2>
            <p className={errMsg ? "errmsg" : "offscreen"}> {errMsg}</p>
            <input
              type="text"
              placeholder="Username"
              className="login--input"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              className="login--input"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button className="login--button" onClick={login}>
              Login
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
