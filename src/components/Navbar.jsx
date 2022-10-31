import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //Tutaj ma się zmienić navbar w zależności czy dana w local.storage jest true czy false - taki jest zamysł
    // Generalnie to plan jest taki: złapać zmienną, przerobić ja na boolean (bo local.sotrage zapisuje domyslanie jako string)
    // potem uzyc setIsLoggedIn i ustawić jako true, component sie renderuje i mi pokazuje nowy navbar
    //przyklad jest w Dashboard.jsx
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
