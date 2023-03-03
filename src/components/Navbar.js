import logoForBlack2 from '../images/Logo_ForBlack2.png';
import searchIcon from '../images/search-icon.png';
// import menuIcon from '../images/menu-icon.png';
import searchIconWhite from '../images/search-icon-white.png';
import hamburgerIconWhite from '../images/Hamburger_MD-white.png';
import logoutIcon from '../images/logout-icon.png'
import LogoutAlert from './LogoutAlert';
import { useState } from 'react';

function Navbar() {

    const [popupStatus, setPopupStatus] = useState(false);
    const [popupComponent,setPopupComponent] = useState("");
    
    
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    
    function clickExitFromPopup () {
            setPopupStatus(!popupStatus);
        }

    const toggleDropdown = () => {
        setIsOpenMenu(!isOpenMenu);
    }

    return <div className="navBar-withSearh">
        {
            popupStatus && popupComponent === 'logout' && ( 
                <LogoutAlert 
                closePopup = {clickExitFromPopup}/>
            )
        }
        <img src={logoForBlack2} alt="" className="w-36 object-contain"/>
        <div className='navBar-withSearch-menu'>
            <div className='search-input w-3/4'>
                <img 
                src={searchIcon} 
                alt="" 
                className="w-4 object-contain mr-3"
                />
                <input placeholder="Search project name, related tags or keywords"/>
            </div>
            <button className='blue-button w-28 mr-4'>
                <img 
                src={searchIconWhite} 
                alt="" 
                className="w-5 object-contain mr-2"
                />
                Search
            </button>
            <img 
            src={hamburgerIconWhite} 
            alt="" 
            className="w-7 object-contain mr-2"
            onClick={toggleDropdown}
            />
            {isOpenMenu && (
                <ul className="hambergur-menu shadow-md mt-12 py-2 items-center">
                    <div 
                    className="px-6 py-2 hambergur-menu-list flex items-center"
                    onClick={() => {setPopupStatus(true); setPopupComponent("logout");}}
                    >
                        <img 
                        src={logoutIcon} 
                        alt="" 
                        className="w-5 object-contain mr-2"
                        />
                        Log out</div>
                </ul>
            )}
        </div>
    </div>
}

export default Navbar;