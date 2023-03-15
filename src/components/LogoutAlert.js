import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function LogoutAlert(props) {
    
    // const history = useHistory();
    
    // function handleLogout() {
    //     // perform any necessary logout logic here
    //     history.push('/');
    // }

    function handleLogout() {
        // perform any necessary logout logic here
        // redirect the user to the homepage
        window.location.href = '/';
    }

    return <div className="popup">
        <div className="smallAlert-popup">
            <div className="popup-header hightlight-blue text-lg justify-center py-5 item-center">
            <FontAwesomeIcon className='fa-xl mr-4' icon={faRightFromBracket}/>
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
                    onClick={() => {
                        props.closePopup();
                        handleLogout();
                    }}
                    >
                    Logout
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default LogoutAlert;