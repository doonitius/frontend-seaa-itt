import editIcon from '../images/edit-icon.png';
import deleteIcon from '../images/delete-icon.png';
import editIconWhite from '../images/edit-icon-white.png';
import deleteIconWhite from '../images/delete-icon-white.png';

const Tags = () => (
    <div className="tagsBox">
        <span className="hightlight-blue">#</span>
        <span>Artificial_Intelligence</span>
    </div>
)

function Banner() {
    return <div className="project-banner">
            <div className="project-banner-color"></div>
            <div className="project-banner-content">
                <span className='hightlight-blue text-sm'>Solving Vehicle Routing Problem with Hard Time Windows by Genetic Algorithm</span>
                <div className="text-xs pt-4">
                    <div className="flex">
                        <span className="hightlight-gray pr-3">Year: </span>
                        <span>2021 </span>
                        <span className="hightlight-gray pr-3 pl-10">Advisor: </span>
                        <span className='pr-2'>Asst. Prof. Dr. Jumpol</span>
                        <span>Polvichai</span>
                    </div>
                    <div className="flex pt-3">
                        <span className="hightlight-gray pr-3 pt-1">Tags: </span>
                        <div className="tagsArea">
                            <Tags/><Tags/><Tags/><Tags/><Tags/><Tags/><Tags/><Tags/><Tags/><Tags/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='project-banner-menu space-y-2'>
                <div className='project-banner-menu-edit'>
                    <img src={editIcon} alt="" className="w-4"/>
                    <div>Edit</div>
                </div>
                <div className='project-banner-menu-edit-hover'>
                    <img src={editIconWhite} alt="" className="w-4"/>
                    <div>Edit</div>
                </div>
                <div className='project-banner-menu-delete'>
                <img src={deleteIcon} alt="" className="w-4"/>
                    <div>Delete</div>
                </div>
                <div className='project-banner-menu-edit-hover'>
                    <img src={deleteIconWhite} alt="" className="w-4"/>
                    <div>Edit</div>
                </div>
            </div>
        </div>
}

export default Banner;