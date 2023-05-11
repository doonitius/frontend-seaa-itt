import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faFile,
  faFileCirclePlus,
  faFileEdit,
  faTrashCan,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

function EditPDFFile(props) {
  return (
    <div className="popup">
      <div className="smallAlert-popup" style={{ width: "500px" }}>
        <div className="popup-header hightlight-orange text-lg justify-center py-5 item-center">
          <FontAwesomeIcon className="fa-xl mr-4" icon={faFileEdit} />
          Edit Attachment file
        </div>
        <div className="popup-content-small justify-center text-center text-sm">
          <div className="text-start pb-2">Present Attachment file</div>
          <div className="gray-area flex justify-between">
            <div className="flex">
              <FontAwesomeIcon className="fa-xl mr-4" icon={faFile} />
              Upload.pdf
            </div>
            <div className="flex">
              <FontAwesomeIcon className="fa-xl" icon={faTrashCan} />
            </div>
          </div>

          <div className="text-start pt-5 pb-2">New Attachment file</div>
          <div className="gray-area flex justify-between">
            <input type="file" accept=".pdf" />
          </div>
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
              onClick={props.closePopup}
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
