import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faFile,
  faFileCirclePlus,
  faFileEdit,
  faFileLines,
  faFilterCircleXmark,
  faSlash,
  faTrashCan,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";

function EditPDFFile(props) {
  // const [post, setPost] = useState(null);
  const aToken = localStorage.getItem("Access_Token");
  const rToken = localStorage.getItem("Refresh_Token");
  const isAdmin = localStorage.getItem("Check_admin");
  // const [projectFile, setProjectFile] = useState();
  const [projectFileData, setProjectFileData] = useState({
    thesis_file: props.projectFile !== "" ? props.projectFile : null,
  });
  const [isEditFile, setIsEditFile] = useState(false);
  // const projectFileData.thesis_file
  // const formFileData = new FormData();

  // useEffect(() => {
  //   setProjectFile(projectFileRecent);
  //   console.log("projectFile name: " + projectFileRecent);
  // },[projectFileRecent, props.projectID]);

  useEffect(() => {
    setProjectFileData({
      thesis_file: props.projectFile || "อะไรกันครับเนี้ย",
    });
    console.log("projectFile name (recent): " + projectFileData.thesis_file);
  }, [props.projectID]);

  const handleEditFile = (event) => {
    const file = event.target.files[0];
    setIsEditFile(true);
    setProjectFileData({
      thesis_file: file,
    });
    // formFileData.append("thesis_file", file);
    console.log("projectFile name (now): " + file.name);
  };

  // useEffect(() => {
  //   console.log(
  //     "fromFileData thesis_file: " +
  //       (formFileData.get("thesis_file") || "has no file")
  //   );
  // }, [formFileData]);

  const reloadLocation = () => {
    window.location.reload();
  };

  const handleDeleteFile = () => {
    setIsEditFile(true);
    setProjectFileData({ thesis_file: null });
  };

  const postEditFile = async () => {
    try {
      const updatedFormFileData = new FormData();
      updatedFormFileData.append("thesis_file", projectFileData.thesis_file);

      const response = await axios.post(
        `https://api-seai-general.cyclic.app/general/project/upload/${props.projectID}`,
        updatedFormFileData,
        {
          headers: {
            access_token: aToken,
            refresh_token: rToken,
          },
        }
      );
      console.log(response.data);
      console.log("edit project file success");
      console.log("test file name: " + projectFileData.thesis_file.name);
    } catch (error) {
      console.log("An error occurred while project file");
      console.log(error);
    }

    // props.editConfirm();
    // reloadLocation();
  };
  return (
    <div className="popup">
      <div className="smallAlert-popup" style={{ width: "500px" }}>
        <div className="popup-header hightlight-orange text-lg justify-center py-5 items-center">
          <FontAwesomeIcon className="fa-xl mr-4" icon={faFileEdit} />
          Edit Attachment file
        </div>
        <div className="popup-content-small justify-center text-center text-sm">
          <div className="text-start pb-2">
            <span className="pr-2">Attachment file</span>
            {isEditFile ? (
              <span className="hightlight-blue">( Edited )</span>
            ) : (
              <span className="hightlight-blue">( Not Edit )</span>
            )}
          </div>
          <div className="gray-area flex justify-between items-center">
            {projectFileData.thesis_file && props.projectFile != null ? (
              <div className="flex items-center text-start">
                <FontAwesomeIcon className="fa-xl mr-4" icon={faFile} />
                {isEditFile ? (
                  <span>{projectFileData.thesis_file.name}</span>
                ) : (
                  <span>{props.projectFile}</span>
                )}
              </div>
            ) : (
              <div className="flex">
                <input type="file" accept=".pdf" onChange={handleEditFile} />
              </div>
            )}
            {projectFileData.thesis_file && (
              <div className="flex">
                <FontAwesomeIcon
                  className="fa-xl"
                  icon={faTrashCan}
                  onClick={handleDeleteFile}
                />
              </div>
            )}
          </div>

          {/* <div className="text-start pt-5 pb-2">New Attachment file</div>
          <div className="gray-area flex justify-between">
            <input type="file" accept=".pdf" />
          </div> */}
          <div className="text-start pt-5 flex">
            <FontAwesomeIcon
              className="fa-xl pr-2"
              icon={faCircleExclamation}
            />
            <div>
              <p>
                Please note that each project allows 1 attachment file. Deleting
                an existing file or uploading a new one will replace the current
                file.
              </p>
            </div>
          </div>

          <div className="flex mt-6 justify-center space-x-10">
            <button
              className="w-28 bg-white text-black confirmation-button"
              onClick={props.closePopup}
            >
              Cancel
            </button>
            <button
              className="w-28 orange-button confirmation-button"
              onClick={() => {
                props.closePopup();

                isEditFile
                  ? postEditFile()
                  : console.log(
                      "close without post editFile even click confirm"
                    );
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPDFFile;
