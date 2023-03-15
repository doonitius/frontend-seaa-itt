// const inputFilter = () => (
//     <div className="filter-input-area">
//         <div>
//             <input type="radio" name="Advisor Filter" value="Option 1"/> Asst. Prof. Dr. Santitham
//         </div>
//     </div>
// )
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

function AddEditFilter(props) {
  const options = [1, 2, 3, 4, 5];

  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const selectorYear = document.querySelector(".custom-selector");
  const selectedYear = ["2019", "2020", "2023"];

  const selectedAdvisor = [
    "Aj. AAA",
    "Aj. BBBBBBB",
    "Aj. CCCCCCCCCCCC",
    "testttttttttttttttttt",
    "testtttt",
  ];

  selectorYear.children[0].addEventListener("change", (e) => {
    if (!selectedYear.includes(e.target.value)) {
      selectedYear.push(e.target.value);
    }
  });

  return (
    <div className="popup">
      <div className="filter-popup">
        <div className="popup-header justify-between items-center py-3 px-8">
          <div>
            <span className="hightlight-gray text-lg">
              Filter&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            Years
            <span className="hightlight-blue">&nbsp;/&nbsp;</span>
            Advisors
            <span className="hightlight-blue">&nbsp;/&nbsp;</span>
            Tags
          </div>
          <div className="flex items-center space-x-3 p-2 w-100">
            <div
              className="border-2 rounded-lg px-3 py-2 text-sm"
              onClick={props.closePopup}
            >
              Cancel Change
            </div>
            <button
              className="blue-button text-sm py-2 px-4 w-28"
              onClick={props.closePopup}
            >
              Confirm
            </button>
          </div>
        </div>
        <div className="popup-content space-y-4" style={{ height: "500px" }}>
          <fieldset className="overlay-filter-area">
            <legend className="hightlight-blue text-lg">Year</legend>
            <div className="flex mb-5">
              <div className="basis-1/4">Search To Add :</div>
              <div className="basis-3/4">
                <select
                  className="custom-selector"
                  value={selectedOption}
                  onChange={handleOptionChange}
                >
                  <option value="">--Select Year--</option>
                  {options.map((option) => (
                    <option value={`Option ${option}`}> Year {option}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex">
              <div className="basis-1/4">Selected :</div>
              <div className="basis-3/4 selected-filter-area">
                <div className="selected-list-area">
                  {selectedYear.map((item, index) => (
                    <div
                      className="selected-filter flex items-center mr-5"
                      key={index}
                    >
                      <div className="px-5"> {item} </div>
                      <FontAwesomeIcon className="pr-3" icon={faXmark} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* <div className="filter-input-area">
                                {options.map((option) => 
                                    <div className="flex items-center">
                                        <input 
                                        type={`${props.adminAction === false ? "checkbox" : "radio"}`} 
                                        name="Year choice" 
                                        value={`Option ${option}`}
                                        /> 
                                        year {option}
                                    </div>
                                )}
                            </div> */}
          </fieldset>

          <fieldset className="overlay-filter-area">
            <legend className="hightlight-blue text-lg">Advisor</legend>
            <div className="flex mb-5">
              <div className="basis-1/4">Search To Add :</div>
              <div className="basis-3/4">
                <div className="search-filter-input-area items-center space-x-3 w-fill">
                  <FontAwesomeIcon
                    className="search-filter-icon fa-sm"
                    icon={faMagnifyingGlass}
                  />
                  <input
                    className="search-filter-input"
                    placeholder="Search Advisor name for adding."
                  />
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="basis-1/4">Selected :</div>
              <div className="basis-3/4 selected-filter-area">
                <div className="selected-list-area">
                  {selectedAdvisor.map((item, index) => (
                    <div
                      className="selected-filter flex items-center mr-5"
                      key={index}
                    >
                      <div className="px-5"> {item} </div>
                      <FontAwesomeIcon className="pr-3" icon={faXmark} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset className="overlay-filter-area">
            <legend className="hightlight-blue text-lg mb-4">Advisor</legend>
            <div className="filter-input-area">
              {options.map((option) => (
                <div className="flex items-center">
                  <input
                    type={`${
                      props.adminAction === false ? "checkbox" : "radio"
                    }`}
                    name="Advisor choice"
                    value={`Option ${option}`}
                  />
                  AdvisorName AdvisorLastNameS {option}
                </div>
              ))}
            </div>
          </fieldset>
          <div className="mb-4 mt-8">
            <div className="hightlight-blue text-lg mb-4">Tags</div>
            <div className="filter-input-area">
              {options.map((option) => (
                <div className="flex items-center">
                  <input
                    type={`${
                      props.adminAction === false ? "checkbox" : "radio"
                    }`}
                    name="Tags choice"
                    value={`Option ${option}`}
                  />
                  <span className="hightlight-blue">#</span>
                  <span>Artificial_Intelligence</span>
                  {option}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
export default AddEditFilter;