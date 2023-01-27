// import '../App.css';
import Navbar from '../components/Navbar.js';
import plusIcon from '../images/Add_Plus_Square.png';
import Banner from '../components/Banner.js';

function HomePage() {
    return <div>
        <Navbar/>
        <div>
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
                    <div className='menu-button-filter'>
                        <span className='hightlight-blue'>Filter:&nbsp;&nbsp;</span>
                        Years
                        <span className='hightlight-blue'>&nbsp; / &nbsp;</span>
                        Advisors 
                        <span className='hightlight-blue'>&nbsp; / &nbsp;</span> 
                        Tags
                    </div>
                    <div className='project-menu-add'>
                        <img src={plusIcon} alt="" className="w-5"/>
                        <div>Add New Project</div>
                    </div>
                    <div className='project-menu-add-hover'>
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