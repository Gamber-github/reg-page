import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "../Styles/dashboard.css";
import { UserContext } from "./UserContext";

function Dashboard() {
  const { user, setUser } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //wyjaśniena są w Navbar.jsx

    // tak to wyglądało
    //pobieram dane z local storage
    const localData = localStorage.getItem("isLogged");
    //sprawdzam wartosc bo domyslnie zapisywana jest jako string
    if (localData === "true") {
      //zmienam state z false na true
      setIsLoggedIn(true);
      //Problem jest ze jak tutaj dam console log i nawet to widac po zachowaniu stanu, status jest ciagle FALSE a nie TRUE jak chce ustawic.
    }
  }, [user]);

  //Tym sie nie przejmuj bo jest do poprawy
  const logout = () => {
    setUser({
      id: null,
      username: "",
    });
    //Jedynie to działa tak jak bym chciał
    localStorage.setItem("isLogged", false);
  };

  if (isLoggedIn === "false") {
    return <Navigate to="/" />;
  } else {
    return (
      <>
        <h2>ID: {user.id}</h2>
        <h2>Name: {user.username}</h2>
        <h2>Status: {isLoggedIn ? "Logged In" : "Failed"}</h2>

        <button
          onClick={async () => {
            await logout();
          }}
        >
          Logout
        </button>
      </>
    );
  }
}

export default Dashboard;
