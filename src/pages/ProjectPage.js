import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import EditPDFFile from "../components/EditPDFFile";
import DeleteProjectAlert from "../components/DeleteAlert.js";
import AddEditProject from "../components/AddEditProject.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCircleXmark,
  faFilePdf,
  faPenToSquare,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import jwt_decode from "jwt-decode";

function ProjectPage(props) {
  const { projectId } = useParams();
  const [post, setPost] = useState(null);
  const [popupStatus, setPopupStatus] = useState(false);
  const [popupComponent, setPopupComponent] = useState("");
  const navigate = useNavigate();
  const project_name = post?.data?.eng.document.title || "loading...";
  const project_abstract_en = post?.data?.eng.document.abstract || "loading...";
  const project_attachment_file = post?.data?.file_name || null;
  const [projectPDFLink, setProjectPDFLink] = useState(
    "a357ab9e-f1d7-4b7a-90ba-15fed36082aa.pdf"
  );
  const isAdmin0 = true;
  const aToken = localStorage.getItem("Access_Token");
  const rToken = localStorage.getItem("Refresh_Token");
  const isAdmin = localStorage.getItem("Check_admin");
  const language = localStorage.getItem("Language");
  const [loadingResult, setLoadingResult] = useState(true);
  const project_keyword =
    post?.data?.eng?.document.keywords &&
    post?.data?.eng?.document.keywords.length != 0 &&
    post?.data?.eng?.document.keywords != [""] &&
    post?.data?.eng?.document.keywords != []
      ? post?.data?.eng?.document.keywords
      : "";
  const project_keywordTh =
    post?.data?.thai?.document.keywords &&
    post?.data?.thai?.document.keywords.length != 0 &&
    post?.data?.thai?.document.keywords != [""] &&
    post?.data?.thai?.document.keywords != []
      ? post?.data?.thai?.document.keywords
      : "";

  const [isNotExist, setIsNotExist] = useState(false);

  // const lang = "thai";

  // const AccessToken = jwt_decode(localStorage.getItem("Access_Token"));
  // const RefreshToken = jwt_decode(localStorage.getItem("Refresh_Token"));
  // const [accessToken, setAccessToken] = useState();
  // const AccessToken = JSON.parse(localStorage.getItem("Access_Token"));
  // const RefreshToken = localStorage.getItem("Refresh_Token");
  // const Access
  // const AccessTokenValue = AccessToken["AccessToken"];
  // const RefreshTokenValue = RefreshToken.RefreshToken;
  // const [jwtAccessToken, setJwtAccessToken] = useState({
  //   username: "",
  //   access_token: "",
  //   refresh_token: "",
  // });

  function handleGoBack() {
    window.location.href = "/";
  }

  function handleViewFile() {
    console.log(project_attachment_file);
    window.open(
      `https://api-seai-general-nn2mkxpf6q-as.a.run.app/general/search/${project_attachment_file}/preview`,
      "_blank"
    );
  }

  // async function handleViewFile() {
  //   console.log(project_attachment_file);
  //   try {
  //     await fetch(
  //       `https://api-seai-general-nn2mkxpf6q-as.a.run.app/general/search/${project_attachment_file}/preview`
  //     );
  //     window.open(
  //       `https://api-seai-general-nn2mkxpf6q-as.a.run.app/general/search/${project_attachment_file}/preview`,
  //       "_blank"
  //     );
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }

  function clickExitFromPopup() {
    setPopupStatus(!popupStatus);
  }

  function waitDataFromEditConfirm() {
    console.log("จะหมุนรอละนะ");
  }

  // useEffect(() => {
  //   setAccessToken(JSON.parse(localStorage.getItem("Access_Token")));
  //   jwt.decode(accessToken);
  // }, []);

  const getAccessToken = () => {
    // setAccessToken(JSON.parse(localStorage.getItem("Access_Token")));
    // var jwtAccessToken = jwt_decode(accessToken);
  };

  // useEffect(() => {
  //   setAccessToken(JSON.parse(localStorage.getItem("Access_Token")));
  //   console.log("accessToken123 " + accessToken);
  //   if (accessToken) {
  //     // setAccessToken(JSON.parse(localStorage.getItem("Access_Token")));
  //     var jwtAccessToken = jwt_decode(accessToken);
  //     console.log({ jwtAccessToken });
  //   }
  // }, [accessToken]);

  useEffect(() => {
    // setAccessToken(JSON.parse(localStorage.getItem("Access_Token")));
    // var jwtAccessToken = jwt_decode(accessToken);
    // console.log("accessToken123 " + accessToken);
    // console.log({ AccessToken });
    // console.log({ RefreshToken });
    // console.log({ jwtAccessToken });
    // console.log("projectid from param +++ " + projectId);
    async function fetchData() {
      try {
        setLoadingResult(true);
        const response = await axios.get(
          `https://api-seai-general-nn2mkxpf6q-as.a.run.app/general/search/${projectId}`,
          {
            headers: {
              access_token: aToken,
              refresh_token: rToken,
            },
          }
        );

        setPost(response.data);
        console.log("pass get from project page");
        setLoadingResult(false);
      } catch (error) {
        if (error.message == "Request failed with status code 404") {
          setIsNotExist(true);
          setLoadingResult(false);
        }
        console.log("An error occurred get projectId in ProjectPage");
        console.log(error);
      }
    }
    fetchData();
  }, [projectId]);

  // useEffect(() => {
  //   console.log("post?.data?.eng: " + post?.data?.eng);
  // }, [post]);
  // a357ab9e-f1d7-4b7a-90ba-15fed36082aa.pdf

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://api-seai-general-nn2mkxpf6q-as.a.run.app/general/project/${project_attachment_file}/preview`
  //     )
  //     .then((response) => {
  //       setProjectPDFLink(response.data);
  //       console.log("get PDF link : " + projectPDFLink);
  //     })
  //     .catch((error) => {
  //       console.log("An error occurred get project PDF file in ProjectPage");
  //       console.log(error);
  //     });
  // }, [projectPDFLink]);

  return (
    <div>
      {popupStatus && popupComponent === "editFile" && (
        <EditPDFFile
          closePopup={clickExitFromPopup}
          editConfirm={waitDataFromEditConfirm}
          projectID={post?.data?.project_id}
          projectFile={project_attachment_file}
        />
      )}
      {popupStatus && popupComponent === "editProject" && (
        <AddEditProject
          closePopup={clickExitFromPopup}
          addCase={false}
          projectID={post?.data?.project_id}
          eng={post?.data?.eng}
          thai={post?.data?.thai}
          projectInfo={post?.data}
        />
      )}
      {popupStatus && popupComponent === "deleteProject" && (
        <DeleteProjectAlert
          closePopup={clickExitFromPopup}
          projectID={post?.data?.project_id}
        />
      )}
      <Navbar searchFunction={false} />
      <div className="wrapper">
        <div className="w-full">
          <div className="fixed w-full bg-white pt-3 px-5">
            <div className="flex justify-between">
              <div>
                <button
                  className="flex space-x-2 py-4 items-center hover-toBlue"
                  onClick={handleGoBack}
                >
                  <FontAwesomeIcon className="" icon={faArrowLeft} />
                  <div>Back</div>
                </button>
              </div>
              {isAdmin && (
                <div className="flex space-x-2 pr-3">
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
              )}
            </div>
            <div className="project-box-top"></div>
          </div>

          <div className="px-5 pb-5 pt-16 ">
            <div className="border-gray-1">
              {/* <div className="project-box-top"></div> */}
              {isNotExist == true ? (
                <div className="no-project-found text-center align-middle py-28">
                  <FontAwesomeIcon
                    className=" self-center text-6xl"
                    icon={faCircleXmark}
                  />
                  <br />
                  <br />
                  <span className="font-bold text-lg">
                    Projects is not exist
                  </span>
                  <br />
                  <span className="font-medium">
                    This project does not exist. Maybe it was deleted.
                  </span>
                </div>
              ) : (
                <div>
                  {loadingResult ? (
                    <div className="grid justify-items-center py-36">
                      <div className="loader"></div>
                    </div>
                  ) : (
                    <div className="project-info-space mt-3">
                      {language == "eng" ? (
                        <div className="text-lg font-semibold tracking-wide pb-6">
                          {project_name}
                        </div>
                      ) : (
                        <div className="text-lg font-semibold tracking-wide pb-6">
                          {post?.data?.thai.document.title}
                        </div>
                      )}

                      <div className="space-y-5">
                        <div className="pb-5 handle-flex ">
                          <div className="hightlight-gray pr-5 ">Abstract</div>
                          {language == "eng" ? (
                            <div className="">{project_abstract_en}</div>
                          ) : (
                            <div className="">
                              {post?.data?.thai?.document.abstract}
                            </div>
                          )}
                        </div>
                        <div className="project-info-other">
                          <div className="flex " style={{ width: "200px" }}>
                            <div className="hightlight-gray pr-7">
                              Academic Year
                            </div>
                            <div className="pr-1">
                              {post?.data?.academic_year}
                            </div>
                          </div>
                          <div className="flex flex-wrap ">
                            <div className=" flex" style={{ width: "250px" }}>
                              <div className="hightlight-gray pr-10">
                                Degree
                              </div>
                              <div className="pr-1">{post?.data?.degree}</div>
                            </div>
                            <div className="flex" style={{ width: "250px" }}>
                              <div className="hightlight-gray pr-10">
                                project_type
                              </div>
                              <div className="pr-1">
                                {post?.data?.project_type}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="project-info-other">
                          <div className=" " style={{ width: "650px" }}>
                            <div className="handle-flex handle-flex-bottom">
                              <div className="hightlight-gray pr-5 ">
                                Author
                              </div>

                              {language == "eng" ? (
                                <div className="">
                                  {post?.data?.eng?.author?.map(
                                    (author, index) => (
                                      <div className="flex flex-wrap">
                                        <div className="pr-1">
                                          {author?.prefix}
                                        </div>
                                        <span className="pr-1">
                                          {author?.first_name}
                                        </span>
                                        <span
                                          className={
                                            author?.middle_name === null
                                              ? ""
                                              : "pr-1 "
                                          }
                                        >
                                          {author?.middle_name}
                                        </span>
                                        <span className="pr-1">
                                          {author?.last_name}
                                        </span>
                                      </div>
                                    )
                                  )}
                                </div>
                              ) : (
                                <div className="basis-4/5">
                                  {post?.data?.thai?.author?.map(
                                    (author, index) => (
                                      <div className="flex ">
                                        <div className="pr-1">
                                          {author?.prefix}
                                        </div>
                                        <span className="pr-1">
                                          {author?.first_name}
                                        </span>
                                        <span
                                          className={
                                            author?.middle_name === null
                                              ? ""
                                              : "pr-1 "
                                          }
                                        >
                                          {author?.middle_name}
                                        </span>
                                        <span className="pr-1">
                                          {author?.last_name}
                                        </span>
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                            {/* <div className="flex">
                          <div className="hightlight-gray basis-1/5"> </div>
                          <div className="flex basis-4/5">
                            <div className="pr-1">
                              {post?.data?.eng?.author[0]?.prefix}
                            </div>
                            <span className="pr-1">
                              {post?.data?.eng?.author[0]?.first_name}
                            </span>
                            <span
                              className={
                                post?.data?.eng?.author[0]?.middle_name === null
                                  ? ""
                                  : "pr-1 "
                              }
                            >
                              {post?.data?.eng?.author[0]?.middle_name}
                            </span>
                            <span className="pr-1">
                              {post?.data?.eng?.author[0]?.last_name}
                            </span>
                          </div>
                        </div> */}
                          </div>
                          <div className=" " style={{ width: "550px" }}>
                            <div className="handle-flex handle-flex-bottom">
                              <div className="hightlight-gray pr-10 ">
                                Advisor
                              </div>
                              {language == "eng" ? (
                                <div className="flex ">
                                  <div className="pr-1">
                                    {post?.data?.eng?.advisor[0]?.prefix}
                                  </div>
                                  <span className="pr-1">
                                    {post?.data?.eng?.advisor[0]?.first_name}
                                  </span>
                                  <span
                                    className={
                                      post?.data?.eng?.advisor[0]
                                        ?.middle_name === null
                                        ? ""
                                        : "pr-1 "
                                    }
                                  >
                                    {post?.data?.eng?.advisor[0]?.middle_name}
                                  </span>
                                  <span className="pr-1">
                                    {post?.data?.eng?.advisor[0]?.last_name}
                                  </span>
                                </div>
                              ) : (
                                <div className="flex">
                                  <div className="pr-1">
                                    {post?.data?.thai?.advisor[0]?.prefix}
                                  </div>
                                  <span className="pr-1">
                                    {post?.data?.thai?.advisor[0]?.first_name}
                                  </span>
                                  <span
                                    className={
                                      post?.data?.thai?.advisor[0]
                                        ?.middle_name === null
                                        ? ""
                                        : "pr-1 "
                                    }
                                  >
                                    {post?.data?.thai?.advisor[0]?.middle_name}
                                  </span>
                                  <span className="pr-1">
                                    {post?.data?.thai?.advisor[0]?.last_name}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="handle-flex handle-flex-bottom">
                              <div className="hightlight-gray pr-4 handle-flex-bottom">
                                Co-Advisor
                              </div>
                              {post?.data?.eng?.advisor[1] != null ? (
                                <div>
                                  {language == "eng" ? (
                                    <div className="flex">
                                      <div className="pr-1">
                                        {post?.data?.eng?.advisor[1]?.prefix}
                                      </div>
                                      <span className="pr-1">
                                        {
                                          post?.data?.eng?.advisor[1]
                                            ?.first_name
                                        }
                                      </span>
                                      <span
                                        className={
                                          post?.data?.eng?.advisor[1]
                                            ?.middle_name === null
                                            ? ""
                                            : "pr-1 "
                                        }
                                      >
                                        {
                                          post?.data?.eng?.advisor[1]
                                            ?.middle_name
                                        }
                                      </span>
                                      <span className="pr-1">
                                        {post?.data?.eng?.advisor[1]?.last_name}
                                      </span>
                                    </div>
                                  ) : (
                                    <div className="flex">
                                      <div className="pr-1">
                                        {post?.data?.thai?.advisor[1]?.prefix}
                                      </div>
                                      <span className="pr-1">
                                        {
                                          post?.data?.thai?.advisor[1]
                                            ?.first_name
                                        }
                                      </span>
                                      <span
                                        className={
                                          post?.data?.thai?.advisor[1]
                                            ?.middle_name === null
                                            ? ""
                                            : "pr-1 "
                                        }
                                      >
                                        {
                                          post?.data?.thai?.advisor[1]
                                            ?.middle_name
                                        }
                                      </span>
                                      <span className="pr-1">
                                        {
                                          post?.data?.thai?.advisor[1]
                                            ?.last_name
                                        }
                                      </span>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div>&nbsp;- </div>
                              )}
                            </div>
                          </div>
                          <div
                            className="handle-flex items-center"
                            style={{ width: "700px" }}
                          >
                            <div className="hightlight-gray pr-7 handle-flex-bottom">
                              Keywords
                            </div>
                            <div className="flex flex-wrap">
                              {
                                <div className="flex flex-wrap items-center">
                                  {Array.isArray(project_keyword) &&
                                    project_keyword.map((keywords, index) => (
                                      <div className="flex flex-wrap items-center">
                                        <button
                                          className="tagsBox items-center mr-1 mb-1"
                                          key={index}
                                          name="keywords"
                                        >
                                          <span className="hightlight-blue">
                                            #
                                          </span>
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
                                          className="tagsBox items-center mr-1 mb-1"
                                          key={index}
                                          name="keywords"
                                        >
                                          <span className="hightlight-blue">
                                            #
                                          </span>
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
                          {/* <div className="flex " style={{ width: "550px" }}>
                    <div className="hightlight-gray pr-7">Tags</div>
                    <div className="flex">
                      <div className="tagsArea">
                        <Tags />
                        <Tags />
                        <Tags />
                        <Tags />
                        <Tags />
                      </div>
                    </div>
                  </div> */}
                        </div>

                        <div className="flex flex-wrap items-center">
                          <div
                            className="flex items-center flex-wrap"
                            style={{ width: "400px" }}
                          >
                            <div className="hightlight-gray pr-7">
                              Attachment file
                            </div>
                            {project_attachment_file != null ? (
                              <div className="px-3 py-1">
                                {project_attachment_file}
                              </div>
                            ) : (
                              <div className="px-3 py-1">no file</div>
                            )}
                          </div>
                          <div className="flex flex-wrap">
                            {project_attachment_file != null && (
                              <div
                                className="flex pr-5"
                                style={{ width: "180px" }}
                              >
                                <button
                                  className="view-attachment-button"
                                  onClick={handleViewFile}
                                >
                                  <FontAwesomeIcon
                                    className="pr-0 text-lg self-center"
                                    icon={faFilePdf}
                                  />
                                  View attachment file
                                </button>
                              </div>
                            )}
                            {isAdmin && (
                              <div className="flex" style={{ width: "160px" }}>
                                <button
                                  className="edit-attachment-button"
                                  onClick={() => {
                                    setPopupStatus(true);
                                    setPopupComponent("editFile");
                                  }}
                                >
                                  <FontAwesomeIcon
                                    className="pr-0 text-lg self-center"
                                    icon={faPenToSquare}
                                  />
                                  Edit attachment file
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        {/* <div className="flex items-center">
                  <div className="hightlight-gray pr-7">Attachment file</div>

                  <div className="flex space-x-5 items-center">
                    {project_attachment_file != null ? (
                      <div className="px-3 py-1">{project_attachment_file}</div>
                    ) : (
                      <div className="px-3 py-1">no file</div>
                    )}
                    <button
                      className="view-attachment-button"
                      onClick={handleViewFile}
                    >
                      <FontAwesomeIcon
                        className="pr-0 text-lg self-center"
                        icon={faFilePdf}
                      />
                      View attachment file
                    </button>
                    <button
                      className="edit-attachment-button"
                      onClick={() => {
                        setPopupStatus(true);
                        setPopupComponent("editFile");
                      }}
                    >
                      <FontAwesomeIcon
                        className="pr-0 text-lg self-center"
                        icon={faPenToSquare}
                      />
                      Edit attachment file
                    </button>
                  </div>
                </div> */}
                        <div>
                          {/* <iframe
                    src={`https://api-seai-general-nn2mkxpf6q-as.a.run.app/general/project/${project_attachment_file}/preview`}
                    width="100%"
                    height="0"
                  >
                    {" "}
                  </iframe> */}
                          {/* ihere arai wa
                  {projectPDFLink} */}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
