import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function SideBar(props) {
  const [advisorList, setAdvisorList] = useState(null);
  const [selectedYearOption, setSelectedYearOption] = useState("");
  const yearsList = ["2018", "2019", "2020", "2021"];

  const handleYearChange = (event) => {
    // console.log("add year : " + event.target.value);
    setSelectedYearOption(event.target.value);
  };
  useEffect(() => {
    axios
      .get("https://api-seai-general.cyclic.app/general/advisor?search=")
      .then((response) => {
        setAdvisorList(response.data);
        console.log(advisorList);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="">
      <div className="sidenav space-y-10">
        <div className="flex pl-7 items-center">
          <div className="hightlight-blue text-xl">Year :</div>
          <div className="pt-2 pl-5">
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
        <div className="pl-7">
          <span className="hightlight-blue text-xl">Advisor</span>
          <div className="pt-2 pl-5">
            {advisorList?.data?.map((advisor, index) => (
              <div
                className="quick-filter"
                key={advisor._id}
                // onClick={}
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
        </div>
      </div>
    </div>
  );
}

export default SideBar;
