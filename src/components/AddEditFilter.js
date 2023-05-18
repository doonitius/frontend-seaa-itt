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
  const [keywordsList, setKeywordsList] = useState(null);
  const [searchAdvisorInput, setSearchAdvisorInput] = useState("");
  const [searchKeywordsInput, setSearchKeywordsInput] = useState("");
  const [selectedAdvisor, setSelectedAdvisor] = useState([]);
  const [selectedAdvisorName, setSelectedAdvisorName] = useState([]);

  const tagsList = ["Tag 1", "Tag A", "Tag test", "zzz", "test2"];
  const [searchTagsInput, setSearchTagsInput] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const yearsList = ["2018", "2019", "2020", "2021"];
  const [selectedYearOption, setSelectedYearOption] = useState("");
  // const selectorYear = document.querySelector(".custom-selector");
  const [selectedProjectType, setSelectedProjectType] = useState([]);
  const [selectedDegree, setSelectedDegree] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [selectedKeywordsName, setSelectedKeywordsName] = useState([]);
  const [filterData, setFilterData] = useState({
    academic_year: "",
    degree: "",
    project_type: "",
    advisor_id: [""],
    advisor_name: [""],
    keywords: [""],
    keywords_name: [""],
  });
  const aToken = localStorage.getItem("Access_Token");
  const rToken = localStorage.getItem("Refresh_Token");
  // const [applyFilter, setApplyFilter] = useState(false);

  const applyFilter = () => {
    // deleteSpace();
    const filterDataString = JSON.stringify(filterData);
    localStorage.setItem("filterData", filterDataString);
    props.filterApply();
  };

  // const deleteSpace = () => {
  //   filterData.keywords_name?.map(
  //     (keywords, index) =>
  //       (filterData.keywords_name[index] = filterData.keywords_name[
  //         index
  //       ].replace(/ /g, "%20"))
  //   );
  // };

  const handleFilterDataChange = (event) => {
    // const { target } = event;
    // const { name } = target;
    // const currentValue = prevFilterData[name];
    // if (
    //   name == "academic_year" ||
    //   name == "degree" ||
    //   name == "project_type" ||
    //   name == "advisor_id" ||
    //   name == "keywords"
    // ) {
    //   if (currentValue === "") {
    //     return {
    //       ...prevFilterData,
    //       [name]: event.target.value,
    //     };
    //   } else {
    //     return {
    //       ...prevFilterData,
    //       [name]: `${currentValue},${event.target.value}`,
    //     };
    //   };
    // };
  };

  useEffect(() => {
    setFilterData((prevState) => ({
      ...filterData,
      academic_year: selectedYearOption ?? "",
      degree: selectedDegree ?? [""],
      project_type: selectedProjectType ?? [""],
      advisor_id: selectedAdvisor ?? [""],
      advisor_name: selectedAdvisorName ?? [""],
      keywords: selectedKeywords ?? [""],
      keywords_name: selectedKeywordsName ?? [""],
    }));
  }, [
    selectedYearOption,
    selectedDegree,
    selectedProjectType,
    selectedAdvisor,
    selectedKeywords,
  ]);

  // const changeFormatFilterData = (event) => {
  //   const { target } = event;
  //   const { name } = target;

  //   console.log("prevFilterData + name: " + " " + name);

  //   if (
  //     name == "academic_year" ||
  //     name == "degree" ||
  //     name == "project_type" ||
  //     name == "advisor_id" ||
  //     name == "keywords"
  //   )
  //     setFilterData((prevFilterData) => {
  //       const currentValue = prevFilterData[name];
  //       if (currentValue === "") {
  //         return {
  //           ...prevFilterData,
  //           [name]: event.target.value,
  //         };
  //       } else {
  //         return {
  //           ...prevFilterData,
  //           [name]: `${currentValue},${event.target.value}`,
  //         };
  //       }
  //     });

  // const changeFormatFilterDataAdvisor = (event) => {
  //   setFilterData((prevFilterData) => {
  //     const currentValue = prevFilterData.advisor_id;
  //     if (currentValue === "") {
  //       return {
  //         ...prevFilterData,
  //         advisor_id: event.target.value,
  //       };
  //     } else {
  //       return {
  //         ...prevFilterData,
  //         advisor_id: `${currentValue},${event.target.value}`,
  //       };
  //     }
  //   });

  //   console.log("prevFilterData + name: " + filterData.advisor_id);
  // };

  useEffect(() => {
    const storedFilterDataString = localStorage.getItem("filterData");
    const storedFilterData = storedFilterDataString
      ? JSON.parse(storedFilterDataString)
      : null;
    if (storedFilterData) {
      setFilterData(storedFilterData);
      console.log("เข้ามาทำไมเห้ย");
      if (storedFilterData.advisor_id) {
        setSelectedAdvisor(storedFilterData.advisor_id);
      }
      if (storedFilterData.degree) {
        setSelectedDegree(storedFilterData.degree);
      }
      if (storedFilterData.academic_year) {
        setSelectedYearOption(storedFilterData.academic_year);
      }
      if (storedFilterData.project_type) {
        setSelectedProjectType(storedFilterData.project_type);
      }
      if (storedFilterData.advisor_name) {
        setSelectedAdvisorName(storedFilterData.advisor_name);
      }
      if (storedFilterData.keywords) {
        setSelectedKeywords(storedFilterData.keywords);
      }
      if (storedFilterData.keywords_name) {
        setSelectedKeywordsName(storedFilterData.keywords_name);
      }
    }
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

  const printAllSelected = () => {
    console.log(
      "print all selected: \n" +
        "Year: " +
        selectedYearOption +
        "\n" +
        "Degree: " +
        selectedDegree +
        "\n" +
        "PJtype: " +
        selectedProjectType +
        "\n" +
        "Advisor: " +
        selectedAdvisor +
        "\n" +
        "tags: " +
        selectedTags +
        "\n"
    );
  };

  const handleResetFilter = () => {
    setSelectedYearOption("");
    setSelectedAdvisor([]);
    setSelectedAdvisorName([]);
    setSelectedTags([]);
    setSelectedProjectType([]);
    setSelectedDegree([]);
    setSelectedKeywords([]);
    setSelectedKeywordsName([]);
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
        `https://api-seai-general-nn2mkxpf6q-as.a.run.app/general/advisor?search=${searchAdvisorInput}`,
        {
          headers: {
            access_token: aToken,
            refresh_token: rToken,
          },
        }
      )
      .then((response) => {
        setAdvisorList(response.data);
        console.log(advisorList);
      })
      .catch((error) => console.log(error));
  }, [searchAdvisorInput]);

  useEffect(() => {
    axios
      .get(
        `https://api-seai-general-nn2mkxpf6q-as.a.run.app/general/keyword?search=${searchKeywordsInput}`,
        {
          headers: {
            access_token: aToken,
            refresh_token: rToken,
          },
        }
      )
      .then((response) => {
        setKeywordsList(response.data);
        console.log(advisorList);
      })
      .catch((error) => console.log(error));
  }, [searchKeywordsInput]);

  function handleSearchAdvisorChange(event) {
    setSearchAdvisorInput(event.target.value);
  }

  function handleSearchKeywordsChange(event) {
    setSearchKeywordsInput(event.target.value);
  }

  const handleKeywordsChange = (value) => {
    if (!selectedKeywords.includes(value)) {
      setSelectedKeywords((prevSelectedKeywords) => [
        ...prevSelectedKeywords,
        value,
      ]);
    } else {
      console.log("already select this keyword");
    }
  };

  const handleKeywordsNameChange = (value) => {
    if (!selectedKeywordsName.includes(value)) {
      setSelectedKeywordsName((prevSelectedKeywordsName) => [
        ...prevSelectedKeywordsName,
        value,
      ]);
    } else {
      console.log("already select this keywordName");
    }
  };

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

  const handleSelectAdvisorName = (value) => {
    if (!selectedAdvisorName.includes(value)) {
      setSelectedAdvisorName((prevSelectedAdvisor) => [
        ...prevSelectedAdvisor,
        value,
      ]);
    } else {
      console.log("already select this advisorName");
    }
    // console.log("(add value advisor) : " + value);
  };

  // const spitSelectAdvisor = (value) => {
  //   const splitValue = value.spit("/");
  //   const partName = splitValue[0];
  //   const partID = splitValue[1];
  //   if (!selectedAdvisor.includes(partID)) {
  //     setSelectedAdvisor((prevSelectedAdvisor) => [
  //       ...prevSelectedAdvisor,
  //       partID,
  //     ]);
  //   }

  //   if (!selectedAdvisorName.includes(partName)) {
  //     setSelectedAdvisorName((prevSelectedAdvisorName) => [
  //       ...prevSelectedAdvisorName,
  //       partName,
  //     ]);
  //   } else {
  //     console.log("already select this advisor");
  //   }

  //   // console.log("(add value advisor) : " + value);
  // };

  const handleYearChange = (event) => {
    // console.log("add year : " + event.target.value);
    setSelectedYearOption(event.target.value);
  };

  function deleteSelectKeywords(index) {
    const newSelectedKeywords = [...selectedKeywords];
    newSelectedKeywords.splice(index, 1);
    setSelectedKeywords(newSelectedKeywords);
  }

  function deleteSelectKeywordsName(index) {
    const newSelectedKeywordsName = [...selectedKeywordsName];
    newSelectedKeywordsName.splice(index, 1);
    setSelectedKeywordsName(newSelectedKeywordsName);
  }

  function deleteSelectAdvisor(index) {
    const newSelectedAdvisor = [...selectedAdvisor];
    newSelectedAdvisor.splice(index, 1);
    setSelectedAdvisor(newSelectedAdvisor);
  }

  function deleteSelectAdvisorName(index) {
    const newSelectedAdvisorName = [...selectedAdvisorName];
    newSelectedAdvisorName.splice(index, 1);
    setSelectedAdvisorName(newSelectedAdvisorName);
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
            <span className="hightlight-gray text-lg">Filter</span>
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

            <div className="handle-flex mb-2">
              <div className="basis-1/4 handle-flex-bottom">Degree :</div>
              <div className="basis-3/4 ">
                <div className="handle-flex pb-2">
                  <div className="pr-10 flex items-center">
                    <input
                      type="checkbox"
                      id="master"
                      name="degree"
                      value="master"
                      checked={selectedDegree.includes("master")}
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
                      id="bachelor"
                      name="degree"
                      value="bachelor"
                      checked={selectedDegree.includes("bachelor")}
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

            <div className="handle-flex mb-2">
              <div className="basis-1/4 handle-flex-bottom">Project type :</div>
              <div className="basis-3/4 ">
                <div className="handle-flex">
                  <div className="pr-10 flex items-center">
                    <input
                      type="checkbox"
                      id="thesis"
                      name="project_type"
                      value="thesis"
                      checked={selectedProjectType.includes("thesis")}
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
                      value="senior"
                      checked={selectedProjectType.includes("senior")}
                      onChange={(e) => {
                        handleProjectTypeChange(e);
                        handleFilterDataChange(e);
                      }}
                    />
                    <label for="html">Senior project</label>
                  </div>
                </div>
                <div className=" flex items-center flex-warp">
                  <input
                    type="checkbox"
                    id="wil"
                    name="project_type"
                    value="wil"
                    checked={selectedProjectType.includes("wil")}
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
            <div className="handle-flex mb-5">
              <div className="basis-1/4 handle-flex-bottom">
                Search To Add :
              </div>
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
                              key={index}
                              name="advisor_id"
                              onClick={() => {
                                handleSelectAdvisor(advisor._id);
                                handleSelectAdvisorName(
                                  advisor.eng.prefix +
                                    " " +
                                    advisor.eng.full_name
                                );
                                // changeFormatFilterDataAdvisor(advisor._id);
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
            <div className="handle-flex">
              <div className="basis-2/12 handle-flex-bottom">Selected :</div>
              <div className="basis-10/12 selected-filter-area">
                <div className="selected-list-area">
                  {selectedAdvisorName.map((item, index) => (
                    <div
                      className={
                        "selected-filter flex items-center mr-3 " +
                        (item == "" ? "" : "")
                      }
                      key={item}
                    >
                      <div className="px-3"> {item} </div>
                      <FontAwesomeIcon
                        className="pr-3"
                        icon={faXmark}
                        onClick={() => {
                          deleteSelectAdvisor(index);
                          deleteSelectAdvisorName(index);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset className="overlay-filter-area">
            <legend className="hightlight-blue text-lg">Keywords</legend>
            <div className="handle-flex mb-5">
              <div className="basis-1/4 handle-flex-bottom">
                Search To Add :
              </div>
              <div className="basis-3/4">
                <div className=" items-center space-x-3 w-fill">
                  <div className="items-center w-full">
                    <div className="flex w-full">
                      <div className="popup-input-area flex items-center space-x-3 w-full h-8">
                        <input
                          type="text"
                          className="popup-input pl-3 outline-none"
                          placeholder="Search Keywords for adding."
                          value={searchKeywordsInput}
                          onChange={handleSearchKeywordsChange}
                        />
                        <FontAwesomeIcon
                          className="search-filter-icon fa-sm pr-5"
                          icon={faMagnifyingGlass}
                        />
                      </div>
                    </div>
                    <div className="dropdown-searchResult">
                      {keywordsList?.data?.length > 0 ? (
                        <div className=" px-2" ref={dropdownRef}>
                          {keywordsList?.data?.map((keywords, index) => (
                            <div
                              className="dropdown-searchResult-each"
                              key={index}
                              name="keyword_id"
                              onClick={() => {
                                handleKeywordsChange(keywords._id);
                                handleKeywordsNameChange(keywords.keyword);
                                // changeFormatFilterDataAdvisor(advisor._id);
                              }}
                            >
                              <span className="pr-2">{keywords.keyword}</span>
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
            <div className="handle-flex">
              <div className="basis-2/12 handle-flex-bottom">Selected :</div>
              <div className="basis-10/12 selected-filter-area">
                <div className="selected-list-area">
                  {selectedKeywordsName.map((item, index) => (
                    <div
                      className={
                        "selected-filter flex items-center mr-3 " +
                        (item == "" ? "" : "")
                      }
                      key={item}
                    >
                      <div className="px-3"> {item} </div>
                      <FontAwesomeIcon
                        className="pr-3"
                        icon={faXmark}
                        onClick={() => {
                          deleteSelectKeywords(index);
                          deleteSelectKeywordsName(index);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div className="popup-tailer justify-between items-center py-1 px-8">
          <div></div>
          <div className="flex items-center space-x-3 p-2 w-100">
            <button
              className="border-2 rounded-lg px-3 py-2 text-sm w-15"
              onClick={handleResetFilter}
            >
              Reset Change
            </button>
            <button
              className="blue-button text-sm py-2 px-10 w-28"
              onClick={() => {
                props.closePopup();
                printAllSelected();
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