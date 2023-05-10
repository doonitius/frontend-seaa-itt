import React from "react";
import logoForBlack2 from '../images/Logo_ForBlack2.png'
import logoForWhite1 from '../images/Logo_ForWhite1.png'
import '../App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import InputWIcon from "../components/InputWIcon";

// import homePage from './HomePage.js'

function LoginPage() {
  return (
    <div>
      <div className="loginPage">
        <div className="navBar-loginPage">
          <img src={logoForBlack2} alt="" className="w-36 object-contain" />
        </div>
        <div className="loginBox">
          <div className="login-space">
            <label className="loginBox-head">Login</label>
            <form className="pb-5 pt-4">
              <label for="email" className="loginBox-inputHead">
                KMUTT Email account
              </label>
              <br />

              <InputWIcon
                color="blue1"
                icon={faUser}
                placeholderInput="Name@mail.kmutt.ac.th"
              />
              <br />
              <label for="password" className="loginBox-inputHead">
                Password
              </label>
              <br />
              <InputWIcon
                color="blue1"
                icon={faLock}
                placeholderInput="Password"
              />
            </form>
            <br />
            <a href="/home">
              <button className="black-button">Log in</button>
            </a>
          </div>
          <div className="web-introduce-space">
            <img
              src={logoForWhite1}
              alt=""
              className="w-48 pr-3.5 object-contain"
            />
            <label className="text-left web-intro">
              <span className="hightlight-blue">Seaa itt</span> stands for
              Search Engine and Artificial Intelligence Tags Tracker which work
              in collecting the CPE project documents in the form of website for
              searching. This will collect projects for the Computer Engineering
              Department, Faculty of Engineering, Kingmongkut’s University of
              Technology Thonburi in the past year.
            </label>
          </div>
        </div>
        <div className="navBar-bottom" />
      </div>
    </div>
  );
}

export default LoginPage;
