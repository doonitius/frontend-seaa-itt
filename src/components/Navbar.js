import logoForBlack2 from "../images/Logo_ForBlack2.png";
import LogoutAlert from "./LogoutAlert";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBars,
  faRightFromBracket,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";

function Navbar(props) {
  const [popupStatus, setPopupStatus] = useState(false);
  const [popupComponent, setPopupComponent] = useState("");

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  function clickExitFromPopup() {
    setPopupStatus(!popupStatus);
  }

  const toggleDropdown = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  function handleSearchInputChange(event) {
    props.setSearchText(event.target.value);
  }

  return (
    <div className="navBar-withSearh">
      {popupStatus && popupComponent === "logout" && (
        <LogoutAlert closePopup={clickExitFromPopup} />
      )}
      <img src={logoForBlack2} alt="" className="w-36 object-contain" />
      <div className="navBar-withSearch-menu">
        <div className="search-input w-3/4 items-center space-x-2">
          <FontAwesomeIcon className="fa-sm" icon={faMagnifyingGlass} />
          <input
            className="pl-1"
            placeholder="Search text related to project"
            onChange={handleSearchInputChange}
          />
        </div>
        <button className="blue-button w-28">
          <div className="items-center">
            <FontAwesomeIcon className="fa-sm pr-2" icon={faMagnifyingGlass} />
            Search
          </div>
        </button>
        <FontAwesomeIcon
          className="fa-xl self-center mr-3 ml-5"
          icon={faBars}
          onClick={toggleDropdown}
          style={{ color: "white" }}
        />
        {isOpenMenu && (
          <ul className="hambergur-menu shadow-md mt-12 py-2 items-center">
            <div
              className="px-3 py-2 hambergur-menu-list flex items-center"
              onClick={() => {
                setPopupStatus(true);
                setPopupComponent("logout");
              }}
            >
              <FontAwesomeIcon
                className="fa-sm basis-1/4 justify-center"
                icon={faBookmark}
              />
              <div className="text-sm basis-3/4">My Bookmarks</div>
            </div>
            <div
              className="px-3 py-2 hambergur-menu-list flex items-center"
              onClick={() => {
                setPopupStatus(true);
                setPopupComponent("logout");
              }}
            >
              <FontAwesomeIcon
                className="fa-sm basis-1/4 justify-center"
                icon={faRightFromBracket}
              />
              <div className="text-sm basis-3/4">Log out</div>
            </div>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Navbar;
