// const inputFilter = () => (
//     <div className="filter-input-area">
//         <div>
//             <input type="radio" name="Advisor Filter" value="Option 1"/> Asst. Prof. Dr. Santitham
//         </div>
//     </div>
// )
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function AddEditProject(props) {
  const options = [1, 2, 3, 4, 5];

  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // const selectorYear = document.querySelector('.custom-selector');
  const advisorList = ["aj. A", "aj. b"];
  // selectorYear.children[0].addEventListener('change', e => {
  //     if (!selectedYear.includes(e.target.value)) {
  //         selectedYear.push(e.target.value);
  //     }
  // })

  const projectKeywords = ["111", "222", "3333"];

  // let projectKeywordNew = projectKeywords.map((keywords, index) => {
  //     return (
  //         <div>
  //         <div className="basis-2/6 flex justify-between">
  //                                         <div className="hightlight-gray">
  //                                             Keyword {index} :
  //                                         </div>
  //                                         <div className="pr-14">
  //                                             keywords = {keywords}
  //                                         </div>
  //                                     </div>
  //                                     <div className="basis-4/6">
  //                                         <input className='search-filter-input-area w-fill' placeholder="Keyword"/>
  //                                     </div>
  //         </div>
  //     )
  // })

  // useEffect(() => {
  //     projectKeywordNew = projectKeywords.map((keywords, index) => {
  //         return (
  //             <div>
  //             <div className="basis-2/6 flex justify-between">
  //                                             <div className="hightlight-gray">
  //                                                 Keyword {index} :
  //                                             </div>
  //                                             <div className="pr-14">
  //                                                 keywords = {keywords}
  //                                             </div>
  //                                         </div>
  //                                         <div className="basis-4/6">
  //                                             <input className='search-filter-input-area w-fill' placeholder="Keyword"/>
  //                                         </div>
  //             </div>
  //         )
  //     })
  // }, [projectKeywords]);

  // function addNewKeyword() {
  //     console.log("add keyword")
  //     // console.log(projectKeywords)
  //     // projectKeywords.push("4444")
  // }

  // function deleteThisKeyword() {
  //     console.log("delete keyword")
  // }

  // function addNewAuthor() {
  //   console.log("add author");
  // }

  function enterKeywordNumber() {}
  const [enterKeywordNumberStatus, setEnterKeywordNumberStatus] =
    useState(false);
  const [quantityofKeyword, setQuantityofKeyword] = useState(0);
  const [keywordsEn, setKeywordsEn] = useState([""]); // state for English keywords
  const [keywordsTh, setKeywordsTh] = useState([""]); // state for Thai keywords

  function KeywordInput({
    keywordsEn,
    keywordsTh,
    index,
    handleKeywordsEnChange,
    handleKeywordsThChange,
    onRemove,
  }) {
    return (
      <div className="want-to-duplicate flex">
        <div className="items-center space-y-4 w-full pr-2">
          <div className="flex items-center">
            <div className="basis-2/6 flex justify-between">
              <div className="hightlight-gray-2">Keyword {index + 1} :</div>
              <div className="pr-14">Keyword</div>
            </div>
            <div className="basis-4/6">
              <input
                className="keywordsInputEn search-filter-input-area"
                placeholder="Keyword"
                value={keywordsEn[index]}
                onChange={(e) => handleKeywordsEnChange(e.target.value, index)}
              />
            </div>
          </div>
          <div className="flex items-center ">
            <div className="basis-2/6 flex justify-between">
              <div className=""></div>
              <div className="pr-14">คำสำคัญ</div>
            </div>
            <div className="basis-4/6">
              <input
                className="search-filter-input-area"
                placeholder="คำสำคัญ"
                value={keywordsTh[index]}
                onChange={(e) => handleKeywordsThChange(e, index)}
              />
            </div>
          </div>
        </div>
        <div className="self-center">
          <button
            className="justify-self-end project-banner-menu-delete"
            onClick={() => onRemove(index)}
          >
            delete
          </button>
        </div>
      </div>
    );
  }

  // add a new set of keyword inputs
  function addNewKeyword() {
    setKeywordsEn([...keywordsEn, ""]);
    // setKeywordsTh([...keywordsTh, '']);
  }

  // remove a set of keyword inputs
  function removeKeyword(index) {
    const newKeywordsEn = [...keywordsEn];
    newKeywordsEn.splice(index, 1);
    setKeywordsEn(newKeywordsEn);
    console.log(newKeywordsEn);

    const newKeywordsTh = [...keywordsTh];
    newKeywordsTh.splice(index, 1);
    setKeywordsTh(newKeywordsTh);
    console.log(newKeywordsTh);
  }

  // update the English keyword state with the new value
  function handleKeywordsEnChange(event, index) {
    const newKeywordsEn = [...keywordsEn];
    newKeywordsEn[index] = event;
    setKeywordsEn(newKeywordsEn);
    console.log("newKeywordsEn = " + newKeywordsEn);
  }

  // update the Thai keyword state with the new value
  function handleKeywordsThChange(event, index) {
    const newKeywordsTh = [...keywordsTh];
    newKeywordsTh[index] = event.target.value;
    setKeywordsTh(newKeywordsTh);
    console.log("newKeywordsTh = " + newKeywordsTh);
  }

  return (
    <div className="popup">
      <div className="filter-popup">
        <div className="popup-header justify-between items-center py-3 px-8">
          <div>
            <span className="hightlight-gray text-lg">
              {props.addCase === true ? "Add New Project" : "Edit Project"}
            </span>
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
        <div className="popup-content space-y-10" style={{ height: "500px" }}>
          {/* <div className={`${props.addCase === false ? 'hidden' : ''}`}>
                            <div>I'm add case</div>
                        </div> */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="basis-1/4">Project Title :</div>
              <div className="basis-3/4">
                <input
                  className="search-filter-input-area w-fill"
                  placeholder="Project Title"
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="basis-1/4">ชื่อโครงการ :</div>
              <div className="basis-3/4">
                <input
                  className="search-filter-input-area w-fill"
                  placeholder="ชื่อโครงการ"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <div className="basis-1/4">Abstract :</div>
              <div className="basis-3/4">
                <div className="items-center space-x-3 w-fill">
                  <textarea
                    className="search-filter-input-area"
                    rows="5"
                    cols="77"
                    placeholder="Abstract of project"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="basis-1/4">ภาคผนวก :</div>
              <div className="basis-3/4">
                <div className="items-center space-x-3 w-fill">
                  <textarea
                    className="search-filter-input-area"
                    rows="5"
                    cols="77"
                    placeholder="ภาคผนวกของโครงการ"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* <div className="flex" key={index}>
                                <div className="items-center space-y-4 w-full pr-2">
                                    <div className="flex items-center">
                                        <div className="basis-2/6 flex justify-between">
                                            <div className="hightlight-gray-2">Keyword {index + 1} :</div> 
                                            <div className="pr-14">Keyword </div> 
                                        </div>
                                        <div className="basis-4/6">
                                            <input 
                                            className='search-filter-input-area' 
                                            placeholder="Keyword"
                                            value={keyword}
                                            onChange={(event) => handleKeywordsEnChange(event, index)}/>
                                        </div>
                                    </div>
                                    <div className="flex items-center ">
                                        <div className="basis-2/6 flex justify-between">
                                            <div className=""></div> 
                                            <div className="pr-14">คำสำคัญ</div> 
                                        </div>
                                        <div className="basis-4/6">
                                            <input 
                                            className='search-filter-input-area' 
                                            placeholder="คำสำคัญ"
                                            value={keywordsTh[index]}
                                            onChange={(event) => handleKeywordsThChange(event, index)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="self-center">
                                    <button className='justify-self-end project-banner-menu-delete' onClick={() => removeKeyword(index)}>delete</button>
                                </div>
                            </div> */}

          {/* {enterKeywordNumberStatus ? (
            <div className="">
              {Array.from({ length: quantityofKeyword }).map((_, index) => (
                <div className="py-4">
                  <KeywordInput
                    key={index}
                    index={index}
                    keywordsEn={keywordsEn}
                    keywordsTh={keywordsTh}
                    handleKeywordsEnChange={handleKeywordsEnChange}
                    handleKeywordsThChange={handleKeywordsThChange}
                    onRemove={removeKeyword}
                  />
                </div>
              ))}
              <div className="pt-4">
                <center>
                  <button className="blackwhite-button" onClick={addNewKeyword}>
                    Add Keyword
                  </button>
                </center>
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <div className="basis-1/4">Keyword Number :</div>
              <div className="basis-1/6 flex items-center space-x-2">
                <input
                  className="search-filter-input-area"
                  type="number"
                  id="quantityofKeyword"
                  name="quantityofKeyword"
                  min="0"
                  max="20"
                  onChange={(event) =>
                    setQuantityofKeyword(parseInt(event.target.value))
                  }
                />
                <button
                  className="blackwhite-button"
                  onClick={() => setEnterKeywordNumberStatus(true)}
                >
                  Confirm
                </button>
              </div>
            </div>
          )} */}

          <div className="">
            {keywordsEn.map((keyword, index) => (
              <div className="py-4">
                <KeywordInput
                  key={index}
                  index={index}
                  keywordsEn={keywordsEn}
                  keywordsTh={keywordsTh}
                  handleKeywordsEnChange={handleKeywordsEnChange}
                  handleKeywordsThChange={handleKeywordsThChange}
                  onRemove={removeKeyword}
                />
              </div>
            ))}
            <div className="pt-4">
              <center>
                <button className="blackwhite-button" onClick={addNewKeyword}>
                  Add Keyword
                </button>
              </center>
            </div>
          </div>

          {/* <div>
                            Help
                            <div>
                                {projectKeywordNew}
                            </div>
                            </div> */}

          <div className="flex items-center">
            <div className="basis-1/4">Academic Year :</div>
            <div className="basis-3/4">
              <select
                className="custom-selector"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                <option value="">--Select Year--</option>
                {options.map((option) => (
                  <option value={`Option ${option}`}>
                    Academic Year {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center">
            <div className="basis-1/4">Document file :</div>
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
          <div className="space-y-4 items-center">
            <div className="flex items-center">
              <div className="basis-1/4">Advisor :</div>
              <div className="basis-3/4">
                <select
                  className="custom-selector"
                  value={selectedOption}
                  onChange={handleOptionChange}
                >
                  <option value="">--Advisor--</option>
                  {advisorList.map((advisor, index) => (
                    <option value={`Option ${advisor}`}>{advisor}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center">
              <div className="basis-1/4">Co-Advisor :</div>
              <div className="basis-3/4">
                <select
                  className="custom-selector"
                  value={selectedOption}
                  onChange={handleOptionChange}
                >
                  <option value="">--Co-Advisor--</option>
                  {advisorList.map((advisor, index) => (
                    <option value={`Option ${advisor}`}>{advisor}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex">
              <div className="items-center space-y-4 w-full pr-2">
                <div className="flex items-center">
                  <div className="basis-2/6 flex justify-between">
                    <div className="hightlight-gray-2">Author 1 :</div>
                    <div className="pr-14">Prefix</div>
                  </div>
                  <div className="basis-4/6">
                    <input
                      className="search-filter-input-area w-fill"
                      placeholder="Author prefix"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="basis-2/6 flex justify-between">
                    <div className=""></div>
                    <div className="pr-14">Name</div>
                  </div>
                  <div className="basis-4/6">
                    <input
                      className="search-filter-input-area w-fill"
                      placeholder="Author Name"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="basis-2/6 flex justify-between">
                    <div className=""></div>
                    <div className="pr-14">Middle Name</div>
                  </div>
                  <div className="basis-4/6">
                    <input
                      className="search-filter-input-area w-fill"
                      placeholder="Author Middle Name (optional)"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="basis-2/6 flex justify-between">
                    <div className=""></div>
                    <div className="pr-14">Surname</div>
                  </div>
                  <div className="basis-4/6">
                    <input
                      className="search-filter-input-area w-fill"
                      placeholder="Author Surname"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="basis-2/6 flex justify-between">
                    <div className=""></div>
                    <div className="pr-14">คำนำหน้า</div>
                  </div>
                  <div className="basis-4/6">
                    <input
                      className="search-filter-input-area w-fill"
                      placeholder="คำนำหน้าผู้เขียน"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="basis-2/6 flex justify-between">
                    <div className=""></div>
                    <div className="pr-14">ชื่อจริง</div>
                  </div>
                  <div className="basis-4/6">
                    <input
                      className="search-filter-input-area w-fill"
                      placeholder="ชื่อจริงผู้เขียน"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="basis-2/6 flex justify-between">
                    <div className=""></div>
                    <div className="pr-14">ชื่อกลาง</div>
                  </div>
                  <div className="basis-4/6">
                    <input
                      className="search-filter-input-area w-fill"
                      placeholder="ชื่อกลางผู้เขียน (optional)"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="basis-2/6 flex justify-between">
                    <div className=""></div>
                    <div className="pr-14">นามสกุล</div>
                  </div>
                  <div className="basis-4/6">
                    <input
                      className="search-filter-input-area w-fill"
                      placeholder="นามสกุลผู้เขียน"
                    />
                  </div>
                </div>
              </div>
              <div className="self-center">
                <button className="justify-self-end project-banner-menu-delete">
                  delete
                </button>
              </div>
            </div>
            <div className="pt-4">
              <center>
                <button
                  className="blackwhite-button"
                  // onClick={addNewAuthor()}
                >
                  Add Author
                </button>
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddEditProject;
