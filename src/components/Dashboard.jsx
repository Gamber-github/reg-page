import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "../Styles/dashboard.css";
import { UserContext } from "./UserContext";

function Dashboard() {
  const { user, setUser } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const localData = localStorage.getItem("isLogged");
    localData === "true" ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [user]);

  //Tym sie nie przejmuj bo jest do poprawy
  const logout = () => {
    const localData = localStorage.getItem("isLogged");
    setUser({
      id: null,
      username: "",
    });
    localStorage.removeItem("isLogged");
  };

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

export default Dashboard;
