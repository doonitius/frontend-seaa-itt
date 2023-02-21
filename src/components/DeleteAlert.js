import deleteIcon from '../images/delete-icon.png'

function DeleteAlert(props) {

    return <div className="popup">
        <div className="smallAlert-popup">
            <div className="popup-header hightlight-red text-xl justify-center py-5">
                <img 
                src={deleteIcon} 
                alt="" 
                className="w-7 object-contain mr-2"
                />
                Logout ?
            </div>
            <div className="popup-content justify-center text-center text-sm">
                Do you really want to Log out from this account?
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