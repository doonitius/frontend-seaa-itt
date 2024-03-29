// import AddEditFilter from './AddEditFilter.js';
import DeleteProjectAlert from "./DeleteAlert.js";
import AddEditProject from "./AddEditProject.js";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faFile,
  faPenToSquare,
  faTrashCan,
  faEyeSlash,
  faEye,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const keywordsBox = (keywords) => (
  <div className="tagsBox">
    <span className="hightlight-blue">#</span>
    <span>{keywords}</span>
  </div>
);

function Banner({ eng, thai, year, projectId }) {
  // props.projectId
  const [popupStatus, setPopupStatus] = useState(false);
  const [popupComponent, setPopupComponent] = useState("");
  const [abstractStatus, setAbstractStatus] = useState(false);

  const isAdmin = true;

  // const projectId = props.projectId;

  // const baseURL = `http://localhost:3000/project/${props.projectId}`;
  // const baseURL = '{{url}}/project/' + projectId;

  function clickExitFromPopup() {
    setPopupStatus(!popupStatus);
  }

  function clickShowAbstract() {
    setAbstractStatus(!abstractStatus);
  }

  const [post, setPost] = useState(null);
  // console.log("aaaaaaa " + eng.document.title);
  const project_name = eng.document.title || "loading...";
  const project_year = year || "loading...";
  const project_abstract = eng.document.abstract || "loading...";
  const project_advisorPrefix = eng.advisor[0]?.prefix || "loading...";
  const project_advisorName = eng.advisor[0]?.first_name || "loading...";
  const project_keyword =
    eng.document.keywords &&
    eng.document.keywords.length != 0 &&
    eng.document.keywords != [""] &&
    eng.document.keywords != []
      ? eng.document.keywords
      : "";
  const project_keywordTh =
    thai.document.keywords &&
    thai.document.keywords.length != 0 &&
    thai.document.keywords != [""] &&
    thai.document.keywords != []
      ? thai.document.keywords
      : "";
  const project_advisorMidname = eng.advisor[0]?.middle_name;
  const project_AdvisorLastName = eng.advisor[0]?.last_name;
  const language = localStorage.getItem("Language");
  // const no_keyword =
  //   project_keyword === "" || project_keywordTh === "" ? "-" : "";

  // console.log("project_keyword: " + project_keyword);
  // const url = `https://api-seai-general-nn2mkxpf6q-as.a.run.app/general/project/${props.projectId}`;

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       // setLoadingResult(true);
  //       // await new Promise((resolve) => setTimeout(resolve, 2000));
  //       const response = await axios.get(url);
  //       setPost(response.data);
  //       // setLoadingResult(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchData();
  // }, [props.projectId]);

  // if (!post) {
  //     return <div class="loader-container">
  //     <div class="loader"></div>
  //     </div>
  // }

  // function handleOpenProjectPage() {
  //   // perform any necessary logout logic here
  //   // redirect the user to the homepage
  //   window.location.href = `/project/${props.projectId}`;
  // }

  function clickExitFromPopup() {
    setPopupStatus(!popupStatus);
  }
  return (
    <div>
      {popupStatus && popupComponent === "editProject" && (
        <AddEditProject
          closePopup={clickExitFromPopup}
          // addCase={false}
          projectID={projectId}
        />
      )}
      {popupStatus && popupComponent === "deleteProject" && (
        <DeleteProjectAlert closePopup={clickExitFromPopup} />
      )}
      <div>
        {/* <Link to={`/project/${props.projectId}`}> */}
        <div className="project-banner">
          <div className="flex w-full">
            <div className="project-banner-color"></div>
            {/* <div className="handle-flex"> */}
            <div className="project-banner-content w-full">
              {/* <span className='hightlight-blue text-sm'>Solving Vehicle Routing Problem with Hard Time Windows by Genetic Algorithm</span> */}
              {language == "eng" ? (
                <span className="hightlight-blue text-sm">{project_name}</span>
              ) : (
                <span className="hightlight-blue text-sm">
                  {thai.document.title}
                </span>
              )}

              <div className="text-xs pt-4">
                <div className="check-screen-width">
                  <div className="pr-10 handle-bottom">
                    <span className="hightlight-gray pr-3">Year: </span>
                    <span>{project_year} </span>
                  </div>
                  <div className="handle-flex ">
                    <div className="hightlight-gray handle-flex-bottom pr-3">
                      Advisor:
                    </div>
                    {language == "eng" ? (
                      <div className="">
                        <span className="pr-2">{project_advisorPrefix}</span>
                        <span className="pr-2">{project_advisorName}</span>
                        <span
                          className={
                            project_advisorMidname === null ? "" : "pr-2"
                          }
                        >
                          {project_advisorMidname}
                        </span>
                        <span>{project_AdvisorLastName}</span>
                      </div>
                    ) : (
                      <div className="">
                        <span className="pr-2">{thai.advisor[0].prefix}</span>
                        <span className="pr-2">
                          {thai.advisor[0].first_name}
                        </span>
                        <span
                          className={
                            thai.advisor[0].middle_name === null ? "" : "pr-2"
                          }
                        >
                          {thai.advisor[0].middle_name}
                        </span>
                        <span>{thai.advisor[0].last_name}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="handle-flex pt-3">
                  <div className="hightlight-gray pr-3 self-center handle-flex-bottom">
                    Keywords
                  </div>
                  <div className="flex flex-wrap">
                    {
                      <div className="flex flex-wrap  items-center ">
                        {Array.isArray(project_keyword) &&
                          project_keyword.map((keywords, index) => (
                            <div className="flex flex-wrap items-center">
                              <button
                                className="tagsBox items-center mr-1 mb-1 force-small-text"
                                key={index}
                                name="keywords"
                              >
                                <span className="hightlight-blue">#</span>
                                <span>{keywords}</span>
                              </button>
                            </div>
                          ))}
                      </div>
                    }
                    {
                      <div className="flex flex-wrap  items-center">
                        {Array.isArray(project_keywordTh) &&
                          project_keywordTh.map((keywords, index) => (
                            <div className="flex flex-wrap items-center">
                              <button
                                className="tagsBox items-center mr-1 mb-1 force-small-text"
                                key={index}
                                name="keywords"
                              >
                                <span className="hightlight-blue">#</span>
                                <span>{keywords}</span>
                              </button>
                            </div>
                          ))}
                      </div>
                    }
                    {project_keyword.length < 1 &&
                      project_keywordTh.length < 1 && <div>-</div>}
                  </div>
                </div>
                {/* <div className="flex pt-3" className={`${viewAbstractStatus ? 'popup-open' : null}`}> */}
                <div className="handle-flex pt-3 handle-view-project">
                  <div className="flex handle-flex-bottom2 handle-flex">
                    <div className="hightlight-gray pr-3 handle-flex-bottom">
                      Abstract:{" "}
                    </div>
                    <div className="">
                      <div
                        className={`project-abstract ${
                          abstractStatus ? "" : "hidden"
                        }`}
                      >
                        {language == "eng" ? (
                          <span> {project_abstract} </span>
                        ) : (
                          <span> {thai.document.abstract} </span>
                        )}
                      </div>
                      <button
                        className="hightlight-blue justify-start underline decoration-1 underline-offset-2 flex items-center"
                        onClick={() => {
                          clickShowAbstract(true);
                        }}
                      >
                        {abstractStatus ? "hide abstract" : "view abstract"}
                        <FontAwesomeIcon
                          icon={abstractStatus ? faEyeSlash : faEye}
                          className="ml-1"
                        />
                      </button>
                    </div>
                  </div>
                  <div className=" project-banner-menu self-end">
                    <Link to={`/project/${projectId}`}>
                      <div className=" project-banner-menu-viewProject inset-x-0 bottom-0 items-center">
                        View Project
                        <FontAwesomeIcon icon={faArrowRight} className="pl-2" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* <div className="w-full project-banner-menu grid force-end">
                <Link to={`/project/${projectId}`}>
                  <div className=" project-banner-menu-viewProject inset-x-0 bottom-0 items-center ">
                    View Project
                    <FontAwesomeIcon icon={faArrowRight} />
                  </div>
                </Link>
              </div> */}
            </div>
            {/* <div className="w-full project-banner-menu ">
              <Link to={`/project/${projectId}`}>
                <div className="project-banner-menu-viewProject inset-x-0 bottom-0 items-center ">
                  View Project
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </Link>
            </div> */}
            {/* </div> */}
          </div>
        </div>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default Banner;
