// const inputFilter = () => (
//     <div className="filter-input-area">
//         <div>
//             <input type="radio" name="Advisor Filter" value="Option 1"/> Asst. Prof. Dr. Santitham
//         </div>
//     </div>
// )
import React, { useState, useEffect } from "react";
import axios from "axios";

function AddEditProject({ closePopup, addCase, projectID }) {
  const academicYearChoice = [2018, 2019, 2020, 2021, 2023];
  const [loading, setLoading] = useState(true);
  const [advisorList, setAdvisorList] = useState(null);
  const [dataBeforeEdit, setDataBeforeEdit] = useState(null);
  const checkLoading =
    dataBeforeEdit?.data?.eng.document?.title || "loading...";
  const [authorNumber, setAuthorNumber] = useState(1);

  const printAllInput = () => {
    console.log("printAllInput : " + JSON.stringify(projectData));
  };
  const aToken = localStorage.getItem("Access_Token");
  const rToken = localStorage.getItem("Refresh_Token");

  useEffect(() => {
    axios
      .get("https://api-seai-general.cyclic.app/general/advisor?search=", {
        headers: {
          access_token: aToken,
          refresh_token: rToken,
        },
      })
      .then((response) => {
        setAdvisorList(response.data);
        console.log("projectID: " + projectID);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (projectID) {
      axios
        .get(
          `https://api-seai-general.cyclic.app/general/project/${projectID}`,
          {
            headers: {
              access_token: aToken,
              refresh_token: rToken,
            },
          }
        )
        .then((response) => {
          setDataBeforeEdit(response.data);
          console.log("projectID: " + projectID);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  useEffect(() => {
    if (dataBeforeEdit) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [dataBeforeEdit]);

  const postProjectData = () => {
    axios
      .post(
        "https://api-seai-general.cyclic.app/general/project/",
        {
          headers: {
            access_token: aToken,
            refresh_token: rToken,
          },
        },
        projectData
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const [projectData, setProjectData] = useState({
    thai: {
      document: {
        title: "",
        abstract: "",
        keywords: "",
      },
      advisor: [
        {
          prefix: "",
          first_name: "",
          middle_name: "",
          last_name: "",
        },
        {
          prefix: "",
          first_name: "",
          middle_name: "",
          last_name: "",
        },
      ],
      author: [
        {
          prefix: "",
          first_name: "",
          middle_name: "",
          last_name: "",
        },
        {
          prefix: "",
          first_name: "",
          middle_name: "",
          last_name: "",
        },
        {
          prefix: "",
          first_name: "",
          middle_name: "",
          last_name: "",
        },
      ],
    },
    eng: {
      document: {
        title: "",
        abstract: "",
        keywords: "",
      },
      advisor: [
        {
          prefix: "",
          first_name: "",
          middle_name: "",
          last_name: "",
        },
        {
          prefix: "",
          first_name: "",
          middle_name: "",
          last_name: "",
        },
      ],
      author: [
        {
          prefix: "",
          first_name: "",
          middle_name: "",
          last_name: "",
        },
        {
          prefix: "",
          first_name: "",
          middle_name: "",
          last_name: "",
        },
        {
          prefix: "",
          first_name: "",
          middle_name: "",
          last_name: "",
        },
      ],
    },
    academic_year: "",
    degree: "",
    project_type: "",
    advisor_id: [],
  });

  useEffect(() => {
    if (projectID) {
      console.log(
        "dataBeforeEdit?.data.eng?.document?.title: " +
          dataBeforeEdit?.data.eng?.document?.title
      );
      setProjectData((prevState) => ({
        ...prevState,
        eng: {
          ...prevState.eng,
          document: {
            ...prevState.eng.document,
            title: dataBeforeEdit?.data.eng?.document?.title || "",
            keywords: dataBeforeEdit?.data.eng?.document?.title || "",
            abstract: dataBeforeEdit?.data.eng?.document?.abstract || "",
          },
          ...prevState.eng,
          advisor: {
            ...prevState.eng.advisor,
            prefix: dataBeforeEdit?.data.eng?.advisor?.prefix || "",
            first_name: dataBeforeEdit?.data.eng?.advisor?.first_name || "",
            middle_name: dataBeforeEdit?.data.eng?.advisor?.middle_name || "",
            last_name: dataBeforeEdit?.data.eng?.advisor?.last_name || "",
          },
          ...prevState.eng,
          author: {
            ...prevState.eng.author,
            prefix: dataBeforeEdit?.data.eng?.author?.prefix || "",
            first_name: dataBeforeEdit?.data.eng?.author?.first_name || "",
            middle_name: dataBeforeEdit?.data.eng?.author?.middle_name || "",
            last_name: dataBeforeEdit?.data.eng?.author?.last_name || "",
          },
        },
        thai: {
          ...prevState.thai,
          document: {
            ...prevState.thai.document,
            title: dataBeforeEdit?.data.thai?.document?.title || "",
            keywords: dataBeforeEdit?.data.thai?.document?.title || "",
            abstract: dataBeforeEdit?.data.thai?.document?.abstract || "",
          },
          ...prevState.thai,
          advisor: {
            ...prevState.thai.advisor,
            prefix: dataBeforeEdit?.data.thai?.advisor?.prefix || "",
            first_name: dataBeforeEdit?.data.thai?.advisor?.first_name || "",
            middle_name: dataBeforeEdit?.data.thai?.advisor?.middle_name || "",
            last_name: dataBeforeEdit?.data.thai?.advisor?.last_name || "",
          },
          ...prevState.thai,
          author: {
            ...prevState.thai.author,
            prefix: dataBeforeEdit?.data.thai?.author?.prefix || "",
            first_name: dataBeforeEdit?.data.thai?.author?.first_name || "",
            middle_name: dataBeforeEdit?.data.thai?.author?.middle_name || "",
            last_name: dataBeforeEdit?.data.thai?.author?.last_name || "",
          },
          // advisor: [],
          // academic_year: "",
          // degree: "",
          // project_type: "",
          // advisor_id: []
          // advisor: [...dataBeforeEdit?.data.advisor] || [],
          // academic_year: dataBeforeEdit?.data.academic_year || "",
          // degree: dataBeforeEdit?.data.degree || "",
          // project_type: dataBeforeEdit?.data.project_type || "",
          // advisor_id: [...dataBeforeEdit?.data.advisor_id] || [],
        },
        // titleEn: dataBeforeEdit?.data.eng?.document?.title || "",
        // titleTh: dataBeforeEdit?.data.thai?.document?.title || "",
        // abstractEn: dataBeforeEdit?.data.eng?.document?.abstract || "",
        // abstractTh: dataBeforeEdit?.data.thai?.document?.abstract || "",
        // degree: dataBeforeEdit?.data.degree || "",
        // projectType: dataBeforeEdit?.data.project_type || "",
        // keywordEn: dataBeforeEdit?.data.eng?.document?.keywords || "",
        // keywordTh: dataBeforeEdit?.data.thai?.document?.keywords || "",
        // academicYear: dataBeforeEdit?.data.academic_year || "",
      }));
      console.log(projectData.eng.document?.title);
      console.log(projectData.thai.document?.title);
    }
  }, [dataBeforeEdit]);

  const handleSmallDataChange = (event) => {
    const { target } = event;
    const { name } = target;
    if (name == "degree" || name == "academic_year" || name == "project_type") {
      setProjectData({
        ...projectData,
        [name]: event.target.value,
      });
    }
  };

  const handleEnDocumentChange = (event) => {
    const { target } = event;
    const { name } = target;

    if (name == "title" || name == "abstract" || name == "keywords") {
      setProjectData({
        ...projectData,
        eng: {
          ...projectData.eng,
          document: {
            ...projectData.eng.document,
            [name]: event.target.value,
          },
        },
      });
    }
  };

  const handleThDocumentChange = (event) => {
    const { target } = event;
    const { name } = target;

    if (name == "title" || name == "abstract" || name == "keywords") {
      setProjectData({
        ...projectData,
        thai: {
          ...projectData.thai,
          document: {
            ...projectData.thai.document,
            [name]: event.target.value,
          },
        },
      });
    }
  };

  const handleAdvisorOptionChange = (event) => {
    console.log(advisorList?.data[event.target.value]._id);

    setProjectData({
      ...projectData,
      eng: {
        ...projectData.eng,
        advisor: [
          {
            prefix: advisorList?.data[event.target.value].eng.prefix,
            first_name: advisorList?.data[event.target.value].eng.first_name,
            middle_name:
              advisorList?.data[event.target.value].eng.middle_name !== ""
                ? advisorList?.data[event.target.value].eng.middle_name
                : null,
            last_name: advisorList?.data[event.target.value].eng.last_name,
          },
        ],
      },
      thai: {
        ...projectData.thai,
        advisor: [
          {
            prefix: advisorList?.data[event.target.value].thai.prefix,
            first_name: advisorList?.data[event.target.value].thai.first_name,
            middle_name:
              advisorList?.data[event.target.value].thai.middle_name !== ""
                ? advisorList?.data[event.target.value].thai.middle_name
                : null,
            last_name: advisorList?.data[event.target.value].thai.last_name,
          },
        ],
      },
      advisor_id: [advisorList?.data[event.target.value]._id],
    });
  };

  const handleCoAdvisorOptionChange = (event) => {
    setProjectData((prevData) => ({
      ...prevData,
      advisor_id: [
        projectData.advisor_id[0] ?? null,
        advisorList?.data[event.target.value]._id,
      ],
      eng: {
        ...prevData.eng,
        advisor: [
          ...prevData.eng.advisor.slice(0, 1),
          {
            prefix: advisorList?.data[event.target.value].eng.prefix,
            first_name: advisorList?.data[event.target.value].eng.first_name,
            middle_name:
              advisorList?.data[event.target.value].eng.middle_name !== ""
                ? advisorList?.data[event.target.value].eng.middle_name
                : null,
            last_name: advisorList?.data[event.target.value].eng.last_name,
          },
        ],
      },
      thai: {
        ...prevData.thai,
        advisor: [
          ...prevData.thai.advisor.slice(0, 1),
          {
            prefix: advisorList?.data[event.target.value].thai.prefix,
            first_name: advisorList?.data[event.target.value].thai.first_name,
            middle_name:
              advisorList?.data[event.target.value].thai.middle_name !== ""
                ? advisorList?.data[event.target.value].thai.middle_name
                : null,
            last_name: advisorList?.data[event.target.value].thai.last_name,
          },
        ],
      },
    }));
  };

  const handleEnAuthorChange = (event, number, lang) => {
    const { target } = event;
    const { name } = target;

    if (
      name === "prefix" ||
      name === "first_name" ||
      name === "middle_name" ||
      name === "last_name"
    ) {
      setProjectData((prevData) => ({
        ...prevData,
        [lang]: {
          ...prevData[lang],
          author: prevData[lang].author.map((authorObj, index) => {
            if (index !== number) {
              return authorObj;
            }

            return {
              ...authorObj,
              [name]: event.target.value !== "" ? event.target.value : null,
            };
          }),
        },
      }));
    }
  };

  const handleAddAuthor = () => {
    setProjectData((prevData) => {
      return {
        ...prevData,
        thai: {
          ...prevData.thai,
          author: [
            ...prevData.thai.author,
            { prefix: "", first_name: "", middle_name: "", last_name: "" },
          ],
        },
        eng: {
          ...prevData.eng,
          author: [
            ...prevData.eng.author,
            { prefix: "", first_name: "", middle_name: "", last_name: "" },
          ],
        },
      };
    });
    // add array in projectData.thai.author[] and projectData.eng.autor[]
  };

  const advisors = [
    { first_name: "aa", last_name: "sss" },
    { first_name: "", last_name: "ddd" },
    { first_name: "fff", last_name: "mimi" },
  ];

  const validateArrayData = () => {
    const thaiAuthor = projectData.thai.author;
    const thaiAdvisor = projectData.thai.advisor;
    const engAuthor = projectData.eng.author;
    const engAdvisor = projectData.eng.advisor;

    for (let i = thaiAuthor.length - 1; i >= 0; i--) {
      if (thaiAuthor[i].prefix === "") {
        thaiAuthor.splice(i, 1);
      }
    }

    for (let i = thaiAdvisor.length - 1; i >= 0; i--) {
      if (thaiAdvisor[i].prefix === "") {
        thaiAdvisor.splice(i, 1);
      }
    }

    for (let i = engAuthor.length - 1; i >= 0; i--) {
      if (engAuthor[i].prefix === "") {
        engAuthor.splice(i, 1);
      }
    }

    for (let i = engAdvisor.length - 1; i >= 0; i--) {
      if (engAdvisor[i].prefix === "") {
        engAdvisor.splice(i, 1);
      }
    }

    setProjectData({
      ...projectData,
      thai: {
        ...projectData.thai,
        author: thaiAuthor,
        advisor: thaiAdvisor,
      },
      eng: {
        ...projectData.eng,
        author: engAuthor,
        advisor: engAdvisor,
      },
    });

    // console.log("filter author: " + projectData.eng.author);
    // console.log("filter advisor: " + projectData.eng.advisor);
  };

  const resetAuthorDataAfterDel = ({ index }) => {
    setProjectData({
      ...projectData,
      thai: {
        ...projectData.thai,
        author: [
          ...projectData.thai.author.slice(0, index),
          { prefix: "", first_name: "", middle_name: "", last_name: "" },
          ...(index == 1 ? projectData.thai.author.slice(2) : []),
        ],
      },
      eng: {
        ...projectData.eng,
        author: [
          ...projectData.eng.author.slice(0, index),
          { prefix: "", first_name: "", middle_name: "", last_name: "" },
          ...(index == 1 ? projectData.eng.author.slice(2) : []),
        ],
      },
    });
  };

  const handleCheckData = () => {
    validateArrayData();
    printAllInput();
    // postProjectData();
  };

  return (
    <div className="popup">
      <div className="filter-popup">
        <div className="popup-header justify-between items-center py-1 px-8">
          <div>
            <span className="hightlight-gray text-lg">
              {addCase === true ? "Add New Project" : "Edit Project"}
            </span>
          </div>
          <div className="flex items-center space-x-3 p-2 w-100">
            <div
              className="border-2 rounded-lg px-3 py-2 text-sm"
              onClick={closePopup}
            >
              Close without save
            </div>
            <button
              className="blue-button text-sm py-2 px-4 w-28"
              onClick={() => {
                closePopup();
                handleCheckData();
              }}
            >
              Confirm
            </button>
          </div>
        </div>

        <div className="popup-content space-y-10" style={{ height: "75vh" }}>
          {checkLoading == null ? (
            <div>loading..</div>
          ) : (
            <div className="space-y-10">
              {/* <div className={`${props.addCase === false ? 'hidden' : ''}`}>
                            <div>I'm add case</div>
                        </div> */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="basis-1/4 pr-10">Project Title :</div>
                  <div className="basis-3/4">
                    <textarea
                      className="popup-input px-3 py-1 w-full"
                      placeholder="Project Title"
                      value={projectData.eng.document?.title}
                      onChange={handleEnDocumentChange}
                      name="title"
                      rows="2"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="basis-1/4 pr-10">ชื่อโครงการ :</div>
                  <div className="basis-3/4">
                    <textarea
                      className="popup-input px-3 py-1  w-full"
                      placeholder="ชื่อโครงการ"
                      value={projectData.thai.document?.title}
                      onChange={handleThDocumentChange}
                      name="title"
                      rows="2"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="basis-1/4 pr-10">Abstract :</div>
                  <div className="basis-3/4">
                    <div className="items-center space-x-3 ">
                      <textarea
                        className="popup-input px-3 py-1 w-full"
                        placeholder="Abstract of project"
                        value={projectData.eng.document?.abstract}
                        onChange={handleEnDocumentChange}
                        name="abstract"
                        rows="4"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="basis-1/4 pr-10">ภาคผนวก :</div>
                  <div className="basis-3/4">
                    <div className="items-center space-x-3 ">
                      <textarea
                        className="popup-input px-3 py-1 w-full"
                        placeholder="ภาคผนวกของโครงการ"
                        value={projectData.thai.document?.abstract}
                        onChange={handleThDocumentChange}
                        name="abstract"
                        rows="4"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="basis-1/4 pr-10">Degree :</div>
                  <div className="flex basis-3/4 ">
                    <div className="pr-10 flex items-center">
                      <input
                        type="radio"
                        id="master's degree"
                        name="degree"
                        value="master's degree"
                        checked={projectData.degree === "master's degree"}
                        onChange={handleSmallDataChange}
                      />
                      <label for="html">Master's degree</label>
                    </div>
                    <div className=" flex items-center">
                      <input
                        type="radio"
                        id="undergraduate's degree"
                        name="degree"
                        value="undergraduate's degree"
                        checked={
                          projectData.degree === "undergraduate's degree"
                        }
                        onChange={handleSmallDataChange}
                      />
                      <label for="html">Undergraduate's degree</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="basis-1/4 pr-10">Project type :</div>
                  <div className="flex basis-3/4 ">
                    <div className="pr-10 flex flex-wrap items-center">
                      <input
                        type="radio"
                        id="Thesis"
                        name="project_type"
                        value="Thesis"
                        checked={projectData.project_type === "Thesis"}
                        onChange={handleSmallDataChange}
                      />
                      <label for="html">Thesis</label>
                    </div>
                    <div className="pr-10 flex items-center">
                      <input
                        type="radio"
                        id="senior"
                        name="project_type"
                        value="Senior"
                        checked={projectData.project_type === "Senior"}
                        onChange={handleSmallDataChange}
                      />
                      <label for="html">Senior</label>
                    </div>
                    <div className=" flex items-center">
                      <input
                        type="radio"
                        id="wil"
                        name="project_type"
                        value="Work-Integrated Learning"
                        checked={
                          projectData.project_type ===
                          "Work-Integrated Learning"
                        }
                        onChange={handleSmallDataChange}
                      />
                      <label for="html">Work-Integrated Learning</label>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="">
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
          </div> */}

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="basis-1/4 pr-10">Keyword :</div>
                  <div className="basis-3/4">
                    <div className="items-center space-x-3 ">
                      <textarea
                        className="popup-input px-3 py-1 w-full"
                        placeholder="Keyword of project (separate word by '/' ,Ex. keyword1/ keyword2)"
                        value={projectData.eng.document?.keywords}
                        onChange={handleEnDocumentChange}
                        name="keywords"
                        rows="4"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="basis-1/4 pr-10">คำสำคัญ :</div>
                  <div className="basis-3/4">
                    <div className="items-center space-x-3">
                      <textarea
                        className="popup-input px-3 py-1 w-full"
                        placeholder="คำสำคัญของโครงการ (แบ่งคำด้วย '/' ,ตัวอย่าง: คำสำคัญ1/ คำสำคัญ2)"
                        value={projectData.thai.document?.keywords}
                        onChange={handleThDocumentChange}
                        name="keywords"
                        rows="4"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="basis-1/4 pr-10">Academic Year :</div>
                <div className="basis-3/4">
                  <select
                    className="custom-selector"
                    // value={selectedOption}
                    value={projectData.academic_year}
                    // onChange={handleYearChange}
                    onChange={handleSmallDataChange}
                    name="academic_year"
                  >
                    <option value="">--Select Year--</option>
                    {academicYearChoice.map((option) => (
                      <option value={option}>Year {option}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-4 items-center">
                <div className="flex pb-6 items-center">
                  <div className="basis-1/4 pr-10">Advisor :</div>
                  <div className="basis-3/4">
                    <select
                      className="custom-selector"
                      // value={
                      //   projectData.advisor_id.length > 0
                      //     ? projectData.advisor_id[0]
                      //     : ""
                      // }
                      // value={selectedAdvisorOption}
                      onChange={handleAdvisorOptionChange}
                      style={{ width: "400px" }}
                    >
                      <option value="">--Advisor--</option>
                      {advisorList?.data?.map((advisor, index) => (
                        <option value={index} key={index}>
                          {advisorList?.data[index].eng.prefix +
                            " " +
                            advisorList?.data[index].eng.full_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="basis-1/4 pr-10">Co-Advisor :</div>
                  <div className="basis-3/4">
                    <select
                      className="custom-selector"
                      // value={
                      //   projectData.advisor_id.length > 0
                      //     ? projectData.advisor_id[1]
                      //     : ""
                      // }
                      onChange={handleCoAdvisorOptionChange}
                      style={{ width: "400px" }}
                    >
                      <option value="">--Co-Advisor--</option>
                      {advisorList?.data?.map((coAdvisor, index) => (
                        <option value={index} key={index}>
                          {advisorList?.data[index].eng.prefix +
                            " " +
                            advisorList?.data[index].eng.full_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="">
                {/* {Array.from({ length: authorNumber+1 }).map((author, index) => (
                  <div>
                    <div className="flex">
                      <AuthorForm index={index} />
                    </div>
                  </div>
                ))}
                <center>
                  <button
                    className="blackwhite-button"
                    onClick={() => {
                      setAuthorNumber(
                        (prevAuthorNumber) => prevAuthorNumber + 1
                      );
                      handleAddAuthor();
                    }}
                  >
                    Add Author
                  </button>
                </center> */}
                {/* i here */}
                <div className="items-center space-y-4 pb-5 w-full pr-2">
                  <div className="flex items-center">
                    <div className="basis-2/6 flex justify-between">
                      <div className="">Author 1 :</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="basis-2/6 flex justify-between">
                      <div className=""></div>
                      <div className="pr-14 hightlight-gray-2">Prefix</div>
                    </div>
                    <div className="basis-4/6">
                      <input
                        className="popup-input px-3 py-1 w-fill"
                        placeholder="Author prefix"
                        value={projectData.eng.author[0].prefix}
                        onChange={(event) =>
                          handleEnAuthorChange(event, 0, "eng")
                        }
                        name="prefix"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="basis-2/6 flex justify-between">
                      <div className=""></div>
                      <div className="pr-14 hightlight-gray-2">Name</div>
                    </div>
                    <div className="basis-4/6">
                      <input
                        className="popup-input px-3 py-1 w-fill"
                        placeholder="Author Name"
                        value={projectData.eng.author[0].first_name}
                        onChange={(event) =>
                          handleEnAuthorChange(event, 0, "eng")
                        }
                        name="first_name"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="basis-2/6 flex justify-between">
                      <div className=""></div>
                      <div className="pr-14 hightlight-gray-2">Middle Name</div>
                    </div>
                    <div className="basis-4/6">
                      <input
                        className="popup-input px-3 py-1 w-fill"
                        placeholder="Author Middle Name (optional)"
                        value={projectData.eng.author[0].middle_name}
                        onChange={(event) =>
                          handleEnAuthorChange(event, 0, "eng")
                        }
                        name="middle_name"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="basis-2/6 flex justify-between">
                      <div className=""></div>
                      <div className="pr-14 hightlight-gray-2">Surname</div>
                    </div>
                    <div className="basis-4/6">
                      <input
                        className="popup-input px-3 py-1 w-fill"
                        placeholder="Author Surname"
                        value={projectData.eng.author[0].last_name}
                        onChange={(event) =>
                          handleEnAuthorChange(event, 0, "eng")
                        }
                        name="last_name"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="basis-2/6 flex justify-between">
                      <div className=""></div>
                      <div className="pr-14 hightlight-gray-2">คำนำหน้า</div>
                    </div>
                    <div className="basis-4/6">
                      <input
                        className="popup-input px-3 py-1 w-fill"
                        placeholder="คำนำหน้าผู้เขียน"
                        value={projectData.thai.author[0].prefix}
                        onChange={(event) =>
                          handleEnAuthorChange(event, 0, "thai")
                        }
                        name="prefix"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="basis-2/6 flex justify-between">
                      <div className=""></div>
                      <div className="pr-14 hightlight-gray-2">ชื่อจริง</div>
                    </div>
                    <div className="basis-4/6">
                      <input
                        className="popup-input px-3 py-1 w-fill"
                        placeholder="ชื่อจริงผู้เขียน"
                        value={projectData.thai.author[0].first_name}
                        onChange={(event) =>
                          handleEnAuthorChange(event, 0, "thai")
                        }
                        name="first_name"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="basis-2/6 flex justify-between">
                      <div className=""></div>
                      <div className="pr-14 hightlight-gray-2">ชื่อกลาง</div>
                    </div>
                    <div className="basis-4/6">
                      <input
                        className="popup-input px-3 py-1 w-fill"
                        placeholder="ชื่อกลางผู้เขียน (optional)"
                        value={projectData.thai.author[0].middle_name}
                        onChange={(event) =>
                          handleEnAuthorChange(event, 0, "thai")
                        }
                        name="middle_name"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="basis-2/6 flex justify-between">
                      <div className=""></div>
                      <div className="pr-14 hightlight-gray-2">นามสกุล</div>
                    </div>
                    <div className="basis-4/6">
                      <input
                        className="popup-input px-3 py-1 w-fill"
                        placeholder="นามสกุลผู้เขียน"
                        value={projectData.thai.author[0].last_name}
                        onChange={(event) =>
                          handleEnAuthorChange(event, 0, "thai")
                        }
                        name="last_name"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={
                    "items-center space-y-4 pb-5 w-full pr-2 " +
                    (authorNumber >= 2 ? "" : "hidden")
                  }
                >
                  {/* <div className={"items-center space-y-4 pb-5 w-full pr-2 "}> */}
                  <div className="flex items-center">
                    <div className="basis-2/6 flex justify-between">
                      <div className="">Author 2 :</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="basis-2/6 flex justify-between">
                      <div className=""></div>
                      <div className="pr-14 hightlight-gray-2">Prefix</div>
                    </div>
                    <div className="basis-4/6">
                      <input
                        className="popup-input px-3 py-1 w-fill"
                        placeholder="Author prefix"
                        value={projectData.eng.author[1].prefix}
                        onChange={(event) =>
                          handleEnAuthorChange(event, 1, "eng")
                        }
                        name="prefix"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="basis-2/6 flex justify-between">
                      <div className=""></div>
                      <div className="pr-14 hightlight-gray-2">Name</div>
                    </div>
                    <div className="basis-4/6">
                      <input
                        className="popup-input px-3 py-1 w-fill"
                        placeholder="Author Name"
                        value={projectData.eng.author[1].first_name}
                        onChange={(event) =>
                          handleEnAuthorChange(event, 1, "eng")
                        }
                        name="first_name"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="basis-2/6 flex justify-between">
                      <div className=""></div>
                      <div className="pr-14 hightlight-gray-2">Middle Name</div>
                    </div>
                    <div className="basis-4/6">
                      <input
                        className="popup-input px-3 py-1 w-fill"
                        placeholder="Author Middle Name (optional)"
                        value={projectData.eng.author[1].middle_name}
                        onChange={(event) =>
                          handleEnAuthorChange(event, 1, "eng")
                        }
                        name="middle_name"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="basis-2/6 flex justify-between">
                      <div className=""></div>
                      <div className="pr-14 hightlight-gray-2">Surname</div>
                    </div>
                    <div className="basis-4/6">
                      <input
                        className="popup-input px-3 py-1 w-fill"
                        placeholder="Author Surname"
                        value={projectData.eng.author[1].last_name}
                        onChange={(event) =>
                          handleEnAuthorChange(event, 1, "eng")
                        }
                        name="last_name"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="basis-2/6 flex justify-between">
                      <div className=""></div>
                      <div className="pr-14 hightlight-gray-2">คำนำหน้า</div>
                    </div>
                    <div className="basis-4/6">
                      <input
                        className="popup-input px-3 py-1 w-fill"
                        placeholder="คำนำหน้าผู้เขียน"
                        value={projectData.thai.author[1].prefix}
                        onChange={(event) =>
                          handleEnAuthorChange(event, 1, "thai")
                        }
                        name="prefix"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="basis-2/6 flex justify-between">
                      <div className=""></div>
                      <div className="pr-14 hightlight-gray-2">ชื่อจริง</div>
                    </div>
                    <div className="basis-4/6">
                      <input
                        className="popup-input px-3 py-1 w-fill"
                        placeholder="ชื่อจริงผู้เขียน"
                        value={projectData.thai.author[1].first_name}
                        onChange={(event) =>
                          handleEnAuthorChange(event, 1, "thai")
                        }
                        name="first_name"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="basis-2/6 flex justify-between">
                      <div className=""></div>
                      <div className="pr-14 hightlight-gray-2">ชื่อกลาง</div>
                    </div>
                    <div className="basis-4/6">
                      <input
                        className="popup-input px-3 py-1 w-fill"
                        placeholder="ชื่อกลางผู้เขียน (optional)"
                        value={projectData.thai.author[1].middle_name}
                        onChange={(event) =>
                          handleEnAuthorChange(event, 1, "thai")
                        }
                        name="middle_name"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="basis-2/6 flex justify-between">
                      <div className=""></div>
                      <div className="pr-14 hightlight-gray-2">นามสกุล</div>
                    </div>
                    <div className="basis-4/6">
                      <input
                        className="popup-input px-3 py-1 w-fill"
                        placeholder="นามสกุลผู้เขียน"
                        value={projectData.thai.author[1].last_name}
                        onChange={(event) =>
                          handleEnAuthorChange(event, 1, "thai")
                        }
                        name="last_name"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={
                    "items-center space-y-4 pb-5 w-full pr-2 " +
                    (authorNumber >= 3 ? "" : "hidden")
                  }
                >
                  {/* <div className={"items-center space-y-4 pb-5 w-full pr-2 "}> */}
                  <div className="flex items-center">
                    <div className="basis-2/6 flex justify-between">
                      <div className="">Author 3 :</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="basis-2/6 flex justify-between">
                      <div className=""></div>
                      <div className="pr-14 hightlight-gray-2">Prefix</div>
                    </div>
                    <div className="basis-4/6">
                      <input
                        className="popup-input px-3 py-1 w-fill"
                        placeholder="Author prefix"
                        value={projectData.eng.author[2].prefix}
                        onChange={(event) =>
                          handleEnAuthorChange(event, 2, "eng")
                        }
                        name="prefix"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="basis-2/6 flex justify-between">
                      <div className=""></div>
                      <div className="pr-14 hightlight-gray-2">Name</div>
                    </div>
                    <div className="basis-4/6">
                      <input
                        className="popup-input px-3 py-1 w-fill"
                        placeholder="Author Name"
                        value={projectData.eng.author[2].first_name}
                        onChange={(event) =>
                          handleEnAuthorChange(event, 2, "eng")
                        }
                        name="first_name"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="basis-2/6 flex justify-between">
                      <div className=""></div>
                      <div className="pr-14 hightlight-gray-2">Middle Name</div>
                    </div>
                    <div className="basis-4/6">
                      <input
                        className="popup-input px-3 py-1 w-fill"
                        placeholder="Author Middle Name (optional)"
                        value={projectData.eng.author[2].middle_name}
                        onChange={(event) =>
                          handleEnAuthorChange(event, 2, "eng")
                        }
                        name="middle_name"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="basis-2/6 flex justify-between">
                      <div className=""></div>
                      <div className="pr-14 hightlight-gray-2">Surname</div>
                    </div>
                    <div className="basis-4/6">
                      <input
                        className="popup-input px-3 py-1 w-fill"
                        placeholder="Author Surname"
                        value={projectData.eng.author[2].last_name}
                        onChange={(event) =>
                          handleEnAuthorChange(event, 2, "eng")
                        }
                        name="last_name"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="basis-2/6 flex justify-between">
                      <div className=""></div>
                      <div className="pr-14 hightlight-gray-2">คำนำหน้า</div>
                    </div>
                    <div className="basis-4/6">
                      <input
                        className="popup-input px-3 py-1 w-fill"
                        placeholder="คำนำหน้าผู้เขียน"
                        value={projectData.thai.author[2].prefix}
                        onChange={(event) =>
                          handleEnAuthorChange(event, 2, "thai")
                        }
                        name="prefix"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="basis-2/6 flex justify-between">
                      <div className=""></div>
                      <div className="pr-14 hightlight-gray-2">ชื่อจริง</div>
                    </div>
                    <div className="basis-4/6">
                      <input
                        className="popup-input px-3 py-1 w-fill"
                        placeholder="ชื่อจริงผู้เขียน"
                        value={projectData.thai.author[2].first_name}
                        onChange={(event) =>
                          handleEnAuthorChange(event, 2, "thai")
                        }
                        name="first_name"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="basis-2/6 flex justify-between">
                      <div className=""></div>
                      <div className="pr-14 hightlight-gray-2">ชื่อกลาง</div>
                    </div>
                    <div className="basis-4/6">
                      <input
                        className="popup-input px-3 py-1 w-fill"
                        placeholder="ชื่อกลางผู้เขียน (optional)"
                        value={projectData.thai.author[2].middle_name}
                        onChange={(event) =>
                          handleEnAuthorChange(event, 2, "thai")
                        }
                        name="middle_name"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="basis-2/6 flex justify-between">
                      <div className=""></div>
                      <div className="pr-14 hightlight-gray-2">นามสกุล</div>
                    </div>
                    <div className="basis-4/6">
                      <input
                        className="popup-input px-3 py-1 w-fill"
                        placeholder="นามสกุลผู้เขียน"
                        value={projectData.thai.author[2].last_name}
                        onChange={(event) =>
                          handleEnAuthorChange(event, 2, "thai")
                        }
                        name="last_name"
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-4 flex space-x-5 justify-center">
                  <button
                    className={
                      "blackwhite-button " + (authorNumber >= 3 ? "hidden" : "")
                    }
                    onClick={() => {
                      setAuthorNumber(
                        (prevAuthorNumber) => prevAuthorNumber + 1
                      );
                    }}
                  >
                    Add Author
                  </button>
                  <button
                    className={
                      "red-delete-button " + (authorNumber <= 1 ? "hidden" : "")
                    }
                    onClick={() => {
                      setAuthorNumber(
                        (prevAuthorNumber) => prevAuthorNumber - 1
                      );
                      resetAuthorDataAfterDel({ index: authorNumber - 1 });
                    }}
                  >
                    Delete Author {authorNumber}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default AddEditProject;
