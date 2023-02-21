import logoutIconBlue from '../images/logout-icon-blue.png'

function LogoutAlert(props) {

    return <div className="popup">
        <div className="smallAlert-popup">
            <div className="popup-header hightlight-blue text-xl justify-center py-5">
                <img 
                src={logoutIconBlue} 
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
                    className='w-28 blue-button confirmation-button'
                    onClick={props.closePopup}
                    >
                    Logout
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default LogoutAlert;