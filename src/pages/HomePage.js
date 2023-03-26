// import '../App.css';
import Navbar from '../components/Navbar.js';
import Banner from '../components/Banner.js';
import AddEditFilter from '../components/AddEditFilter.js';
import AddEditProject from "../components/AddEditProject.js";
import SideBar from "../components/SideBar.js";
import { useState, useEffect } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function HomePage(props) {
  const [searchText, setSearchText] = useState("");
  const baseURL = "https://api-seai-general.cyclic.app/general/project/filter/";
  const searchURL = `https://api-seai-general.cyclic.app/general/project/filter?search=${searchText}`;
  // const baseURL = "https://api-seai-general.cyclic.app//project/filter?search=ใบหน้า";
  const [post, setPost] = useState(null);

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
      <Navbar setSearchText={setSearchText} searchFunction={true} />
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
      <div className="">
        <div className="wrapper">
          <SideBar />
          <div className="main w-full">
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