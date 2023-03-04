import AddEditFilter from './AddEditFilter.js';
import DeleteProjectAlert from './DeleteAlert.js';
import { useState, useEffect } from 'react';
import axios from 'axios';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faFile, faPenToSquare, faTrashCan, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";


const Tags = () => (
    <div className="tagsBox">
        <span className="hightlight-blue">#</span>
        <span>Artificial_Intelligence</span>
    </div>
)

function Banner(props) {

    // props.projectId
    const [popupStatus, setPopupStatus] = useState(false);
    const [popupComponent,setPopupComponent] = useState("");
    const [abstractStatus, setAbstractStatus] = useState(false);

    const isAdmin = true;

    // const projectId = props.projectId;

    // const baseURL = `http://localhost:3000/project/${props.projectId}`;
    // const baseURL = '{{url}}/project/' + projectId;
    
    function clickExitFromPopup () {
        setPopupStatus(!popupStatus);
    }

    function clickShowAbstract () {
        setAbstractStatus(!abstractStatus);
    }

    const [ post, setPost ] = useState(null);

    useEffect(() => {
        axios.get(`https://api-seai-general.cyclic.app/general/project/${props.projectId}`)
        .then((response) => {
            setPost(response.data);
            console.log(response.data);
        })
        .catch(error => console.log(error));
    }, [props.projectId]);

    if (!post) {
        return <div class="loader-container">
        <div class="loader"></div>
        </div>
    }
    
    function clickExitFromPopup () {
        setPopupStatus(!popupStatus);
    }
    return <div>
            {
                popupStatus && popupComponent === 'editProject' && ( 
                    <AddEditFilter 
                    closePopup = {clickExitFromPopup}
                    adminAction = {true}/>
                )
            }
            {
                popupStatus && popupComponent === 'deleteProject' && ( 
                    <DeleteProjectAlert 
                    closePopup = {clickExitFromPopup}/>
                )
            }
                <div>
                    <div className="project-banner justify-between">
                        <div className='flex'>
                            <div className="project-banner-color"></div>
                            <div className="project-banner-content">
                            {/* <span className='hightlight-blue text-sm'>Solving Vehicle Routing Problem with Hard Time Windows by Genetic Algorithm</span> */}
                                <span className='hightlight-blue text-sm'>{post.data.project_name}</span>
                                <div className="text-xs pt-4">
                                    <div className="flex">
                                        <span className="hightlight-gray pr-3">Year: </span>
                                        <span>{post.data.academic_year} </span>
                                        <span className="hightlight-gray pr-3 pl-10">Advisor: </span>
                                        <span className='pr-2'>Asst. Prof. Dr. Jumpol</span>
                                        <span>Polvichai ???</span>
                                    </div>
                                    <div className="flex pt-3">
                                        <span className="hightlight-gray pr-3 pt-1">Tags: </span>
                                        <div className="tagsArea">
                                            <Tags/><Tags/><Tags/><Tags/><Tags/>
                                            {/* <Tags/><Tags/><Tags/><Tags/><Tags/>
                                            <Tags/><Tags/><Tags/><Tags/><Tags/> */}
                                        </div>
                                    </div>
                                    {/* <div className="flex pt-3" className={`${viewAbstractStatus ? 'popup-open' : null}`}> */}
                                    <div className='flex pt-3'>
                                    <span className='hightlight-gray pr-3'>Abstract: </span>
                                        <div>
                                            <div className={`project-abstract ${abstractStatus ? '' : 'hidden'}`}>
                                                <span> {post.data.project_abstract} </span>
                                            </div>
                                            <button 
                                                className='hightlight-blue justify-start underline decoration-1 underline-offset-2 flex items-center'
                                                onClick={() => {clickShowAbstract(true);}}>
                                                {abstractStatus ? 'hide abstract' : 'view abstract'}
                                                <FontAwesomeIcon 
                                                icon={abstractStatus ? faEyeSlash : faEye} 
                                                className="ml-1"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='project-banner-menu content-between grid justify-items-end'>
                            { isAdmin && ( <div className='space-y-2'>
                                <div 
                                    className='project-banner-menu-edit items-center flex'
                                    onClick={() => {setPopupStatus(true); setPopupComponent("editProject");}}>
                                    <FontAwesomeIcon className='justify-center' icon={faPenToSquare}/>
                                    <div className=''>Edit</div>
                                </div>
                                <div 
                                    className='project-banner-menu-delete items-center flex'
                                    onClick={() => {setPopupStatus(true); setPopupComponent("deleteProject");}}>
                                    <FontAwesomeIcon className='justify-center' icon={faTrashCan}/>
                                    <div className=''>Delete</div>
                                </div>
                            </div> )}
                            <div className='project-banner-menu-viewPDF inset-x-0 bottom-0 items-center'>
                                <FontAwesomeIcon icon={faFile}/>
                                View Project Report
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}

export default Banner;