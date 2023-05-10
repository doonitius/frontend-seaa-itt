import logoForBlack2 from "../images/Logo_ForBlack2.png";
import LogoutAlert from "./LogoutAlert";
import { useState } from "react";
import AddEditFilter from "./AddEditFilter.js";
import AddEditProject from "./AddEditProject.js";
import InputWIcon from "./InputWIcon";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBars,
  faRightFromBracket,
  faFilter,
  faPlus,
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
          <ul className="hambergur-menu shadow-md mt-14 py-2 px-1 items-center">
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
            <div
              className="px-3 py-2 hambergur-menu-list flex items-center"
              onClick={() => {
                setPopupStatus(true);
                setPopupComponent("logout");
              }}
            >
              <FontAwesomeIcon
                className="fa-sm basis-1/5 pl-2 justify-center"
                icon={faRightFromBracket}
              />
              <div className="text-sm basis-4/5">Log out</div>
            </div>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Navbar;
