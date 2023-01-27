import logoForBlack2 from '../images/Logo_ForBlack2.png';
import searchIcon from '../images/search-icon.png';
// import menuIcon from '../images/menu-icon.png';
import searchIconWhite from '../images/search-icon-white.png';
import hamburgerIconWhite from '../images/Hamburger_MD-white.png';

function Navbar() {
    return <div className="navBar-withSearh">
        <img src={logoForBlack2} alt="" className="w-36 object-contain"/>
        <div className='navBar-withSearch-menu'>
            <div className='search-input'>
                <img src={searchIcon} alt="" className="w-4 object-contain mr-3"/>
                <input placeholder="Search project name, related tags or keywords"/>
            </div>
            <button className='blue-button w-28 mr-4'>
                <img src={searchIconWhite} alt="" className="w-5 object-contain mr-2"/>
                Search
            </button>
            <img src={hamburgerIconWhite} alt="" className="w-7 object-contain mr-2"/>
        </div>
    </div>
}

export default Navbar;