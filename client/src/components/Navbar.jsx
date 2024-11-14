import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Navbar.module.css";

const Navbar = ({ state, log, setLog }) => {
  const navigate = useNavigate();

  useEffect(() => {
    let auth = localStorage.getItem("user");
    if (auth) {
      setLog(true);
    }
  }, []);

  const LogoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("status");
    localStorage.removeItem("days");
    localStorage.removeItem("weeks");
    setLog(false);
    navigate("/");
  };

  return (
    <div className={classes.main}>
      <button
        className={classes.dashboardbtn}
        onClick={() => {
          navigate("/");
        }}
      >
        {state}
        Home
      </button>
      {log ? (
        <>
          <button
            className={classes.dashboardbtn}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
          <button
            className={classes.dashboardbtn}
            onClick={() => navigate("/textinput")}
          >
            TextInput
          </button>
          <button
            className={classes.dashboardbtn}
            onClick={() => navigate("/voiceinput")}
          >
            VoiceInput
          </button>
          <button className={classes.dashboardbtn} onClick={LogoutHandler}>
            Logout
          </button>
        </>
      ) : (
        <button
          className={classes.dashboardbtn}
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Navbar;
