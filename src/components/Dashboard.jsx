import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "../Styles/dashboard.css";
import { UserContext } from "./UserContext";

function Dashboard() {
  const { user, setUser } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState("false");

  //FIXME: Make sure that the state is updated and not changed to default
  useEffect(() => {
    const localData = localStorage.getItem("isLogged");
    localData === "true" ? setIsLoggedIn("true") : setIsLoggedIn("false");
    console.log(isLoggedIn);
  }, []);

  //TODO: Change logout method
  const logout = () => {
    setUser({
      id: null,
      username: "",
    });
    localStorage.removeItem("isLogged");
    setIsLoggedIn("false");
  };
  if (isLoggedIn === "false") {
    return <Navigate to="/" />;
  } else {
    return (
      <>
        <h2>ID: {user.id}</h2>
        <h2>Name: {user.username}</h2>
        <h2>Status: {isLoggedIn ? "Logged In" : "Failed"}</h2>

        <button onClick={logout}>Logout</button>
      </>
    );
  }
}

export default Dashboard;
