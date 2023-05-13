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

  // const aTokenNoQuotes = aToken.replace(/"/g, "");
  // const rTokenNoQuotes = rToken.replace(/"/g, "");

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
        console.log("setAdvisorList success");
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (projectID) {
      axios
        .get(
          `https://api-seai-general.cyclic.app/general/search/${projectID}`,
          {
            headers: {
              access_token: aToken,
              refresh_token: rToken,
            },
          }
        )
        .then((response) => {
          setDataBeforeEdit(response.data);
          console.log("projectID from edit button: " + projectID);
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

  const postProjectCreate = () => {
    axios
      .post(
        "https://api-seai-general.cyclic.app/general/project",
        projectData,
        {
          headers: {
            access_token: aToken,
            refresh_token: rToken,
          },
        }
      )
      .then((response) => {
        console.log("create project success");
        console.log(response);
      })
      .catch((error) => console.log(error));
    console.log("aT and rT: " + aToken + "\n" + rToken);
  };

  const postProjectEdit = () => {
    axios
      .patch(
        `https://api-seai-general.cyclic.app/general/project${projectID}`,
        projectData,
        {
          headers: {
            access_token: aToken,
            refresh_token: rToken,
          },
        }
      )
      .then((response) => {
        console.log("edit project success");
        console.log(response);
      })
      .catch((error) => console.log(error));
    console.log("aT and rT: " + aToken + "\n" + rToken);
  };

  const [test, setTest] = useState({ IamTest: "" });

  const [keywordsStringTh, setKeywordsStringTh] = useState("");
  const [keywordsStringEn, setKeywordsStringEn] = useState("");

  const [projectData, setProjectData] = useState({
    thai: {
      document: {
        title: "",
        abstract: "",
        keywords: [],
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
        keywords: [],
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
    // const fruits = [
    //   "ABC",
    //   "การค้นหาแบบกริด",
    //   "การค้นหาแบบสุ่ม",
    //   "การจำแนกประเภท",
    //   "การปรับไฮเปอร์พารามิเตอร์",
    //   "การวิเคราะห์ความแปรปรวน",
    // ];
    const separator = "/";

    // const result = fruits.join(separator);

    // console.log("re: " + result);

    if (projectID && dataBeforeEdit?.data?.thai?.document?.keywords) {
      const keywordsThString =
        dataBeforeEdit?.data.thai.document.keywords.join(separator);

      console.log("keywordsThString: " + keywordsThString);

      setKeywordsStringTh(keywordsThString);
    }

    if (projectID && dataBeforeEdit?.data?.eng?.document?.keywords) {
      const keywordsEnString =
        dataBeforeEdit?.data.eng.document.keywords.join("/ ");

      setKeywordsStringEn(keywordsEnString);
    }

    console.log("test th น้อง: " + keywordsStringTh);
    console.log("test eng น้อง: " + keywordsStringEn);
  }, [dataBeforeEdit]);

  // useEffect(() => {
  //   console.log("test th น้อง: " + projectData.thai.document.keywords);
  //   console.log("test eng น้อง: " + projectData.eng.document.keywords);
  //   console.log("-------------------");
  // }, [projectData]);

  useEffect(() => {
    if (projectID) {
      const authorLength = dataBeforeEdit?.data?.eng?.author.length;

      setProjectData((prevState) => ({
        ...prevState,
        thai: {
          ...prevState.thai,
          document: {
            ...prevState.thai.document,
            title: dataBeforeEdit?.data?.thai?.document?.title || "",
            abstract: dataBeforeEdit?.data.thai?.document?.abstract || "",
            keywords: dataBeforeEdit?.data.thai?.document?.keywords || [],
          },
          advisor: prevState.thai.advisor.map((advisor, index) => ({
            ...advisor,
            prefix: dataBeforeEdit?.data?.thai?.advisor[index]?.prefix || "",
            first_name:
              dataBeforeEdit?.data?.thai?.advisor[index]?.first_name || "",
            middle_name:
              dataBeforeEdit?.data?.thai?.advisor[index]?.middle_name || "",
            last_name:
              dataBeforeEdit?.data?.thai?.advisor[index]?.last_name || "",
          })),
          author: prevState.thai.author.map((author, index) => ({
            ...author,
            prefix: dataBeforeEdit?.data?.thai?.author[index]?.prefix || "",
            first_name:
              dataBeforeEdit?.data?.thai?.author[index]?.first_name || "",
            middle_name:
              dataBeforeEdit?.data?.thai?.author[index]?.middle_name || "",
            last_name:
              dataBeforeEdit?.data?.thai?.author[index]?.last_name || "",
          })),
        },
        eng: {
          ...prevState.eng,
          document: {
            ...prevState.eng.document,
            title: dataBeforeEdit?.data?.eng?.document?.title || "",
            abstract: dataBeforeEdit?.data.eng?.document?.abstract || "",
            keywords: dataBeforeEdit?.data.eng?.document?.keywords || [],
          },
          advisor: prevState.eng.advisor.map((advisor, index) => ({
            ...advisor,
            prefix: dataBeforeEdit?.data?.eng?.advisor[index]?.prefix || "",
            first_name:
              dataBeforeEdit?.data?.eng?.advisor[index]?.first_name || "",
            middle_name:
              dataBeforeEdit?.data?.eng?.advisor[index]?.middle_name || "",
            last_name:
              dataBeforeEdit?.data?.eng?.advisor[index]?.last_name || "",
          })),
          author: prevState.eng.author.map((author, index) => ({
            ...author,
            prefix: dataBeforeEdit?.data?.eng?.author[index]?.prefix || "",
            first_name:
              dataBeforeEdit?.data?.eng?.author[index]?.first_name || "",
            middle_name:
              dataBeforeEdit?.data?.eng?.author[index]?.middle_name || "",
            last_name:
              dataBeforeEdit?.data?.eng?.author[index]?.last_name || "",
          })),
        },
        academic_year: dataBeforeEdit?.data.academic_year || "",
        degree: dataBeforeEdit?.data.degree || "",
        project_type: dataBeforeEdit?.data.project_type || "",
        // advisor_id: [...dataBeforeEdit?.data.advisor_id] || [],
      }));

      setAuthorNumber(authorLength);
      //   console.log("authorLength: " + authorLength);
      //   console.log("เช็คหลังก๊อป: " + projectData.eng.document?.title);
      //   console.log("เช็คหลังก๊อป degree: " + projectData.degree);
      //   console.log("เช็คหลังก๊อปth: " + projectData.thai.document?.title);
      //   console.log("-------------------");
      // } else {
      //   console.log("ไม่มีไอดี");
    }
  }, [dataBeforeEdit]);

  // useEffect(() => {
  //   console.log("ก่อนเผา: " + projectData.eng.document?.title);
  //   console.log("เผาตัวเองทำไมมม");
  //   console.log("-------------------");
  // }, [projectData]);

  // useEffect(() => {
  //   setTest({
  //     IamTest: dataBeforeEdit?.data.eng?.document?.title || "",
  //   });
  //   console.log("เช็ค iamtest หลังก๊อป: " + test.IamTest);
  //   console.log("-------------------");
  // }, [dataBeforeEdit]);

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
      setProjectData((prevState) => ({
        ...prevState,
        eng: {
          ...prevState.eng,
          document: {
            ...prevState.eng.document,
            [name]: event.target.value,
          },
        },
      }));
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

    for (let i = thaiAuthor.length - 1; i >= 1; i--) {
      console.log("testing !!");
      if (thaiAuthor[i].prefix === "") {
        thaiAuthor.splice(i, 1);
      }
    }

    for (let i = thaiAdvisor.length - 1; i >= 1; i--) {
      if (thaiAdvisor[i].prefix === "") {
        thaiAdvisor.splice(i, 1);
      }
    }

    for (let i = engAuthor.length - 1; i >= 1; i--) {
      if (engAuthor[i].prefix === "") {
        engAuthor.splice(i, 1);
      }
    }

    for (let i = engAdvisor.length - 1; i >= 1; i--) {
      if (engAdvisor[i].prefix === "") {
        engAdvisor.splice(i, 1);
      }
    }

    // const handleEmpty = () => {
    //   let fields = this.state.fields
    //   let errors = {};
    // let formIsValid = true;

    //   if (!fields["name"]){
    //     formIsValid = false;
    //     errors["name"] = "Cannot be empty";
    //   }
    //   this.setState({ errors: errors });
    //   return formIsValid;
    // }

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

  const sentOnlyEdit = () => {
    setProjectData((prevState) => ({
      ...prevState,
      thai: {
        ...prevState.thai,
        document: {
          ...prevState.thai.document,
          title:
            projectData?.thai?.document?.title !==
            dataBeforeEdit?.data?.thai?.document?.title
              ? projectData?.thai?.document?.title
              : "",
          abstract:
            projectData?.thai?.document?.abstract !==
            dataBeforeEdit?.data.thai?.document?.abstract
              ? projectData?.thai?.document?.abstract
              : "",
          keywords:
            projectData?.thai?.document?.keywords !==
            dataBeforeEdit?.data.thai?.document?.keywords
              ? projectData?.thai?.document?.keywords
              : [],
        },
        advisor: prevState.thai.advisor.map((advisor, index) => ({
          ...advisor,
          prefix:
            projectData?.thai?.advisor[index]?.prefix !==
            dataBeforeEdit?.data?.thai?.advisor[index]?.prefix
              ? projectData?.thai?.advisor[index]?.prefix
              : "",
          first_name:
            projectData?.thai?.advisor[index]?.first_name !==
            dataBeforeEdit?.data?.thai?.advisor[index]?.first_name
              ? projectData?.thai?.advisor[index]?.first_name
              : "",
          middle_name:
            projectData?.thai?.advisor[index]?.middle_name !==
            dataBeforeEdit?.data?.thai?.advisor[index]?.middle_name
              ? projectData?.thai?.advisor[index]?.middle_name
              : "",
          last_name:
            projectData?.thai?.advisor[index]?.last_name !==
            dataBeforeEdit?.data?.thai?.advisor[index]?.last_name
              ? projectData?.thai?.advisor[index]?.last_name
              : "",
        })),
        author: prevState.thai.author.map((author, index) => ({
          ...author,
          prefix:
            projectData?.thai?.author[index]?.prefix !==
            dataBeforeEdit?.data?.thai?.author[index]?.prefix
              ? projectData?.thai?.author[index]?.prefix
              : "",
          first_name:
            projectData?.thai?.author[index]?.first_name !==
            dataBeforeEdit?.data?.thai?.author[index]?.first_name
              ? projectData?.thai?.author[index]?.first_name
              : "",
          middle_name:
            projectData?.thai?.author[index]?.middle_name !==
            dataBeforeEdit?.data?.thai?.author[index]?.middle_name
              ? projectData?.thai?.author[index]?.middle_name
              : "",
          last_name:
            projectData?.thai?.author[index]?.last_name !==
            dataBeforeEdit?.data?.thai?.author[index]?.last_name
              ? projectData?.thai?.author[index]?.last_name
              : "",
        })),
      },
      eng: {
        ...prevState.eng,
        document: {
          ...prevState.eng.document,
          title:
            projectData?.eng?.document?.title !==
            dataBeforeEdit?.data?.eng?.document?.title
              ? "แก้สิวะ"
              : "",
          abstract:
            projectData?.eng?.document?.abstract !==
            dataBeforeEdit?.data.eng?.document?.abstract
              ? projectData?.eng?.document?.abstract
              : "",
          keywords:
            projectData?.eng?.document?.keywords !==
            dataBeforeEdit?.data.eng?.document?.keywords
              ? projectData?.eng?.document?.keywords
              : "",
        },
        advisor: prevState.eng.advisor.map((advisor, index) => ({
          ...advisor,
          prefix:
            projectData?.eng?.advisor[index]?.prefix !==
            dataBeforeEdit?.data?.eng?.advisor[index]?.prefix
              ? projectData?.eng?.advisor[index]?.prefix
              : "",
          first_name:
            projectData?.eng?.advisor[index]?.first_name !==
            dataBeforeEdit?.data?.eng?.advisor[index]?.first_name
              ? projectData?.eng?.advisor[index]?.first_name
              : "",
          middle_name:
            projectData?.eng?.advisor[index]?.middle_name !==
            dataBeforeEdit?.data?.eng?.advisor[index]?.middle_name
              ? projectData?.eng?.advisor[index]?.middle_name
              : "",
          last_name:
            projectData?.eng?.advisor[index]?.last_name !==
            dataBeforeEdit?.data?.eng?.advisor[index]?.last_name
              ? projectData?.eng?.advisor[index]?.last_name
              : "",
        })),
        author: prevState.eng.author.map((author, index) => ({
          ...author,
          prefix:
            projectData?.eng?.author[index]?.prefix ==
            dataBeforeEdit?.data?.eng?.author[index]?.prefix
              ? projectData?.eng?.author[index]?.prefix
              : "",
          first_name:
            projectData?.eng?.author[index]?.first_name ==
            dataBeforeEdit?.data?.eng?.author[index]?.first_name
              ? projectData?.eng?.author[index]?.first_name
              : "",
          middle_name:
            projectData?.eng?.author[index]?.middle_name ==
            dataBeforeEdit?.data?.eng?.author[index]?.middle_name
              ? projectData?.eng?.author[index]?.middle_name
              : "",
          last_name:
            projectData?.eng?.author[index]?.last_name ==
            dataBeforeEdit?.data?.eng?.author[index]?.last_name
              ? projectData?.eng?.author[index]?.last_name
              : "",
        })),
      },
      academic_year:
        projectData?.academic_year == dataBeforeEdit?.data.academic_year
          ? projectData?.academic_year
          : "",
      degree:
        projectData?.degree == dataBeforeEdit?.data.degree
          ? dataBeforeEdit?.degree
          : "",
      project_type:
        projectData?.project_type == dataBeforeEdit?.data.project_type
          ? dataBeforeEdit?.project_type
          : "",
      // advisor_id: [...dataBeforeEdit?.data.advisor_id] || [],
    }));
    const diff =
      projectData?.eng?.document?.title ==
      dataBeforeEdit?.data?.eng?.document?.title;
    console.log("how diff: " + diff);

    // console.log("ปริ้นเวอชั่นกูเอง : " + JSON.stringify(projectData));
  };

  // useEffect(() => {
  //   console.log("ปริ้นเวอชั่นกูเอง : " + JSON.stringify(projectData));
  //   console.log("---------------");
  // }, [projectData]);

  const validateAndPostData = () => {
    validateArrayData();
    printAllInput();
    if (addCase === true) {
      console.log("going to post new project");
      postProjectCreate();
    } else {
      sentOnlyEdit();
      console.log("filter la");
      printAllInput();
      console.log("going to post edit project");
    }
  };

  const handleKeywordsStringChange = (event) => {
    const { target } = event;
    const { name } = target;

    if (name === "keywordTh") {
      setKeywordsStringTh(event.target.value);
    }

    if (name === "keywordEn") {
      setKeywordsStringEn(event.target.value);
    }
  };

  useEffect(() => {
    const separator = "/";

    if (keywordsStringEn) {
      const trimmedKeywordEn = keywordsStringEn
        .split(separator)
        .map((keyword) => keyword.trim());
      setProjectData((prevData) => {
        return {
          ...prevData,
          eng: {
            ...prevData.eng,
            document: {
              ...prevData.eng.document,
              keywords: trimmedKeywordEn || [],
            },
          },
        };
      });
    }
    if (keywordsStringTh) {
      const trimmedKeywordTh = keywordsStringTh
        .split(separator)
        .map((keyword) => keyword.trim());
      setProjectData((prevData) => {
        return {
          ...prevData,
          thai: {
            ...prevData.thai,
            document: {
              ...prevData.thai.document,
              keywords: trimmedKeywordTh || [],
            },
          },
        };
      });

      console.log(
        ".thai.document.keywords: " + projectData.thai.document.keywords
      );
    }
  }, [keywordsStringEn, keywordsStringTh]);

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
                // if (projectData.eng.document?.title) {
                //   closePopup();
                //   validateAndSPostData();
                // } else {
                //   alert("Please enter a project title.");
                // }
                closePopup();
                validateAndPostData();
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
                      value={projectData.eng?.document.title}
                      onChange={handleEnDocumentChange}
                      name="title"
                      rows="2"
                    />
                  </div>
                </div>
                {test.IamTest}
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
                        value="master"
                        checked={projectData.degree === "master"}
                        onChange={handleSmallDataChange}
                      />
                      <label for="html">Master's degree</label>
                    </div>
                    <div className=" flex items-center">
                      <input
                        type="radio"
                        id="undergraduate's degree"
                        name="degree"
                        value="bachelor"
                        checked={projectData.degree === "bachelor"}
                        onChange={handleSmallDataChange}
                      />
                      <label for="html">Bachelor's degree</label>
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
                        value="thesis"
                        checked={projectData.project_type === "thesis"}
                        onChange={handleSmallDataChange}
                      />
                      <label for="html">Thesis</label>
                    </div>
                    <div className="pr-10 flex items-center">
                      <input
                        type="radio"
                        id="senior"
                        name="project_type"
                        value="senior"
                        checked={projectData.project_type === "senior"}
                        onChange={handleSmallDataChange}
                      />
                      <label for="html">Senior</label>
                    </div>
                    <div className=" flex items-center">
                      <input
                        type="radio"
                        id="wil"
                        name="project_type"
                        value="wil"
                        checked={projectData.project_type === "wil"}
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
                        value={keywordsStringEn}
                        onChange={handleKeywordsStringChange}
                        // name="keywords"
                        name="keywordEn"
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
                        value={keywordsStringTh}
                        onChange={handleKeywordsStringChange}
                        // name="keywords"
                        name="keywordTh"
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
