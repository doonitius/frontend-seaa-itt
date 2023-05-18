// const inputFilter = () => (
//     <div className="filter-input-area">
//         <div>
//             <input type="radio" name="Advisor Filter" value="Option 1"/> Asst. Prof. Dr. Santitham
//         </div>
//     </div>
// )
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

function AddEditProject({
  closePopup,
  addCase,
  projectID,
  eng,
  thai,
  projectInfo,
}) {
  const academicYearChoice = [2018, 2019, 2020, 2021, 2023];
  // const [loading, setLoading] = useState(true);
  const [advisorList, setAdvisorList] = useState(null);
  // const [dataBeforeEdit, setDataBeforeEdit] = useState(null);
  // const checkLoading = eng?.document?.title || "loading...";
  const [authorNumber, setAuthorNumber] = useState(eng?.author?.length ?? 1);
  const [loadingResult, setLoadingResult] = useState(true);
  const [selectedAdvisor, setSelectedAdvisor] = useState(
    projectInfo?.advisor_id?.length > 0
      ? JSON.stringify([
          projectInfo.advisor_id[0],
          eng.advisor[0].prefix,
          eng.advisor[0].first_name,
          eng.advisor[0].middle_name,
          eng.advisor[0].last_name,
          thai.advisor[0].prefix,
          thai.advisor[0].first_name,
          thai.advisor[0].middle_name,
          thai.advisor[0].last_name,
        ])
      : ""
  );
  const [selectedCoAdvisor, setSelectedCoAdvisor] = useState(
    projectInfo?.advisor_id?.length > 1 ? projectInfo?.advisor_id[1] : ""
  );

  const aToken = localStorage.getItem("Access_Token");
  const rToken = localStorage.getItem("Refresh_Token");

  // const aTokenNoQuotes = aToken.replace(/"/g, "");
  // const rTokenNoQuotes = rToken.replace(/"/g, "");
  const printAllInput = () => {
    console.log("printAllInput : " + JSON.stringify(projectData));
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoadingResult(true);
        const response = await axios.get(
          "https://api-seai-general-nn2mkxpf6q-as.a.run.app/general/advisor?search=",
          {
            headers: {
              access_token: aToken,
              refresh_token: rToken,
            },
          }
        );

        setAdvisorList(response.data);
        setLoadingResult(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (aToken && rToken) {
      async function fetchData() {
        try {
          setLoadingResult(true);
          const response = await axios.post(
            "https://api-seai-general-nn2mkxpf6q-as.a.run.app/general/auth/refresh",
            null,
            {
              headers: {
                access_token: aToken,
                refresh_token: rToken,
              },
            }
          );
          console.log("refresh access token");
          console.log(response);
          // localStorage.setItem("Access_Token", response.access_token);
          // localStorage.setItem("Refresh_Token", response.refresh_token);
          // localStorage.setItem("User_Name", response.username);
          // const aTokenRefresh = localStorage.getItem("Access_Token");
          // const rTokenRefresh = localStorage.getItem("Refresh_Token");
          // console.log("Access_Token: " + aTokenRefresh);
          // console.log("Refresh_Token: " + rTokenRefresh);
          setLoadingResult(false);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }
  }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       if (projectID) {
  //         const response = await axios.get(
  //           `https://api-seai-general-nn2mkxpf6q-as.a.run.app/general/search/${projectID}`,
  //           {
  //             headers: {
  //               access_token: aToken,
  //               refresh_token: rToken,
  //             },
  //           }
  //         );

  //         setDataBeforeEdit(response.data.data);
  //         console.log("projectIDDDD: " + projectID);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  // Assuming you have received the response from the backend as `response`
  const isTokenExpired = (response) => {
    if (response.code === "expired") {
      return true; // Access token has expired
    }
    return false; // Access token is still valid
  };

  const postProjectCreate = async () => {
    async function fetchData() {
      try {
        setLoadingResult(true);
        const response = await axios.post(
          "https://api-seai-general-nn2mkxpf6q-as.a.run.app/general/project",
          projectData,
          {
            headers: {
              access_token: aToken,
              refresh_token: rToken,
            },
          }
        );
        console.log(response);
        console.log("create project success");
        console.log(
          "check create project data: title : " + projectData.eng.document.title
        );
        if (isTokenExpired(response) == true) {
          alert("Access Token expired1");
          localStorage.setItem("Check_admin", false);
        }
      } catch (error) {
        console.log(error);
        console.log("aT and rT: but im error: " + aToken + "\n" + rToken);
        if (isTokenExpired(error) == true) {
          alert("Access Token expired2");
          localStorage.setItem("Check_admin", false);
        }
      }
    }
    fetchData();
    setLoadingResult(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    reloadLocation();
  };

  const reloadLocation = () => {
    window.location.reload();
  };

  const postProjectEdit = async () => {
    async function fetchData() {
      try {
        setLoadingResult(true);
        // const filteredData = compareFields(projectData, dataBeforeEdit);
        console.log("projectData: " + JSON.stringify(projectData));
        console.log("filteredData: " + JSON.stringify(filteredData));
        // console.log("filteredData: " + filteredData);
        console.log("=====================");
        // console.log("filteredData from edit post: " + filteredData);
        const url = `https://api-seai-general-nn2mkxpf6q-as.a.run.app/general/project/${projectID}`;
        console.log("url: " + url);

        const response = await axios.patch(url, projectData, {
          headers: {
            access_token: aToken,
            refresh_token: rToken,
          },
        });

        console.log(response);

        console.log("edit project success");
        console.log(
          "check edit project data: title : " + projectData.eng.document.title
        );
      } catch (error) {
        console.log(error);
        console.log("aT and rT: but im error: " + aToken + "\n" + rToken);
        if (error.message == "Request failed with status code 401") {
          alert("Access Token expired");
          localStorage.setItem("Access_Token", "");
          localStorage.setItem("Refresh_Token", "");
          localStorage.setItem("User_Name", "");
          localStorage.setItem("Check_admin", "");
        }
      }
    }
    fetchData();
    setLoadingResult(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    reloadLocation();
  };

  const [test, setTest] = useState({ IamTest: "" });
  const [filteredData, setFilteredData] = useState();

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
    const separator = "/";

    if (projectID && thai?.document?.keywords) {
      const keywordsThString = thai?.document.keywords.join(separator);

      console.log("keywordsThString: " + keywordsThString);

      setKeywordsStringTh(keywordsThString);
    }

    if (projectID && eng?.document?.keywords) {
      const keywordsEnString = eng?.document.keywords.join("/ ");

      setKeywordsStringEn(keywordsEnString);
    }

    console.log("test th น้อง: " + keywordsStringTh);
    console.log("test eng น้อง: " + keywordsStringEn);
  }, [thai, eng]);

  // useEffect(() => {
  //   console.log("test th น้อง: " + projectData.thai.document.keywords);
  //   console.log("test eng น้อง: " + projectData.eng.document.keywords);
  //   console.log("-------------------");
  // }, [projectData]);

  useEffect(() => {
    if (projectID) {
      const authorLength = eng?.author.length;

      setProjectData((prevState) => ({
        ...prevState,
        thai: {
          ...prevState.thai,
          document: {
            ...prevState.thai.document,
            title: thai?.document?.title || "",
            abstract: thai?.document?.abstract || "",
            keywords: thai?.document?.keywords || [],
          },
          advisor: prevState.thai.advisor.map((advisor, index) => ({
            ...advisor,
            prefix: thai?.advisor[index]?.prefix || "",
            first_name: thai?.advisor[index]?.first_name || "",
            middle_name: thai?.advisor[index]?.middle_name || "",
            last_name: thai?.advisor[index]?.last_name || "",
          })),
          author: prevState.thai.author.map((author, index) => ({
            ...author,
            prefix: thai?.author[index]?.prefix || "",
            first_name: thai?.author[index]?.first_name || "",
            middle_name: thai?.author[index]?.middle_name || "",
            last_name: thai?.author[index]?.last_name || "",
          })),
        },
        eng: {
          ...prevState.eng,
          document: {
            ...prevState.eng.document,
            title: eng?.document?.title || "",
            abstract: eng?.document?.abstract || "",
            keywords: eng?.document?.keywords || [],
          },
          advisor: prevState.eng.advisor.map((advisor, index) => ({
            ...advisor,
            prefix: eng?.advisor[index]?.prefix || "",
            first_name: eng?.advisor[index]?.first_name || "",
            middle_name: eng?.advisor[index]?.middle_name || "",
            last_name: eng?.advisor[index]?.last_name || "",
          })),
          author: prevState.eng.author.map((author, index) => ({
            ...author,
            prefix: eng?.author[index]?.prefix || "",
            first_name: eng?.author[index]?.first_name || "",
            middle_name: eng?.author[index]?.middle_name || "",
            last_name: eng?.author[index]?.last_name || "",
          })),
        },
        academic_year: projectInfo?.academic_year || "",
        degree: projectInfo?.degree || "",
        project_type: projectInfo?.project_type || "",
      }));

      console.log("eng data props before Edit: " + projectInfo);

      setAuthorNumber(authorLength);
    }
  }, [thai, eng, projectInfo]);

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

  // advisor._id,
  //                           advisor.eng.prefix,
  //                           advisor.eng.first_name,
  //                           advisor.eng.middle_name,
  //                           advisor.eng.last_name,
  //                           advisor.thai.prefix,
  //                           advisor.thai.first_name,
  //                           advisor.thai.middle_name,
  //                           advisor.thai.last_name,
  const handleAdvisorOptionChange = (event) => {
    const selectedValue = JSON.parse(event.target.value);
    console.log(selectedValue[0]);
    setSelectedAdvisor(selectedValue);

    setProjectData({
      ...projectData,
      advisor_id: [selectedValue[0]],
      eng: {
        ...projectData.eng,
        advisor: [
          {
            prefix: selectedValue[1],
            first_name: selectedValue[2],
            middle_name: selectedValue[3] !== "" ? selectedValue[3] : null,
            last_name: selectedValue[4],
          },
        ],
      },
      thai: {
        ...projectData.thai,
        advisor: [
          {
            prefix: selectedValue[5],
            first_name: selectedValue[6],
            middle_name: selectedValue[7] !== "" ? selectedValue[7] : null,
            last_name: selectedValue[8],
          },
        ],
      },
    });
    // console.log("test advisor name: " + projectData.eng.advisor[0].first_name);
  };
  // useEffect(()=> {

  // })

  const handleCoAdvisorOptionChange = (event) => {
    const selectedValue = JSON.parse(event.target.value);
    console.log(selectedValue[0]);
    setSelectedCoAdvisor(selectedValue);

    setProjectData((prevData) => ({
      ...prevData,
      advisor_id: [projectData.advisor_id[0] ?? null, selectedValue[0]],
      eng: {
        ...prevData.eng,
        advisor: [
          ...prevData.eng.advisor.slice(0, 1),
          {
            prefix: selectedValue[1],
            first_name: selectedValue[2],
            middle_name: selectedValue[3] !== "" ? selectedValue[3] : null,
            last_name: selectedValue[4],
          },
        ],
      },
      thai: {
        ...prevData.thai,
        advisor: [
          ...prevData.thai.advisor.slice(0, 1),
          {
            prefix: selectedValue[5],
            first_name: selectedValue[6],
            middle_name: selectedValue[7] !== "" ? selectedValue[7] : null,
            last_name: selectedValue[8],
          },
        ],
      },
    }));
    // console.log(
    //   "check projectData.eng.advisor: " + JSON.parse(projectData.eng.advisor)
    // );
    // console.log(
    //   "test co-advisor name: " + projectData.eng.advisor[1].first_name
    // );
  };
  // useEffect(() => {
  //   console.log("test advisor name: " + projectData.eng.advisor[0].first_name);
  // }, [projectData.eng.advisor[0]]);

  // useEffect(() => {
  //   if (projectData.eng.advisor[1]) {
  //     console.log(
  //       "test co-advisor name: " + projectData.eng.advisor[1].first_name
  //     );
  //   }
  // }, [projectData.eng.advisor[1]]);

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

  const compareFields = (objA, objB) => {
    const filteredData = {};

    for (const key in objA) {
      if (typeof objA[key] === "object") {
        const nestedFields = compareFields(objA[key], objB[key]);
        if (Object.keys(nestedFields).length > 0) {
          filteredData[key] = nestedFields;
        }
      } else {
        if (objA[key] !== objB[key]) {
          filteredData[key] = objA[key];
        }
      }
    }

    return filteredData;
  };

  // useEffect(() => {
  //   console.log("ปริ้นเวอชั่นกูเอง : " + JSON.stringify(projectData));
  //   console.log("---------------");
  // }, [projectData]);

  const validateAndPostData = () => {
    // validateArrayData(); //checkArray of Author and Advisor to delete array if it more than [1] with unnecessary
    // printAllInwput();
    if (addCase === true) {
      console.log("going to post new project");
      postProjectCreate();
    } else {
      console.log("going to post edit project");
      postProjectEdit();
    }
  };

  // useEffect(() => {
  //   console.log("projectData useEffect");
  //   printAllInput();
  //   console.log("============================");
  // }, [projectData]);

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
    }

    // console.log(
    //   ".eng.document.keywords: " +
    //     JSON.stringify(projectData.eng.document.keywords)
    // );

    // console.log(
    //   ".thai.document.keywords: " +
    //     JSON.stringify(projectData.thai.document.keywords)
    // );
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
            <FontAwesomeIcon
              className="fa-xl self-center"
              icon={faXmarkCircle}
              onClick={closePopup}
              style={{ color: "white" }}
            />
            {/* <div
              className="border-2 rounded-lg px-3 py-2 text-sm"
              onClick={closePopup}
            >
              Close
            </div> */}
            {/* <button
              className="blue-button text-sm py-2 px-4 w-28"
              onClick={() => {
                if (
                  !projectData.eng.document?.title ||
                  !projectData.thai.document?.title ||
                  !projectData.degree ||
                  !projectData.project_type ||
                  !projectData.academic_year
                ) {
                  alert(
                    "Please enter \nproject title (eng)\nproject title (thai)\ndegree\nproject type\nacademic year"
                  );
                } else if (!projectData.advisor_id[0]) {
                  alert("Please select advisor");
                } else if (
                  !projectData.eng.author[0].prefix ||
                  !projectData.eng.author[0].first_name ||
                  !projectData.eng.author[0].last_name ||
                  !projectData.thai.author[0].prefix ||
                  !projectData.thai.author[0].first_name ||
                  !projectData.thai.author[0].last_name
                ) {
                  alert("Please input author1 information");
                } else if (authorNumber >= 2) {
                  if (
                    !projectData.eng.author[1].prefix ||
                    !projectData.eng.author[1].first_name ||
                    !projectData.eng.author[1].last_name ||
                    !projectData.thai.author[1].prefix ||
                    !projectData.thai.author[1].first_name ||
                    !projectData.thai.author[1].last_name
                  ) {
                    alert(
                      "Please input author2 information\nor delete author2 before sending data"
                    );
                  } else if (authorNumber >= 3) {
                    if (
                      !projectData.eng.author[2].prefix ||
                      !projectData.eng.author[2].first_name ||
                      !projectData.eng.author[2].last_name ||
                      !projectData.thai.author[2].prefix ||
                      !projectData.thai.author[2].first_name ||
                      !projectData.thai.author[2].last_name
                    ) {
                      alert(
                        "Please input author3 information\nor delete author3 before sending data"
                      );
                    } else {
                      // console.log("เก่งมาก");
                      validateAndPostData();
                    }
                  } else {
                    // console.log("เก่งมาก");
                    validateAndPostData();
                  }
                } else {
                  // console.log("เก่งมาก");
                  validateAndPostData();
                }
                // closePopup();
                // validateAndSPostData();
                // if (addCase === true) {
                //   console.log("going to post new project");
                //   postProjectCreate();
                // } else {
                //   console.log("going to post edit project");
                //   postProjectEdit();
                // }
                // closePopup();
              }}
            >
              Confirm
            </button> */}
          </div>
        </div>

        <div className="popup-content space-y-10" style={{ height: "70vh" }}>
          {loadingResult ? (
            <div className="grid justify-items-center py-36">
              <div className="loader"></div>
            </div>
          ) : (
            <div className="space-y-10">
              {/* <div className={`${props.addCase === false ? 'hidden' : ''}`}>
                            <div>I'm add case</div>
                        </div> */}
              <div className="space-y-4">
                <div className="handle-flex items-center">
                  <div className="basis-1/4 pr-10 handle-flex handle-flex-bottom">
                    Project Title :
                  </div>
                  <div className="basis-3/4">
                    {/* {isEditEnTitle ? (<div>{projectData.eng?.document.title}</div>) :(<div></div>)} */}
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
                {/* {test.IamTest} */}
                <div className="handle-flex items-center">
                  <div className="basis-1/4 pr-10 handle-flex-bottom">
                    ชื่อโครงการ :
                  </div>
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
                <div className="handle-flex items-center">
                  <div className="basis-1/4 pr-10 handle-flex-bottom">
                    Abstract :
                  </div>
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
                <div className="handle-flex items-center">
                  <div className="basis-1/4 pr-10 handle-flex-bottom">
                    ภาคผนวก :
                  </div>
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
                <div className="handle-flex items-center">
                  <div className="basis-1/4 pr-10 handle-flex-bottom">
                    Degree :
                  </div>
                  <div className="handle-flex basis-3/4 ">
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
                <div className="handle-flex items-center">
                  <div className="basis-1/4 pr-10 handle-flex-bottom">
                    Project type :
                  </div>
                  <div className="handle-flex basis-3/4 ">
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
                <div className="handle-flex items-center">
                  <div className="basis-1/4 pr-10 handle-flex-bottom">
                    Keyword :
                  </div>
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
                <div className="handle-flex items-center">
                  <div className="basis-1/4 pr-10 handle-flex-bottom">
                    คำสำคัญ :
                  </div>
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

              <div className="handle-flex items-center">
                <div className="basis-1/4 pr-10 handle-flex-bottom">
                  Academic Year :
                </div>
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
                <div className="handle-flex pb-6 items-center">
                  <div className="basis-1/4 pr-10 handle-flex-bottom">
                    Advisor :
                  </div>
                  <div className="basis-3/4">
                    <select
                      className="custom-selector"
                      value={JSON.stringify(selectedAdvisor)}
                      onChange={handleAdvisorOptionChange}
                      style={{ width: "320px" }}
                    >
                      <option value="">--Advisor--</option>
                      {advisorList?.data?.map((advisor, index) => (
                        <option
                          value={JSON.stringify([
                            advisor._id,
                            advisor.eng.prefix,
                            advisor.eng.first_name,
                            advisor.eng.middle_name,
                            advisor.eng.last_name,
                            advisor.thai.prefix,
                            advisor.thai.first_name,
                            advisor.thai.middle_name,
                            advisor.thai.last_name,
                          ])}
                          key={index}
                        >
                          {advisorList?.data[index].eng.prefix +
                            " " +
                            advisorList?.data[index].eng.full_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="handle-flex items-center">
                  <div className="basis-1/4 pr-10 handle-flex-bottom">
                    Co-Advisor :
                  </div>
                  <div className="basis-3/4">
                    <select
                      className="custom-selector"
                      value={JSON.stringify(selectedCoAdvisor)}
                      onChange={handleCoAdvisorOptionChange}
                      style={{ width: "320px" }}
                    >
                      <option value="">--Co-Advisor--</option>
                      {advisorList?.data?.map((advisor, index) => (
                        <option
                          value={JSON.stringify([
                            advisor._id,
                            advisor.eng.prefix,
                            advisor.eng.first_name,
                            advisor.eng.middle_name,
                            advisor.eng.last_name,
                            advisor.thai.prefix,
                            advisor.thai.first_name,
                            advisor.thai.middle_name,
                            advisor.thai.last_name,
                          ])}
                          key={index}
                        >
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
        <div className="popup-tailer justify-end items-center py-3 px-8">
          <button
            className="blue-button confirm-button text-sm py-2 px-4 w-28"
            onClick={() => {
              if (
                !projectData.eng.document?.title ||
                !projectData.thai.document?.title ||
                !projectData.degree ||
                !projectData.project_type ||
                !projectData.academic_year
              ) {
                alert(
                  "Please enter \nproject title (eng)\nproject title (thai)\ndegree\nproject type\nacademic year"
                );
              } else if (!projectData.advisor_id[0]) {
                alert("Please select advisor");
              } else if (
                !projectData.eng.author[0].prefix ||
                !projectData.eng.author[0].first_name ||
                !projectData.eng.author[0].last_name ||
                !projectData.thai.author[0].prefix ||
                !projectData.thai.author[0].first_name ||
                !projectData.thai.author[0].last_name
              ) {
                alert("Please input author1 information");
              } else if (authorNumber >= 2) {
                if (
                  !projectData.eng.author[1].prefix ||
                  !projectData.eng.author[1].first_name ||
                  !projectData.eng.author[1].last_name ||
                  !projectData.thai.author[1].prefix ||
                  !projectData.thai.author[1].first_name ||
                  !projectData.thai.author[1].last_name
                ) {
                  alert(
                    "Please input author2 information\nor delete author2 before sending data"
                  );
                } else if (authorNumber >= 3) {
                  if (
                    !projectData.eng.author[2].prefix ||
                    !projectData.eng.author[2].first_name ||
                    !projectData.eng.author[2].last_name ||
                    !projectData.thai.author[2].prefix ||
                    !projectData.thai.author[2].first_name ||
                    !projectData.thai.author[2].last_name
                  ) {
                    alert(
                      "Please input author3 information\nor delete author3 before sending data"
                    );
                  } else {
                    // console.log("เก่งมาก");
                    validateAndPostData();
                  }
                } else {
                  // console.log("เก่งมาก");
                  validateAndPostData();
                }
              } else {
                // console.log("เก่งมาก");
                validateAndPostData();
              }
              // closePopup();
              // validateAndSPostData();
              // if (addCase === true) {
              //   console.log("going to post new project");
              //   postProjectCreate();
              // } else {
              //   console.log("going to post edit project");
              //   postProjectEdit();
              // }
              // closePopup();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
export default AddEditProject;
