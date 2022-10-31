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

  return (
    <>
      <UserContext.Provider value={value}>
        <Navbar />
      </UserContext.Provider>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="login"
          element={
            <UserContext.Provider value={value}>
              <Login />
            </UserContext.Provider>
          }
        />
        <Route
          path="dashboard"
          element={
            <UserContext.Provider value={value}>
              <Dashboard />
            </UserContext.Provider>
          }
        />
        <Route path="register" element={<Register />} />
      </Routes>
    </>
  );
}

export default AppRouter;
