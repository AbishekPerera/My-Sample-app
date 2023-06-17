import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUSer = () => {
  const [Name, setName] = useState("");
  const [Pass, setPass] = useState("");

  const history = useNavigate();

  const addUserFunction = (e) => {
    e.preventDefault();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const headers = {
      Authorization: userInfo.token,
    };

    const body = {
      name: Name,
      pass: Pass,
    };

    console.log(headers);

    axios
      .post("http://localhost:8085/api/users/", body, { headers: headers })
      .then((res) => {
        console.log(res);
        alert("added successfully");
        history("/home");
      })
      .catch((e) => {
        console.log(e);
        alert("Error");
      });
  };
  return (
    <div>
      <div className="adduser-h1">
        <NavBar />
        <div className="homepage-title d-flex text-alighn-center justify-content-center p-1">
          <h3>Add User Page</h3>
        </div>

        <hr />
        <div className="login-form ">
          <form onSubmit={addUserFunction}>
            <label htmlFor="name">User Name : </label>
            <input
              name="name"
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="password">Password : </label>
            <input
              type="password"
              name="password"
              required
              onChange={(e) => setPass(e.target.value)}
            />

            <Button type="submit" className="bg-success m-4">
              Add
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUSer;
