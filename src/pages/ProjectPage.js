import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import EditPDFFile from "../components/EditPDFFile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faFilePdf,
  faPenToSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

function ProjectPage(props) {
  const { projectId } = useParams();
  const [post, setPost] = useState(null);
  const [popupStatus, setPopupStatus] = useState(false);
  const [popupComponent, setPopupComponent] = useState("");
  const [projectPDFLink, setProjectPDFLink] = useState(
    "a357ab9e-f1d7-4b7a-90ba-15fed36082aa.pdf"
  );
  const navigate = useNavigate();
  const project_name = post?.data?.eng.document.title || "loading...";
  const project_abstract_en = post?.data?.eng.document.abstract || "loading...";

  const Tags = () => (
    <div className="tagsBox">
      <span className="hightlight-blue">#</span>
      <span>Artificial_Intelligence</span>
    </div>
  );
  function handleGoBack() {
    window.location.href = "/home";
  }

  function clickExitFromPopup() {
    setPopupStatus(!popupStatus);
  }

  useEffect(() => {
    console.log("projectid from param +++ " + projectId);
    axios
      .get(`https://api-seai-general.cyclic.app/general/project/${projectId}`)
      .then((response) => {
        setPost(response.data);
        console.log("get projectId: " + projectId);
        console.log("get respone: " + response.data);
      })
      .catch((error) => {
        console.log("An error occurred get projectId in ProjectPage");
        console.log(error);
      });
  }, [projectId]);
  // a357ab9e-f1d7-4b7a-90ba-15fed36082aa.pdf

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://api-seai-general.cyclic.app/general/project/${projectPDFLink}/preview`
  //     )
  //     .then((response) => {
  //       setProjectPDFLink(response.data);
  //       console.log("get PDF link : " + projectPDFLink);
  //     })
  //     .catch((error) => {
  //       console.log("An error occurred get project PDF file in ProjectPage");
  //       console.log(error);
  //     });
  // }, []);

  return (
    <div>
      <Navbar searchFunction={false} />
      {popupStatus && popupComponent === "editFile" && (
        <EditPDFFile closePopup={clickExitFromPopup} />
      )}
      <div className="wrapper">
        <SideBar />
        <div className="main w-full">
          <button
            className="flex space-x-2 p-4 items-center hover-toBlue"
            onClick={handleGoBack}
          >
            <FontAwesomeIcon className="" icon={faArrowLeft} />
            <div>Back</div>
          </button>
          <div className="px-5 pb-5">
            <div className="project-box-top"></div>
            <div className="project-info-space">
              <div className="text-lg font-semibold tracking-wide pb-6">
                {project_name}
              </div>
              <div className="space-y-5">
                <div className="flex pb-5">
                  <div className="hightlight-gray pr-5">Abstract</div>
                  <div className="">{project_abstract_en}</div>
                </div>
                <div className="project-info-other">
                  <div className="flex " style={{ width: "450px" }}>
                    <div className="hightlight-gray pr-7">Academic Year</div>
                    <div className="pr-1">{post?.data?.academic_year}</div>
                  </div>
                  <div className=" flex" style={{ width: "200px" }}>
                    <div className="hightlight-gray pr-10">Degree</div>
                    <div className="pr-1">{post?.data?.degree}</div>
                  </div>
                  <div className="flex" style={{ width: "200px" }}>
                    <div className="hightlight-gray pr-10">project_type</div>
                    <div className="pr-1">{post?.data?.project_type}</div>
                  </div>
                </div>
                <div className="project-info-other">
                  <div className=" " style={{ width: "450px" }}>
                    <div className="flex">
                      <div className="hightlight-gray basis-1/5">Author</div>
                      <div className="flex basis-4/5">
                        <div className="pr-1">
                          {post?.data?.eng.author[0].prefix}
                        </div>
                        <span className="pr-1">
                          {post?.data?.eng.author[0].first_name}
                        </span>
                        <span
                          className={
                            post?.data?.eng.author[0].middle_name === null
                              ? ""
                              : "pr-1 "
                          }
                        >
                          {post?.data?.eng.author[0].middle_name}
                        </span>
                        <span className="pr-1">
                          {post?.data?.eng.author[0].last_name}
                        </span>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="hightlight-gray basis-1/5"> </div>
                      <div className="flex basis-4/5">
                        <div className="pr-1">
                          {post?.data?.eng.author[0].prefix}
                        </div>
                        <span className="pr-1">
                          {post?.data?.eng.author[0].first_name}
                        </span>
                        <span
                          className={
                            post?.data?.eng.author[0].middle_name === null
                              ? ""
                              : "pr-1 "
                          }
                        >
                          {post?.data?.eng.author[0].middle_name}
                        </span>
                        <span className="pr-1">
                          {post?.data?.eng.author[0].last_name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className=" " style={{ width: "550px" }}>
                    <div className="flex">
                      <div className="hightlight-gray pr-10">Advisor</div>
                      <div className="flex">
                        <div className="pr-1">
                          {post?.data?.eng.advisor[0].prefix}
                        </div>
                        <span className="pr-1">
                          {post?.data?.eng.advisor[0].first_name}
                        </span>
                        <span
                          className={
                            post?.data?.eng.advisor[0].middle_name === null
                              ? ""
                              : "pr-1 "
                          }
                        >
                          {post?.data?.eng.advisor[0].middle_name}
                        </span>
                        <span className="pr-1">
                          {post?.data?.eng.advisor[0].last_name}
                        </span>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="hightlight-gray pr-4">Co-Advisor</div>
                      {post?.data?.eng.advisor[1] != null ? (
                        <div className="flex">
                          <div className="pr-1">
                            {post?.data?.eng.advisor[0].prefix}
                          </div>
                          <span className="pr-1">
                            {post?.data?.eng.advisor[0].first_name}
                          </span>
                          <span
                            className={
                              post?.data?.eng.advisor[0].middle_name === null
                                ? ""
                                : "pr-1 "
                            }
                          >
                            {post?.data?.eng.advisor[0].middle_name}
                          </span>
                          <span className="pr-1">
                            {post?.data?.eng.advisor[0].last_name}
                          </span>
                        </div>
                      ) : (
                        <div>&nbsp;- </div>
                      )}
                    </div>
                  </div>
                  <div className="flex " style={{ width: "450px" }}>
                    <div className="hightlight-gray pr-7">Keywords</div>
                    <div className="flex">
                      <div className="">
                        {post?.data?.eng.document.keywords}
                      </div>
                    </div>
                  </div>
                  <div className="flex " style={{ width: "550px" }}>
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
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="hightlight-gray pr-7">Attachment file</div>
                  <div className="flex space-x-5 items-center">
                    <div className="px-3 py-1">project_attachment_file.pdf</div>
                    <button className="view-attachment-button">
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
                </div>
                <div>
                  {/* <iframe src={projectPDFLink} width="100%" height="500px">
                    {" "}
                  </iframe> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
