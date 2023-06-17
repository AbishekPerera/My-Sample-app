import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import axios, { Axios } from "axios";

const HomePage = () => {
  const [mydata, setMyData] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const headers = {
      Authorization: userInfo.token,
    };

    axios
      .get("http://localhost:8085/api/users/", { headers: headers })
      .then((res) => {
        setMyData(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteuser = (id) => {
    // console.log(id);

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const headers = {
      Authorization: userInfo.token,
    };

    axios
      .delete("http://localhost:8085/api/users/" + id, { headers: headers })
      .then((res) => {
        console.log(res.body);
        alert("Done");
        getAllUsers();
      })
      .catch((e) => {
        console.log(e);
        alert("Error");
      });
  };

  return (
    <div>
      <NavBar />
      <div className="homepage-main">
        <div className="homepage-title d-flex text-alighn-center justify-content-center p-1">
          <h3>Home Page</h3>
        </div>

        <hr />
        <Link to={"/adduser"}>
          <Button className="m-3 btn btn-success">Add User</Button>
        </Link>

        <div className="allusertable">
          <Table striped bordered>
            <thead>
              <tr>
                <th>User</th>
                <th>Hash</th>
                <th>Created by</th>
                <th>Updated by</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {mydata.map((element, index) => (
                <tr key={index}>
                  <td>{element.name}</td>
                  <td>{element.pass}</td>
                  <td>{element.createdby}</td>
                  <td>{element.updatedby}</td>
                  <td>
                    <Link to={"/edit/" + element._id}>
                      <Button className="btn btn-primary m-1">Edit</Button>
                    </Link>
                    <Button
                      onClick={() => {
                        deleteuser(element._id);
                      }}
                      className="btn btn-danger m-1"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
