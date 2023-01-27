import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logoForBlack2 from '../images/Logo_ForBlack2.png'
import logoForWhite1 from '../images/Logo_ForWhite1.png'
import userIcon from '../images/user-icon.png'
import lockIcon from '../images/lock-icon.png'
import '../App.css';
// import homePage from './HomePage.js'

function LoginPage() {
  return (
    <div>
      <div className="loginPage">
        <div className="navBar-loginPage">
            <img src={logoForBlack2} alt="" className="w-36 object-contain"/>
        </div>
        <div className="loginBox">
          <div className='login-space'>
            <label className='loginBox-head'>Login</label>
            <form className='pb-5 pt-4'>
              <label for="email" className='loginBox-inputHead'>KMUTT Email account</label><br/>
              <div className='loginBox-inputSpace'>
                <img src={userIcon} alt="" className="w-4 object-contain mr-3"/>
                <input placeholder="Name@mail.kmutt.ac.th"/>
              </div>
              <label for="password" className='loginBox-inputHead'>Password</label><br/>
              <div className='loginBox-inputSpace'>
                <img src={lockIcon} alt="" className="w-4 object-contain mr-3"/>
                <input placeholder="Password"/>
              </div>
            </form>
            <button className='black-button'>Log in</button>
          </div>
          <div className='web-introduce-space'>
              <img src={logoForWhite1} alt="" className="w-40 pr-3.5 object-contain"/>
              <label className='text-left'><span className='hightlight-blue'>Seaa itt</span> stands for Search Engine and Artificial Intelligence Tags Tracker which work in collecting the CPE project documents in the form of website for searching. This will collect projects for the Computer Engineering Department, Faculty of Engineering, Kingmongkut’s University of Technology Thonburi in the past year.</label>
          </div>
        </div>
        <div className="navBar-bottom"/>
      </div>
    </div>
  );
}

export default LoginPage;
