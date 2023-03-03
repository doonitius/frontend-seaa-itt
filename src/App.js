// import React, { Component } from "react";
import {  Route, Link, Routes } from "react-router-dom";
import Login from "./pages/LoginPage"
import Home from "./pages/HomePage"
import './App.css';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const baseURL = "{{url}}/project/63a01bb05e3f4a14e4790d7b"
// const baseURL = "http://localhost:3000/project/63a01bb05e3f4a14e4790d7b"

// const Login = () => (
//   <div>
//     <h2>I'm Login</h2>
//   </div>
// )

// const Home = () => (
//   <div>
//     <h2>I'm Home</h2>
//   </div>
// )

const NotFound = () => (
  <div>
    <h2>Page not found.</h2>
  </div>
)

function App() {

  // const [ post, setPost ] = useState(null);

  // useEffect(() => {
  //   axios.get(baseURL).then((response) => {
  //     setPost(response.data);
  //     console.log(response.data);
  //   });
  // }, []);

  return (
    <div>
      <nav>
        {/* <ul>
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/home">Home</Link>
          </li>
        </ul> */}
      </nav>
      <Routes>
        <Route exact path="/" element={<Login />}/>
        <Route exact path="/home" element={<Home />}/>
        <Route exact path="/*" element={<NotFound />}/>
      </Routes>
      
    </div>
  );
}

export default App;
