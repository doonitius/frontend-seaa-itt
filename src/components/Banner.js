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
  // const no_keyword =
  //   project_keyword === "" || project_keywordTh === "" ? "-" : "";

  // console.log("project_keyword: " + project_keyword);
  // const url = `https://api-seai-general.cyclic.app/general/project/${props.projectId}`;

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
        <div className="project-banner justify-between">
          <div className="flex">
            <div className="project-banner-color"></div>
            <div className="project-banner-content">
              {/* <span className='hightlight-blue text-sm'>Solving Vehicle Routing Problem with Hard Time Windows by Genetic Algorithm</span> */}
              <span className="hightlight-blue text-sm">{project_name}</span>
              <div className="text-xs pt-4">
                <div className="check-screen-width">
                  <div className="pr-10 handle-bottom">
                    <span className="hightlight-gray pr-3">Year: </span>
                    <span>{project_year} </span>
                  </div>
                  <div>
                    <span className="hightlight-gray pr-3">Advisor: </span>
                    <span className="pr-2">{project_advisorPrefix}</span>
                    <span className="pr-2">{project_advisorName}</span>

                    <span
                      className={project_advisorMidname === null ? "" : "pr-2"}
                    >
                      {project_advisorMidname}
                    </span>
                    <span>{project_AdvisorLastName}</span>
                  </div>
                </div>
                {/* <div className="flex pt-3">
                  <span className="hightlight-gray pr-3 pt-1">Tags: </span>
                  <div className="tagsArea">
                    <Tags />
                    <Tags />
                    <Tags />
                    <Tags />
                    <Tags />
                  </div>
                </div> */}
                {}
                <div className="flex pt-3">
                  <div className="hightlight-gray pr-3 self-center">
                    Keywords
                  </div>{" "}
                  <div>
                    {
                      <div className="flex flex-wrap space-y-1 items-center">
                        {Array.isArray(project_keyword) &&
                          project_keyword.map((keywords, index) => (
                            <div className="flex flex-wrap items-center">
                              <button
                                className="tagsBox items-center mr-1"
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
                      <div className="flex flex-wrap space-y-1 items-center">
                        {Array.isArray(project_keywordTh) &&
                          project_keywordTh.map((keywords, index) => (
                            <div className="flex flex-wrap items-center">
                              <button
                                className="tagsBox items-center mr-1"
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
                <div className="flex pt-3">
                  <span className="hightlight-gray pr-3">Abstract: </span>
                  <div>
                    <div
                      className={`project-abstract ${
                        abstractStatus ? "" : "hidden"
                      }`}
                    >
                      <span> {project_abstract} </span>
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
              </div>
            </div>
          </div>
          <div className="project-banner-menu content-end grid justify-items-end">
            {/* content-end / content-between */}

            {/* {isAdmin && (
              <div className="space-y-2">
                <div
                  className="project-banner-menu-edit items-center flex"
                  onClick={() => {
                    setPopupStatus(true);
                    setPopupComponent("editProject");
                  }}
                >
                  <FontAwesomeIcon
                    className="justify-center"
                    icon={faPenToSquare}
                  />
                  <div className="">Edit</div>
                </div>
                <div
                  className="project-banner-menu-delete items-center flex"
                  onClick={() => {
                    setPopupStatus(true);
                    setPopupComponent("deleteProject");
                  }}
                >
                  <FontAwesomeIcon
                    className="justify-center"
                    icon={faTrashCan}
                  />
                  <div className="">Delete</div>
                </div>
              </div>
            )} */}
            {/* <div></div> */}
            <Link to={`/project/${projectId}`}>
              <div className="project-banner-menu-viewProject inset-x-0 bottom-0 items-center">
                View Project
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
            </Link>
          </div>
        </div>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default Banner;
