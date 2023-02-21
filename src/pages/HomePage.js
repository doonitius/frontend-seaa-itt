// import '../App.css';
import Navbar from '../components/Navbar.js';
import plusIcon from '../images/Add_Plus_Square.png';
import Banner from '../components/Banner.js';
import AddEditFilter from '../components/AddEditFilter.js';
import { useState } from 'react';

function HomePage() {

    const [popupStatus, setPopupStatus] = useState(false);
    const [popupComponent,setPopupComponent] = useState("");
    
    function clickExitFromPopup () {
        setPopupStatus(!popupStatus);
    }

    return <div>
        <Navbar/>
        {
            popupStatus && popupComponent === 'searchFilter' && ( 
                <AddEditFilter 
                closePopup = {clickExitFromPopup}
                adminAction = {false}/>
            )
        }
        {
            popupStatus && popupComponent === 'addProject' && ( 
                <AddEditFilter 
                closePopup = {clickExitFromPopup}
                adminAction = {true}/>
            )
        }
        {/* {
            popupStatus && popupComponent === 'searchFilter' && ( 
                <SearchFilter closePopup = {clickExitFromPopup}/>
            )
        } */}
        {/* {
            popupStatus == true && (
                <div className='popup-background'></div>
            )
        } */}
        <div className={`${popupStatus ? 'popup-open' : null}`}>
            <div className='sidenav'>
                <h5>Project Number</h5>
                <div className='text-sm'>
                    <span className='hightlight-blue'>Thesis project</span>
                    <br/>
                    <span className='hightlight-blue'>: &nbsp;</span>
                    18
                    <br/><br/>
                    <span className='hightlight-blue'>Senior project</span><br></br>
                    <span className='hightlight-blue'>: &nbsp;</span>
                    30
                </div>
            </div>
            <div className='main'>
                <div className="homepage-menu-space">
                    <div className='menu-button-filter' onClick={() => {setPopupStatus(true); setPopupComponent("searchFilter");}}>
                        <span className='hightlight-blue'>Filter:&nbsp;&nbsp;</span>
                        Years
                        <span className='hightlight-blue'>&nbsp; / &nbsp;</span>
                        Advisors 
                        <span className='hightlight-blue'>&nbsp; / &nbsp;</span> 
                        Tags
                    </div>
                    <div className='project-menu-add' onClick={() => {setPopupStatus(true); setPopupComponent("addProject");}}>
                        <img src={plusIcon} alt="" className="w-5"/>
                        <div>Add New Project</div>
                    </div>
                </div>
                <div className='projectlist-space'>
                    <Banner/><Banner/><Banner/><Banner/><Banner/>
                </div>
            </div>
            
        </div>
    </div>
}

export default HomePage;