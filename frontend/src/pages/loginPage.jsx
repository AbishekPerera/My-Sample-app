import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const loginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useNavigate();

  const loginfunction = (e) => {
    e.preventDefault();
    // console.log(username, password);

    const userObj = {
      name: username,
      pass: password,
    };

    axios
      .post("http://localhost:8085/api/users/login", userObj)
      .then((res) => {
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        alert("Login Success");
        history("/home");
      })
      .catch((err) => {
        // console.log(err);
        alert(err.response.data.message);
      });
  };
  return (
    <div>
      <div className="main-body text-alighn-center justify-content-center d-flex p-5">
        <h1>Login Page</h1>
      </div>
      <div className="login-form ">
        <form onSubmit={loginfunction}>
          <label htmlFor="name">User Name : </label>
          <input
            name="name"
            type="text"
            required
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password : </label>
          <input
            type="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="bg-primary m-4">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default loginPage;
