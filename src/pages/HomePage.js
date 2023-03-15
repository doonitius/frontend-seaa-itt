// import '../App.css';
import Navbar from '../components/Navbar.js';
import Banner from '../components/Banner.js';
import AddEditFilter from '../components/AddEditFilter.js';
import AddEditProject from "../components/AddEditProject.js";
import { useState, useEffect } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function HomePage(props) {
  const [popupStatus, setPopupStatus] = useState(false);
  const [popupComponent, setPopupComponent] = useState("");
  const [searchText, setSearchText] = useState("");
  // const baseURL = "https://api-seai-general.cyclic.app/general/project/filter";
  const baseURL = "https://api-seai-general.cyclic.app/general/project/filter/";
  const searchURL = `https://api-seai-general.cyclic.app/general/project/filter?search=${searchText}`;
  // const baseURL = "https://api-seai-general.cyclic.app//project/filter?search=ใบหน้า";
  const [post, setPost] = useState(null);

  function clickExitFromPopup() {
    setPopupStatus(!popupStatus);
  }

  function handleSearching() {
    setSearchText(searchText);
  }

  // .get(baseURL)

  useEffect(() => {
    let url;

    if (searchText === "") {
      url = baseURL;
    } else {
      url = searchURL;
    }
    axios
      .get(url)
      .then((response) => {
        setPost(response.data);
        console.log("response data is = " + response.data);
      })
      .catch((error) => console.log(error));
  }, [searchText]);

  return (
    <div>
      <Navbar setSearchText={setSearchText} />
      {popupStatus && popupComponent === "searchFilter" && (
        <AddEditFilter closePopup={clickExitFromPopup} />
      )}
      {popupStatus && popupComponent === "addProject" && (
        <AddEditProject closePopup={clickExitFromPopup} addCase={true} />
      )}
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
      <div className={`${popupStatus ? "popup-open" : null}`}>
        <div className="wrapper">
          <div className="sidenav">
            <h5>Project Number</h5>
            <div className="text-sm">
              <span className="hightlight-blue">Thesis project</span>
              <br />
              <span className="hightlight-blue">: &nbsp;</span>
              18
              <br />
              <br />
              <span className="hightlight-blue">Senior project</span>
              <br></br>
              <span className="hightlight-blue">: &nbsp;</span>
              30
            </div>
          </div>
          <div className="main w-full">
            <div className="homepage-menu-space flex justify-between">
              <div
                className="menu-button-filter"
                onClick={() => {
                  setPopupStatus(true);
                  setPopupComponent("searchFilter");
                }}
              >
                <span className="hightlight-blue">Filter:&nbsp;&nbsp;</span>
                Years
                <span className="hightlight-blue">&nbsp; / &nbsp;</span>
                Advisors
                <span className="hightlight-blue">&nbsp; / &nbsp;</span>
                Tags
              </div>
              <div
                className="project-menu-add items-center"
                onClick={() => {
                  setPopupStatus(true);
                  setPopupComponent("addProject");
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
                <div>Add New Project</div>
              </div>
            </div>
            <div className="projectlist-space">
              {post?.data?.map((project, index) => (
                <Banner projectId={project._id} />
              ))}
              {/* <Banner projectId={post?.data?._id} />
              <Banner projectId={post?.data?._id} /> */}
              {/* <Banner/><Banner/><Banner/><Banner/> */}
              {/* pro ject 3 

                        run 1 - 2 - 3 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;