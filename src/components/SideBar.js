import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function SideBar(props) {
  const [advisorList, setAdvisorList] = useState(null);
  const [selectedYearOption, setSelectedYearOption] = useState("");
  const yearsList = ["2018", "2019", "2020", "2021"];
  const [keywordsList, setKeywordsList] = useState(null);
  const [selectedAdvisor, setSelectedAdvisor] = useState([]);
  const [selectedKeywordsName, setSelectedKeywordsName] = useState([]);
  const [filterData, setFilterData] = useState({
    academic_year: "",
    degree: "",
    project_type: "",
    advisor_id: "",
    advisor_name: "",
    keywords: "",
    keywords_name: "",
  });
  const aToken = localStorage.getItem("Access_Token");
  const rToken = localStorage.getItem("Refresh_Token");
  const language = localStorage.getItem("Language");

  const handleKeywordsNameChange = (value) => {
    setFilterData((prevState) => ({
      ...filterData,
      academic_year: "",
      degree: [""],
      project_type: [""],
      advisor_id: [""],
      advisor_name: [""],
      keywords: [""],
      keywords_name: value ?? [""],
    }));
  };

  const handleAdvisorChange = (value) => {
    setFilterData((prevState) => ({
      ...filterData,
      academic_year: "",
      degree: [""],
      project_type: [""],
      advisor_id: value ?? [""],
      advisor_name: [""],
      keywords: [""],
      keywords_name: [""],
    }));
  };

  useEffect(() => {
    const filterDataString = JSON.stringify(filterData);
    localStorage.setItem("filterData", filterDataString);
    props.filterFunction();
  }, [filterData]);

  const handleResetFilter = () => {
    setFilterData((prevState) => ({
      ...filterData,
      academic_year: "",
      degree: [""],
      project_type: [""],
      advisor_id: [""],
      advisor_name: [""],
      keywords: [""],
      keywords_name: [""],
    }));
  };

  useEffect(() => {
    axios
      .get(
        "https://api-seai-general-nn2mkxpf6q-as.a.run.app/general/advisor?search=",
        {
          headers: {
            access_token: aToken,
            refresh_token: rToken,
          },
        }
      )
      .then((response) => {
        console.log("[sidebar] map advisor: ");
        console.log(response);
        setAdvisorList(response.data);
        // console.log(advisorList);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api-seai-general-nn2mkxpf6q-as.a.run.app/general/keyword?search=",
        {
          headers: {
            access_token: aToken,
            refresh_token: rToken,
          },
        }
      )
      .then((response) => {
        console.log("[sidebar] map keywords: ");
        console.log(response);
        setKeywordsList(response.data);
        // console.log("keywordddd " + keywordsList);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="">
      <div className="sidenav space-y-7">
        <div className="px-5 pt-3">
          <button
            className="reset-filter-sideBar"
            onClick={() => handleResetFilter()}
          >
            Set filter to default.
          </button>
        </div>

        <div className="pl-7">
          <span className="hightlight-blue text-lg">Advisor</span>
          {language == "eng" ? (
            <div className="pt-2 pl-5">
              {advisorList?.data?.map((advisor, index) => (
                <div
                  className="quick-filter hover-sidebar"
                  key={advisor._id}
                  onClick={() => {
                    handleAdvisorChange(advisor._id);
                  }}
                >
                  <span className="pr-1">
                    {advisorList?.data[index].eng.prefix}
                  </span>
                  <span className="">
                    {advisorList?.data[index].eng.full_name}
                  </span>
                </div>
              ))}{" "}
            </div>
          ) : (
            <div className="pt-2 pl-5">
              {advisorList?.data?.map((advisor, index) => (
                <div
                  className="quick-filter hover-sidebar"
                  key={advisor._id}
                  onClick={() => {
                    handleAdvisorChange(advisor._id);
                  }}
                >
                  <span className="pr-1">
                    {advisorList?.data[index].thai.prefix}
                  </span>
                  <span className="">
                    {advisorList?.data[index].thai.full_name}
                  </span>
                </div>
              ))}{" "}
            </div>
          )}
        </div>
        <div className="pl-7">
          <span className="hightlight-blue text-lg">Keyword</span>
          <div className="pt-2 pl-5">
            <div className="flex flex-wrap space-y-1 items-center">
              {keywordsList?.data?.map((keywords, index) => (
                <div className="flex flex-wrap items-center">
                  <button
                    className="tagsBox-sidebar items-center mr-1 text-sm"
                    key={keywords._id}
                    name="keywords"
                    onClick={() => {
                      handleKeywordsNameChange(keywords.keyword);
                    }}
                  >
                    <span className="hightlight-blue">#</span>
                    <span>{keywordsList?.data[index].keyword}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
