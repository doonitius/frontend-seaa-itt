import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import axios from "axios";

function DeleteAlert(props) {
  const aToken = localStorage.getItem("Access_Token");
  const rToken = localStorage.getItem("Refresh_Token");
  const [loadingResult, setLoadingResult] = useState(true);

  const reloadLocation = () => {
    window.location.reload();
  };

  const postDeleteProject = async () => {
    async function fetchData() {
      try {
        setLoadingResult(true);
        const url = `https://api-seai-general.cyclic.app/general/project/${props.projectID}`;
        console.log("url: " + url);

        const response = await axios.patch(url, {
          headers: {
            access_token: aToken,
            refresh_token: rToken,
          },
        });

        console.log(response);
        console.log("delete project success");
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
  return (
    <div className="popup">
      <div className="smallAlert-popup">
        <div className="popup-header hightlight-red text-lg justify-center py-5 item-center">
          <FontAwesomeIcon className="fa-xl mr-4" icon={faTrashCan} />
          Delete Project ?
        </div>
        <div className="popup-content-small justify-center text-center text-sm ">
          Do you really want to Delete this project from database?
          <div className="flex mt-6 justify-center space-x-4">
            <button
              className="w-28 bg-white text-black confirmation-button"
              onClick={props.closePopup}
            >
              Cancel
            </button>
            <button
              className="w-28 red-button confirmation-button"
              onClick={() => {
                // postDeleteProject();
                props.closePopup();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteAlert;