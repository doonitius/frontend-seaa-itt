import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function DeleteAlert(props) {

    return <div className="popup">
        <div className="smallAlert-popup">
            <div className="popup-header hightlight-red text-lg justify-center py-5 item-center">
            <FontAwesomeIcon className='fa-xl mr-4' icon={faTrashCan}/>
                Delete Project ?
            </div>
            <div className="popup-content justify-center text-center text-sm">
                Do you really want to Delete this project from database?
                <div className="flex mt-6 justify-center space-x-4">
                    <button 
                    className='w-28 bg-white text-black confirmation-button'
                    onClick={props.closePopup}
                    > 
                    Cancel
                    </button>
                    <button 
                    className='w-28 red-button confirmation-button'
                    onClick={props.closePopup}
                    >
                    Delete
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default DeleteAlert;