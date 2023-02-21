// const inputFilter = () => (
//     <div className="filter-input-area">
//         <div>
//             <input type="radio" name="Advisor Filter" value="Option 1"/> Asst. Prof. Dr. Santitham
//         </div>
//     </div>
// )

function AddEditFilter(props) {
    const options = [1,2,3,4,5]
    return <div className="popup">
                <div className="filter-popup">
                    <div className="popup-header justify-between items-center py-3 px-8">
                        <div>
                            <span className="hightlight-gray text-lg">Filter&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            Years
                            <span className='hightlight-blue'>&nbsp;/&nbsp;</span>
                            Advisors 
                            <span className='hightlight-blue'>&nbsp;/&nbsp;</span> 
                            Tags
                        </div>
                        <div className="flex items-center">
                            <div className='pr-5 pl-5 text-sm break-normal' onClick={props.closePopup}>Cancel</div>
                            <button className='blue-button text-sm p-2 px-4' onClick={props.closePopup}>Confirm</button>
                        </div>
                    </div>
                    <div className="popup-content">
                        <div className={`${props.adminAction === false ? 'hidden' : 'mb-4'}`}>
                            <div className='hightlight-blue text-lg mb-4'>Project Name</div>
                            <input className='search-input h-8 w-fill' placeholder="Project name"/>
                        </div>
                        <div className="mb-4">
                            <div className='hightlight-blue text-lg mb-4'>Year</div>
                            <div className="filter-input-area">
                                {options.map((option) => 
                                    <div className="flex items-center">
                                        <input 
                                        type={`${props.adminAction === false ? "checkbox" : "radio"}`} 
                                        name="Year choice" 
                                        value={`Option ${option}`}
                                        /> 
                                        year {option}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mb-4 mt-8">
                            <div className='hightlight-blue text-lg mb-4'>Advisor</div>
                            <div className="filter-input-area">
                                {options.map((option) => 
                                    <div className="flex items-center">
                                        <input 
                                        type={`${props.adminAction === false ? "checkbox" : "radio"}`} 
                                        name="Advisor choice" 
                                        value={`Option ${option}`}
                                        /> 
                                        AdvisorName AdvisorLastNameS  {option}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mb-4 mt-8">
                            <div className='hightlight-blue text-lg mb-4'>Tags</div>
                            <div className="filter-input-area">
                                {options.map((option) => 
                                    <div className="flex items-center">
                                        <input 
                                        type={`${props.adminAction === false ? "checkbox" : "radio"}`} 
                                        name="Tags choice" 
                                        value={`Option ${option}`}
                                        /> 
                                        <span className="hightlight-blue">#</span>
                                        <span>Artificial_Intelligence</span>
                                        {option}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
    </div>
} 
export default AddEditFilter;