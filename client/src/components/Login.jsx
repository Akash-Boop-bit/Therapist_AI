import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";

const Login = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [passw, setPassw] = useState();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!email || !name || !passw) {
      return false;
    }
    localStorage.setItem(
      "user",
      JSON.stringify({ name, email, password: passw })
    );
    navigate("/");
  };

  return (
    <div className={classes.main}>
      <h1>Welcome</h1>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="Name"
      />
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Email"
      />
      <input
        type="password"
        onChange={(e) => setPassw(e.target.value)}
        value={passw}
        placeholder="Password"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Login;
