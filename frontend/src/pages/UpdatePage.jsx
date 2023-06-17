import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePage = () => {
  const id = useParams().id;
  const [MyData, setMyData] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useNavigate();

  const getUserById = () => {
    // console.log(id);

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const headers = {
      Authorization: userInfo.token,
    };

    axios
      .get("http://localhost:8085/api/users/" + id, {
        headers: headers,
      })
      .then((res) => {
        // setMyData(res.data);
        setUsername(res.data.name);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUserById();
  }, []);

  const updateUser = (e) => {
    e.preventDefault();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const headers = {
      Authorization: userInfo.token,
    };

    const body = {
      name: username,
      pass: password,
    };

    axios
      .put("http://localhost:8085/api/users/" + id, body, {
        headers: headers,
      })
      .then((res) => {
        // setMyData(res.data);
        console.log(res.data);
        alert("Success");
        history("/home");
      })
      .catch((e) => {
        console.log(e);
        alert("error");
      });
  };

  return (
    <div>
      <div className="main-body text-alighn-center justify-content-center d-flex p-5">
        <h1>Update Page</h1>
      </div>
      <div className="login-form ">
        <form onSubmit={updateUser}>
          <label htmlFor="name">User Name : </label>
          <input
            name="name"
            type="text"
            required
            defaultValue={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password : </label>
          <input
            type="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" className="bg-primary m-4">
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePage;
