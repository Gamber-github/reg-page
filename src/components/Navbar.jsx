import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

function Navbar() {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <nav className="navigation">
        <ul className="menu">
          <li className="menu-item">
            <Link to="/">Home</Link>
          </li>
          {user.isLogged ? (
            <li className="menu-item">
              <Link to="/Dashboard">Dashboard</Link>
            </li>
          ) : (
            <>
              <li className="menu-item">
                <Link to="/Login">Login</Link>
              </li>
              <li className="menu-item">
                <Link to="/Register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
