import React, { useState, useMemo } from "react";
import "./Styles/app.css";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

import { UserContext } from "./components/UserContext";

function AppRouter() {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <>
      <Routes>
        <Route index element={<Leyout />} />

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

function Leyout() {
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
    </>
  );
}
