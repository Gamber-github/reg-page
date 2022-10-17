import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import "../Styles/dashboard.css";
import { UserContext } from "./UserContext";

function Dashboard() {
  const { user, setUser } = useContext(UserContext);

  const logout = () => {
    setUser({
      id: null,
      username: "",
      isLogged: false,
    });
  };

  if (user.isLogged === false) {
    return <Navigate to="/" />;
  } else {
    return (
      <>
        <h2>ID: {user.id}</h2>
        <h2>Name: {user.username}</h2>
        <h2>Status: {user.isLogged ? "Logged In" : "Failed"}</h2>

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
