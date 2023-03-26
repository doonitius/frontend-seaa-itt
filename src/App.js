// import React, { Component } from "react";
import {  Route, Link, Routes } from "react-router-dom";
import Login from "./pages/LoginPage"
import Home from "./pages/HomePage"
import ProjectPage from "./pages/ProjectPage";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
// import axios from 'axios';

// const baseURL = "{{url}}/project/63a01bb05e3f4a14e4790d7b"
// const baseURL = "http://localhost:3000/project/63a01bb05e3f4a14e4790d7b"

const NotFound = () => (
  <div>
    <h2>Page not found.</h2>
  </div>
);

function App() {
  const [projectId, setProjectId] = useState("");

  // useEffect(() => {
  //   axios
  //     .get(`https://api-seai-general.cyclic.app/general/project/${projectId}`)
  //     .then((response) => {
  //       setProjectId(response.data._id);
  //     })
  //     .catch((error) => {
  //       console.log("An error occurred while fetching the project data.");
  //       console.log(error);
  //     });
  // }, []);
  return (
    <div>
      <nav></nav>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/*" element={<NotFound />} />
        <Route exact path={"/project/:projectId"} element={<ProjectPage />} />
      </Routes>
    </div>
  );
}

export default App;
