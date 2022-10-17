import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../Styles/dashboard.css";
import { UserContext } from "./UserContext";

function Dashboard() {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <nav className="navigation">
        <ul className="menu">
          <li className="menu-item">
            <Link to="/Dashboard">Dashboard</Link>
          </li>
          <li className="menu-item">
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>

      <h2>ID: {user.id}</h2>
      <h2>Name: {user.username}</h2>
      <h2>Status: {user.status}</h2>

      <button onClick={null}>Logout</button>
    </>
  );
}

export default Dashboard;
