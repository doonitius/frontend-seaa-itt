import logoForBlack2 from "../images/Logo_ForBlack2.png";
import LogoutAlert from "./LogoutAlert";
import { useEffect, useState } from "react";
import { Route, Link, Routes, Navigate } from "react-router-dom";
import AddEditFilter from "./AddEditFilter.js";
import AddEditProject from "./AddEditProject.js";
import InputWIcon from "./InputWIcon";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBars,
  faRightFromBracket,
  faFilter,
  faPlus,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

function Navbar(props) {
  const [popupStatus, setPopupStatus] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [popupComponent, setPopupComponent] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [post, setPost] = useState();
  const [storedAccessToken, setStoredAccessToken] = useState();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const isAdmin = localStorage.getItem("Check_admin");
  const aToken = localStorage.getItem("Access_Token");
  const rToken = localStorage.getItem("Refresh_Token");
  const uName = localStorage.getItem("User_name");
  const [userNameDisplay, setUserNameDisplay] = useState("");

  useEffect(() => {
    setUserNameDisplay(uName);
  }, []);

  function clickExitFromPopup() {
    setPopupStatus(!popupStatus);
  }

  const toggleDropdown = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  async function handleSearchInputChange(event) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    props.setSearchText(event.target.value);
  }

  // const Login = async () => {
  //   // const router = useRouter();
  //   try {
  //     const url = "https://api-seai-general.cyclic.app/general/auth/login";
  //     console.log(
  //       "username pass: " + loginData.username + " + " + loginData.password
  //     );
  //     const response = await axios.post(url, loginData);
  //     setPost(response.data);
  //     console.log(response);
  //     // <Navigate to="/home" />;
  //     // await router.push("/home");
  //     const filterDataString = JSON.stringify(post?.access_token);
  //     localStorage.setItem("Access_Token", filterDataString);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const reloadLocation = () => {
    window.location.reload();
  };

  useEffect(() => {
    const storedUnameDataString = localStorage.getItem("User_Name");
    const uName = storedUnameDataString
      ? JSON.parse(storedUnameDataString)
      : null;
    if (uName) {
      setUserNameDisplay(uName);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      setIsLogin(isAdmin);
    }
  }, []);

  const Register = async () => {
    try {
      const url = "https://api-seai-general.cyclic.app/general/auth/register";
      console.log(
        "username pass: " + loginData.username + " + " + loginData.password
      );
      const response = await axios.post(url, loginData);
      setPost(response.data);

      // Set localStorage immediately after setting the post state
      const accessTokenDataString = JSON.stringify(response.data?.access_token);
      const refreshTokenDataString = JSON.stringify(
        response.data?.refresh_token
      );

      localStorage.setItem("Access_Token", accessTokenDataString);
      localStorage.setItem("Refresh_Token", refreshTokenDataString);
      // localStorage.setItem("Check_admin", isLogin);

      const aToken = localStorage.getItem("Access_Token");
      const rToken = localStorage.getItem("Refresh_Token");
      // const isAdmin = localStorage.getItem("Check_admin");

      console.log("Access_Token: " + aToken);
      console.log("Refresh_Token: " + rToken);
      // console.log("check admin: " + isAdmin);
      setIsLogin(true);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
    reloadLocation();
  };

  const Login = async () => {
    try {
      const url = "https://api-seai-general.cyclic.app/general/auth/login";
      console.log(
        "username pass: " + loginData.username + " + " + loginData.password
      );
      const response = await axios.post(url, loginData);
      setPost(response.data);

      // Set localStorage immediately after setting the post state
      const accessTokenDataString = JSON.stringify(response.data?.access_token);
      const refreshTokenDataString = JSON.stringify(
        response.data?.refresh_token
      );
      const userNameDataString = JSON.stringify(response.data?.username);

      localStorage.setItem("Access_Token", accessTokenDataString);
      localStorage.setItem("Refresh_Token", refreshTokenDataString);
      localStorage.setItem("User_Name", userNameDataString);
      // const isAdmin = localStorage.getItem("Check_admin");

      console.log("Access_Token: " + aToken);
      console.log("Refresh_Token: " + rToken);
      console.log("User_Name: " + uName);
      // console.log("check admin: " + isAdmin);
      setIsLogin(true);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
    reloadLocation();
  };

  useEffect(() => {
    if (isLogin == true) {
      localStorage.setItem("Check_admin", isLogin);
      const isAdmin = localStorage.getItem("Check_admin");
      console.log("check admin: " + isAdmin);
    }
  }, [post]);

  const handleLoginData = (event) => {
    const { target } = event;
    const { name } = target;
    if (name === "username" || name === "password") {
      setLoginData({
        ...loginData,
        [name]: event.target.value,
      });
    }
  };

  const autoEnter = () => {
    setLoginData({
      ...loginData,
      username: "admin_Lnwza",
      password: "Lnwza@1234",
    });
  };
  return (
    <div className="navBar-withSearh">
      {popupStatus && popupComponent === "logout" && (
        <LogoutAlert closePopup={clickExitFromPopup} />
      )}
      {popupStatus && popupComponent === "searchFilter" && (
        <AddEditFilter
          closePopup={clickExitFromPopup}
          filterApply={props.filterFunction}
        />
      )}
      {popupStatus && popupComponent === "addProject" && (
        <AddEditProject closePopup={clickExitFromPopup} addCase={true} />
      )}
      <img src={logoForBlack2} alt="" className="w-32 object-contain" />
      <div className="navBar-withSearch-menu">
        <div
          className={
            props.searchFunction === true ? "w-3/4 items-center pr-4" : "hidden"
          }
        >
          <InputWIcon
            color="blue1"
            icon={faMagnifyingGlass}
            placeholderInput="Search text related to project"
            onChange={handleSearchInputChange}
          />
          {/* <FontAwesomeIcon className="fa-sm" icon={faMagnifyingGlass} />
          <input
            className="pl-1 search-input"
            placeholder="Search text related to project"
            onChange={handleSearchInputChange}
          /> */}
        </div>
        <button
          className={
            props.searchFunction === true
              ? "menu-button-filter space-x-2 items-center"
              : "hidden"
          }
          onClick={() => {
            setPopupStatus(true);
            setPopupComponent("searchFilter");
          }}
        >
          <div>Filter</div>
          <FontAwesomeIcon className="fa-sm justify-center" icon={faFilter} />
        </button>
        <FontAwesomeIcon
          className="fa-xl self-center mr-3 ml-5"
          icon={faBars}
          onClick={toggleDropdown}
          style={{ color: "white" }}
        />
        {isOpenMenu && (
          <ul className="hambergur-menu shadow-md mt-14 py-2  items-center">
            <button
              className="text-sm"
              onClick={() => {
                autoEnter();
              }}
            >
              click 2 auto enter
            </button>

            <div className="px-3 py-2  items-center space-y-2">
              {isLogin ? (
                <div className="text-center py-3">
                  <span className="pr-1">User: </span>
                  <span className="hightlight-blue ">{userNameDisplay}</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="">
                    <span className="text-sm">Username</span>
                    <input
                      className="hambergur-menu-login"
                      placeholder="username"
                      name="username"
                      value={loginData.username}
                      onChange={handleLoginData}
                    />
                  </div>
                  <div className="pb-2">
                    <span className="text-sm">Password</span>
                    <input
                      className="hambergur-menu-login"
                      placeholder="password"
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginData}
                    />
                  </div>
                </div>
              )}

              {!isLogin && (
                <button
                  className="hambergur-menu-login-button"
                  onClick={() => {
                    Login();
                    // reloadLocation();
                  }}
                >
                  Sign in
                </button>
              )}
              {!isLogin && (
                <button
                  className="hambergur-menu-register-button"
                  onClick={() => {
                    // Register();
                  }}
                >
                  Register
                </button>
              )}
              {isLogin && (
                <div className="flex justify-center">
                  <button
                    className="px-3 py-2 flex items-center hambergur-menu-logOut-button"
                    onClick={() => {
                      // Logout();
                      setPopupStatus(true);
                      setPopupComponent("logout");
                    }}
                  >
                    {/* <FontAwesomeIcon
                className="fa-sm  pl-2 justify-center"
                icon={faRightFromBracket}
              /> */}
                    <div className="text-sm ">Log out</div>
                  </button>
                </div>
              )}
            </div>
            {isAdmin && (
              <div className="pt-2">
                <hr className="py-1" />
                <span className="px-3 text-sm">Admin tool:</span>
                <div className=" flex ">
                  <button
                    className="project-menu-add items-center "
                    onClick={() => {
                      setPopupStatus(true);
                      setPopupComponent("addProject");
                    }}
                  >
                    <FontAwesomeIcon
                      className="basis-1/6 justify-center"
                      icon={faPlus}
                    />
                    <div className="basis-5/6">Add New Project</div>
                  </button>
                </div>
              </div>
            )}
            {/* )} */}
            {/* <div
              className={"px-3 py-2 " + (loginStatus == true ? "" : "hidden")}
            >
              hi
            </div> */}

            {/* <div
              className="px-3 py-2 hambergur-menu-list flex items-center"
              onClick={() => {
                setLoginStatus(true);
                setPopupComponent("logout");
              }}
            >
              <FontAwesomeIcon
                className="fa-sm basis-1/5 pl-2 justify-center"
                icon={faRightToBracket}
              />
              <div className="text-sm basis-4/5">Log in</div>
            </div> */}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Navbar;
