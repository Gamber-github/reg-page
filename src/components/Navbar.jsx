import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

function Navbar() {
  const { user } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLogged") === "true" ? true : false);
  }, [user]);

  return (
    <>
      <nav className="navigation">
        <ul className="menu">
          <li className="menu-item">
            <Link to="/">Home</Link>
          </li>
          {isLoggedIn ? (
            <li className="menu-item">
              <Link to="/dashboard">Dashboard</Link>
            </li>
          ) : (
            <>
              <li className="menu-item">
                <Link to="/login">Login</Link>
              </li>
              <li className="menu-item">
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
