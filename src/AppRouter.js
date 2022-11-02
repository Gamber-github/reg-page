import React, { useState, useMemo } from "react";
import "./Styles/app.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

import { UserContext } from "./components/UserContext";

function AppRouter() {
  const [user, setUser] = useState({
    id: null,
    username: "",
  });

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  const loggedIn = localStorage.getItem("isLogged");

  return (
    <>
      <UserContext.Provider value={value}>
        <Navbar />
        <Routes>
          <Route path="/" exact element={loggedIn ? <Dashboard /> : <Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="dashboard" exact element={<Dashboard />} />
          <Route path="register" exact element={<Register />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default AppRouter;
