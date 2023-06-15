import React, { useState, useMemo, useEffect } from "react";
import "./css/app.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import Login from "./components/Login.jsx";
import Register from "./Register.jsx";
import Home from "./components/Home";
import Navbar from "./Navbar";

import { UserContext } from "./UserContext";

function AppRouter() {
  const [user, setUser] = useState({
    id: null,
    username: "",
    isLogged: false,
  });

  const [isLogged, setIsLogged] = useState(false);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLogged");
    loggedIn === "true" ? setIsLogged(true) : setIsLogged(false);
  }, []);

  return (
    <>
      <UserContext.Provider value={value}>
        <Navbar state={isLogged} />
        <Routes>
          <Route path="/" exact state={isLogged} element={<Home />} />
          <Route path="/login" exact state={isLogged} element={<Login />} />
          <Route
            path="/dashboard"
            state={isLogged}
            exact
            element={<Dashboard />}
          />
          <Route path="/register" exact element={<Register />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default AppRouter;
