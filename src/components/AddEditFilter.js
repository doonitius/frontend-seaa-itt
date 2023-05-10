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
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";

function AddEditFilter(props) {
  const dropdownRef = useRef(null);
  const [advisorList, setAdvisorList] = useState(null);
  const [searchAdvisorInput, setSearchAdvisorInput] = useState("");
  const [selectedAdvisor, setSelectedAdvisor] = useState([]);

  const tagsList = ["Tag 1", "Tag A", "Tag test", "zzz", "test2"];
  const [searchTagsInput, setSearchTagsInput] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const yearsList = ["2018", "2019", "2020", "2021"];
  const [selectedYearOption, setSelectedYearOption] = useState("");
  // const selectorYear = document.querySelector(".custom-selector");
  const [selectedProjectType, setSelectedProjectType] = useState([]);
  const [selectedDegree, setSelectedDegree] = useState([]);
  const [filterData, setFilterData] = useState({
    academic_year: "",
    degree: "",
    project_type: "",
    advisor_id: "",
  });
  // const [applyFilter, setApplyFilter] = useState(false);

  const applyFilter = () => {
    const filterDataString = JSON.stringify(filterData);
    localStorage.setItem("filterData", filterDataString);

    props.filterApply();
  };

  const handleFilterDataChange = (event) => {
    // const { target } = event;
    // const { name } = target;
    // if (
    //   name == "academic_year" ||
    //   name == "degree" ||
    //   name == "project_type" ||
    //   name == "advisor_id"
    // ) {
    //   setFilterData({
    //     ...filterData,
    //     [name]: event.target.value,
    //   });
    // }
  };

  // const confirmFilter = () => {
  //   setFilterData({
  //     ...filterData,
  //     academic_year: selectedYearOption ?? "",
  //     degree: selectedDegree[0] ?? "",
  //     project_type: selectedProjectType[0] ?? "",
  //     advisor_id: selectedAdvisor[0] ?? "",
  //   });

  //   console.log("FUK");
  // };

  useEffect(() => {
    setFilterData((prevState) => ({
      ...filterData,
      academic_year: selectedYearOption ?? "",
      degree: selectedDegree[0] ?? "",
      project_type: selectedProjectType[0] ?? "",
      advisor_id: selectedAdvisor[0] ?? "",
    }));
  }, [
    selectedYearOption,
    selectedDegree,
    selectedProjectType,
    selectedAdvisor,
  ]);

  // useEffect(() => {
  //   setFilterData((prevState) => ({
  //     ...filterData,
  //     academic_year: selectedYearOption ?? "",
  //     degree: selectedDegree[0] ?? "",
  //     project_type: selectedProjectType[0] ?? "",
  //     advisor_id: selectedAdvisor[0] ?? "",
  //   }));
  //   console.log("confirmFilter change");
  // }, [applyFilter]);z

  useEffect(() => {
    const storedFilterDataString = localStorage.getItem("filterData");
    const storedFilterData = storedFilterDataString
      ? JSON.parse(storedFilterDataString)
      : null;
    setFilterData(storedFilterData);
    setSelectedAdvisor([storedFilterData.advisor_id]);
    setSelectedDegree(storedFilterData.degree);
    setSelectedYearOption(storedFilterData.academic_year);
    setSelectedProjectType(storedFilterData.project_type);
  }, []);

  // useEffect(() => {
  //   const filterDataString = JSON.stringify(filterData);
  //   localStorage.setItem("filterData", filterDataString);
  // }, [filterData]);

  // useEffect(() => {
  //   const saveFilterData = async () => {
  //     const filterDataString = JSON.stringify(filterData);
  //     await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating an asynchronous operation

  //     localStorage.setItem("filterData", filterDataString);
  //   };

  //   saveFilterData();
  // }, [applyFilter]);

  // const printAllSelected = () => {
  //   console.log(
  //     "print all selected: \n" +
  //       "Year: " +
  //       selectedYearOption +
  //       "\n" +
  //       "Degree: " +
  //       selectedDegree +
  //       "\n" +
  //       "PJtype: " +
  //       selectedProjectType +
  //       "\n" +
  //       "Advisor: " +
  //       selectedAdvisor +
  //       "\n" +
  //       "tags: " +
  //       selectedTags +
  //       "\n"
  //   );
  // };

  const handleResetFilter = () => {
    setSelectedYearOption("");
    setSelectedAdvisor([]);
    setSelectedTags([]);
    setSelectedProjectType([]);
    setSelectedDegree([]);
  };

  const handleProjectTypeChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedProjectType((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedProjectType((prevSelected) =>
        prevSelected.filter((selected) => selected !== value)
      );
    }
  };

  const handleDegreeChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedDegree((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedDegree((prevSelected) =>
        prevSelected.filter((selected) => selected !== value)
      );
    }
  };

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

    // console.log("(add value advisor) : " + value);
  };

  const handleSelectTags = (value) => {
    if (!selectedTags.includes(value)) {
      setSelectedTags((prevSelectedTags) => [...prevSelectedTags, value]);
    } else {
      console.log("already select this tag");
    }

    // console.log("(add value tags) : " + value);
  };
  const handleYearChange = (event) => {
    // console.log("add year : " + event.target.value);
    setSelectedYearOption(event.target.value);
  };
  function deleteSelectAdvisor(index) {
    const newSelectedAdvisor = [...selectedAdvisor];
    // console.log("selectAdvisortodel : " + selectedAdvisor[index]);
    newSelectedAdvisor.splice(index, 1);
    setSelectedAdvisor(newSelectedAdvisor);
    // console.log("after del advisor : " + newSelectedAdvisor);
  }

  function deleteSelectTags(index) {
    const newSelectedTags = [...selectedTags];
    // console.log("selectedTagstodel : " + selectedTags[index]);
    newSelectedTags.splice(index, 1);
    setSelectedTags(newSelectedTags);
    // console.log("after del Tags : " + newSelectedTags);
  }

  const handleFilterYear = (event) => {
    props.setFilterYear(event.target.value);
  };

  const handleFilterDegree = (event) => {
    props.setFilterDegree(event.target.value);
  };

  const handleFilterProjectType = (event) => {
    props.setFilterProjectType(event.target.value);
  };

  return (
    <div className="popup">
      <div className="filter-popup">
        <div className="popup-header justify-between items-center py-1 px-8">
          <div>
            <span className="hightlight-gray text-lg">Search Filter</span>
          </div>
          <div className="flex items-center space-x-3 p-2 w-100">
            <FontAwesomeIcon
              className="fa-xl self-center"
              icon={faXmarkCircle}
              onClick={props.closePopup}
              style={{ color: "white" }}
            />
          </div>
        </div>
        <div className="popup-content space-y-4 " style={{ height: "70vh" }}>
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
                  onChange={(e) => {
                    handleYearChange(e);
                    handleFilterDataChange(e);
                  }}
                  name="academic_year"
                >
                  <option value="">--Select Year--</option>
                  {yearsList.map((option) => (
                    <option value={`${option}`}> Year {option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex mb-2">
              <div className="basis-1/4">Degree :</div>
              <div className="basis-3/4 ">
                <div className="flex pb-2">
                  <div className="pr-10 flex items-center">
                    <input
                      type="checkbox"
                      id="master's degree"
                      name="degree"
                      value="master's degree"
                      checked={selectedDegree.includes("master's degree")}
                      onChange={(e) => {
                        handleDegreeChange(e);
                        handleFilterDataChange(e);
                      }}
                    />
                    <label for="html">Master's degree</label>
                  </div>
                  <div className=" flex items-center">
                    <input
                      type="checkbox"
                      id="bachelor's degree"
                      name="degree"
                      value="bachelor's degree"
                      checked={selectedDegree.includes("bachelor's degree")}
                      onChange={(e) => {
                        handleDegreeChange(e);
                        handleFilterDataChange(e);
                      }}
                    />
                    <label for="html">Bachelor's degree</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex mb-2">
              <div className="basis-1/4">Project type :</div>
              <div className="basis-3/4 ">
                <div className="flex pb-2">
                  <div className="pr-10 flex items-center">
                    <input
                      type="checkbox"
                      id="Thesis"
                      name="project_type"
                      value="Thesis"
                      checked={selectedProjectType.includes("Thesis")}
                      onChange={(e) => {
                        handleProjectTypeChange(e);
                        handleFilterDataChange(e);
                      }}
                    />
                    <label for="html">Thesis project</label>
                  </div>
                  <div className=" flex items-center">
                    <input
                      type="checkbox"
                      id="senior"
                      name="project_type"
                      value="Senior"
                      checked={selectedProjectType.includes("Senior")}
                      onChange={(e) => {
                        handleProjectTypeChange(e);
                        handleFilterDataChange(e);
                      }}
                    />
                    <label for="html">Senior project</label>
                  </div>
                </div>
                <div className="pr-10 flex items-center flex-warp">
                  <input
                    type="checkbox"
                    id="Work-Integrated Learning"
                    name="project_type"
                    value="Work-Integrated Learning"
                    checked={selectedProjectType.includes(
                      "Work-Integrated Learning"
                    )}
                    onChange={(e) => {
                      handleProjectTypeChange(e);
                      handleFilterDataChange(e);
                    }}
                  />
                  <label for="html">Work-Integrated Learning project</label>
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
                      <div className="popup-input-area flex items-center space-x-3 w-full h-8">
                        <input
                          type="text"
                          className="popup-input pl-3 outline-none"
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
                              onClick={() => {
                                handleSelectAdvisor(advisor._id);
                                handleFilterDataChange(advisor._id);
                              }}
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
          {/* <fieldset className="overlay-filter-area">
            <legend className="hightlight-blue text-lg">Tags</legend>
            <div className="flex mb-5">
              <div className="basis-1/4">Search To Add :</div>
              <div className="basis-3/4">
                <div className=" items-center space-x-3 ">
                  <div className="items-center">
                    <div className="flex">
                      <div className="popup-input-area flex items-center space-x-3 w-full h-8">
                        <input
                          type="text"
                          className="outline-none popup-input pl-3"
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
          </fieldset> */}
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
        <div className="popup-tailer justify-between items-center py-1 px-8">
          <div></div>
          <div className="flex items-center space-x-3 p-2 w-100">
            <div
              className="border-2 rounded-lg px-3 py-2 text-sm"
              onClick={handleResetFilter}
            >
              Reset Change
            </div>
            <button
              className="blue-button text-sm py-2 px-4 w-28"
              onClick={() => {
                props.closePopup();
                // printAllSelected();
                applyFilter();
                // setApplyFilter(true);
              }}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
export default AddEditFilter;