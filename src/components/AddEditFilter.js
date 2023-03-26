// const inputFilter = () => (
//     <div className="filter-input-area">
//         <div>
//             <input type="radio" name="Advisor Filter" value="Option 1"/> Asst. Prof. Dr. Santitham
//         </div>
//     </div>
// )
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function AddEditFilter(props) {
  const [advisorList, setAdvisorList] = useState(null);
  const dropdownRef = useRef(null);
  const [searchAdvisorInput, setSearchAdvisorInput] = useState("");
  const [searchTagsInput, setSearchTagsInput] = useState("");
  const [selectedYearOption, setSelectedYearOption] = useState("");
  const selectorYear = document.querySelector(".custom-selector");

  const [selectedAdvisor, setSelectedAdvisor] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  // const advisorList = ["Aj. A", "Aj. B", "Aj. C", "test", "zzz", "abc"];
  const tagsList = ["Tag 1", "Tag A", "Tag test", "zzz", "test2"];
  const yearsList = ["2018", "2019", "2020", "2021"];
  // const project_advisorPrefix = advisorList?.data?.eng.prefix || "loading...";
  // const project_advisorName = advisorList?.data?.eng.first_name || "loading...";
  // const project_advisorMidname = advisorList?.data?.eng.middle_name;
  // const project_AdvisorLastName = advisorList?.data?.eng.last_name;

  useEffect(() => {
    axios
      .get(
        `https://api-seai-general.cyclic.app/general/advisor?search=${searchAdvisorInput}`
      )
      .then((response) => {
        setAdvisorList(response.data);
        console.log(advisorList);
      })
      .catch((error) => console.log(error));
  }, [searchAdvisorInput]);

  function handleSearchAdvisorChange(event) {
    setSearchAdvisorInput(event.target.value);
  }

  function handleSearchTagsChange(event) {
    setSearchTagsInput(event.target.value);
  }

  const handleSelectAdvisor = (value) => {
    if (!selectedAdvisor.includes(value)) {
      setSelectedAdvisor((prevSelectedAdvisor) => [
        ...prevSelectedAdvisor,
        value,
      ]);
    } else {
      console.log("already select this advisor");
    }

    console.log("(add value advisor) : " + value);
  };

  const handleSelectTags = (value) => {
    if (!selectedTags.includes(value)) {
      setSelectedTags((prevSelectedTags) => [...prevSelectedTags, value]);
    } else {
      console.log("already select this tag");
    }

    console.log("(add value tags) : " + value);
  };
  // console.log("setSelectedAdvisor hi : " + selectedAdvisor.join(", "));
  // useEffect(() => {
  // }, [selectedAdvisor]);

  const handleYearChange = (event) => {
    console.log("add year : " + event.target.value);
    setSelectedYearOption(event.target.value);
  };

  // const selectedAdvisor = [
  //   "Aj. AAA",
  //   "Aj. BBBBBBB",
  //   "Aj. CCCCCCCCCCCC",
  //   "testttttttttttttttttt",
  //   "testtttt",
  // ];

  // selectorYear.children[0].addEventListener("change", (e) => {
  //   if (!selectedYear.includes(e.target.value)) {
  //     selectedYear.push(e.target.value);
  //   }
  // });
  function deleteSelectAdvisor(index) {
    const newSelectedAdvisor = [...selectedAdvisor];
    console.log("selectAdvisortodel : " + selectedAdvisor[index]);
    newSelectedAdvisor.splice(index, 1);
    setSelectedAdvisor(newSelectedAdvisor);
    console.log("after del advisor : " + newSelectedAdvisor);
  }

  function deleteSelectTags(index) {
    const newSelectedTags = [...selectedTags];
    console.log("selectedTagstodel : " + selectedTags[index]);
    newSelectedTags.splice(index, 1);
    setSelectedTags(newSelectedTags);
    console.log("after del Tags : " + newSelectedTags);
  }

  return (
    <div className="popup">
      <div className="filter-popup">
        <div className="popup-header justify-between items-center py-1 px-8">
          <div>
            <span className="hightlight-gray text-lg">Add Search Filter</span>
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
        <div className="popup-content space-y-4" style={{ height: "70vh" }}>
          <fieldset className="overlay-filter-area">
            <legend className="hightlight-blue text-lg">
              Project information
            </legend>
            <div className="flex mb-5">
              <div className="basis-1/4">Year :</div>
              <div className="basis-3/4">
                <select
                  className="custom-selector"
                  value={selectedYearOption}
                  onChange={handleYearChange}
                >
                  <option value="">--Select Year--</option>
                  {yearsList.map((option) => (
                    <option value={`Option ${option}`}> Year {option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex mb-2">
              <div className="basis-1/4">Project type :</div>
              <div className="flex basis-3/4 ">
                <div className="pr-10 flex items-center">
                  <input
                    type="checkbox"
                    id="Thesis"
                    name="project_type"
                    value="Thesis"
                  />
                  <label for="html">Thesis project</label>
                </div>
                <div className=" flex items-center">
                  <input
                    type="checkbox"
                    id="senior"
                    name="project_type"
                    value="Senior"
                  />
                  <label for="html">Senior project</label>
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset className="overlay-filter-area">
            <legend className="hightlight-blue text-lg">Advisor</legend>
            <div className="flex mb-5">
              <div className="basis-1/4">Search To Add :</div>
              <div className="basis-3/4">
                <div className=" items-center space-x-3 w-fill">
                  <div className="items-center w-full">
                    <div className="flex w-full">
                      <div className="search-filter-input-area flex items-center space-x-3 w-full h-8">
                        <input
                          type="text"
                          className="search-filter-input pl-3"
                          placeholder="Search Advisor name for adding."
                          value={searchAdvisorInput}
                          onChange={handleSearchAdvisorChange}
                        />
                        <FontAwesomeIcon
                          className="search-filter-icon fa-sm pr-5"
                          icon={faMagnifyingGlass}
                        />
                      </div>
                    </div>
                    <div className="dropdown-searchResult">
                      {advisorList?.data?.length > 0 ? (
                        <div className=" px-2" ref={dropdownRef}>
                          {advisorList?.data?.map((advisor, index) => (
                            <div
                              className="dropdown-searchResult-each"
                              key={advisor._id}
                              onClick={() =>
                                handleSelectAdvisor(
                                  advisor.eng.prefix +
                                    " " +
                                    advisor.eng.full_name
                                )
                              }
                            >
                              <span className="pr-2">
                                {advisorList?.data[index].eng.prefix}
                              </span>
                              <span className="">
                                {advisorList?.data[index].eng.full_name}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="pl-3">No result</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="basis-2/12">Selected :</div>
              <div className="basis-10/12 selected-filter-area">
                <div className="selected-list-area">
                  {selectedAdvisor.map((item, index) => (
                    <div
                      className="selected-filter flex items-center mr-3"
                      key={item}
                    >
                      <div className="px-3"> {item} </div>
                      <FontAwesomeIcon
                        className="pr-3"
                        icon={faXmark}
                        onClick={() => deleteSelectAdvisor(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset className="overlay-filter-area">
            <legend className="hightlight-blue text-lg">Tags</legend>
            <div className="flex mb-5">
              <div className="basis-1/4">Search To Add :</div>
              <div className="basis-3/4">
                <div className=" items-center space-x-3 w-fill">
                  <div className="items-center w-full">
                    <div className="flex w-full">
                      <div className="search-filter-input-area flex items-center space-x-3 w-full h-8">
                        <input
                          type="text"
                          className="search-filter-input pl-3"
                          placeholder="Search Tags for adding."
                          value={searchTagsInput}
                          onChange={handleSearchTagsChange}
                        />
                        <FontAwesomeIcon
                          className="search-filter-icon fa-sm pr-5"
                          icon={faMagnifyingGlass}
                        />
                      </div>
                    </div>
                    <div className="dropdown-searchResult">
                      {
                        <div className=" px-2" ref={dropdownRef}>
                          {tagsList.map((tags, index) => (
                            <div
                              className="dropdown-searchResult-each"
                              key={tags}
                              onClick={() => handleSelectTags(tags)}
                            >
                              <span className="">{tags}</span>
                            </div>
                          ))}
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="basis-2/12">Selected :</div>
              <div className="basis-10/12 selected-filter-area">
                <div className="selected-list-area">
                  {selectedTags.map((item, index) => (
                    <div
                      className="selected-filter flex items-center mr-3"
                      key={index}
                    >
                      <div className="px-3"> {item} </div>
                      <FontAwesomeIcon
                        className="pr-3"
                        icon={faXmark}
                        onClick={() => deleteSelectTags(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </fieldset>
          {/* <fieldset className="overlay-filter-area">
            <legend className="hightlight-blue text-lg">Tags</legend>
            <div className="flex mb-5">
              <div className="basis-1/4">Search To Add :</div>
              <div className="basis-3/4">
                <div className=" items-center space-x-3 w-fill">
                  <SearchBarwithResult
                    dataSet={tagsList}
                    onSelect={(value) => handleSelectTags(value)}
                    placeholderText="Search Tags name for adding"
                  />
                  
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="basis-1/4">Selected :</div>
              <div className="basis-3/4 selected-filter-area">
                <div className="selected-list-area">
                  {selectedTags.map((item, index) => (
                    <div
                      className="selected-filter flex items-center mr-5"
                      key={index}
                    >
                      <div className="px-5"> {item} </div>
                      <FontAwesomeIcon
                        className="pr-3"
                        icon={faXmark}
                        onClick={() => deleteSelectTags(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </fieldset> */}
        </div>
      </div>
    </div>
  );
} 
export default AddEditFilter;