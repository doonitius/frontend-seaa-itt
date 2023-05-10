// import '../App.css';
import Navbar from '../components/Navbar.js';
import Banner from '../components/Banner.js';
import AddEditFilter from '../components/AddEditFilter.js';
import AddEditProject from "../components/AddEditProject.js";
import SideBar from "../components/SideBar.js";
import { useState, useEffect } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faCaretRight,
  faChevronLeft,
  faChevronRight,
  faCircleChevronLeft,
  faCircleChevronRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

function HomePage(props) {
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const baseURL = "https://api-seai-general.cyclic.app/general/project/filter/";
  const URLpage = `https://api-seai-general.cyclic.app/general/project/filter?search=${searchText}&page_no=${pageNumber}&page_size=${itemsPerPage}`;
  const URLpageNoTextSearch = `https://api-seai-general.cyclic.app/general/project/filter?search=&page_no=${pageNumber}&page_size=${itemsPerPage}`;
  const searchURL = `https://api-seai-general.cyclic.app/general/project/filter?search=${searchText}`;
  // const baseURL = "https://api-seai-general.cyclic.app//project/filter?search=ใบหน้า";
  const [post, setPost] = useState(null);
  const [loadingResult, setLoadingResult] = useState(true);
  // const storedFilterDataString = localStorage.getItem("filterData");
  // const storedFilterData = storedFilterDataString
  //   ? JSON.parse(storedFilterDataString)
  //   : null;
  const [filterData, setFilterData] = useState({
    academic_year: "",
    degree: "",
    project_type: "",
    advisor_id: "",
  });

  // const [localStorageData, setLocalStorageData] = useState(
  //   localStorage.getItem("filterData")
  // );
  // useEffect(() => {
  //   const localStorageData = localStorage.getItem("filterData");
  //   if (localStorageData) {
  //     const parsedData = JSON.parse(localStorageData);
  //     setFilterData(parsedData);
  //   }

  //   console.log(
  //     "setfilter data: " +
  //       "\n" +
  //       filterData.academic_year +
  //       "\n" +
  //       filterData.degree +
  //       "\n" +
  //       filterData.project_type +
  //       "\n" +
  //       filterData.advisor_id
  //   );
  // }, [localStorageData]);

  // const [storedFilterData, setStoredFilterData] = useState(
  //   JSON.parse(localStorage.getItem("filterData"))
  // );
  // const defaultFilterData = {
  //   academic_year: "",
  //   degree: "",
  //   project_type: "",
  //   advisor_id: "",
  // };
  // const [filterData, setFilterData] = useState({
  //   ...defaultFilterData,
  //   ...storedFilterData,
  // });
  // useEffect(() => {
  //   console.log(
  //     "setfilter data: " +
  //       "\n" +
  //       filterData.academic_year +
  //       "\n" +
  //       filterData.degree +
  //       "\n" +
  //       filterData.project_type +
  //       "\n" +
  //       filterData.advisor_id
  //   );
  // }, [filterData]);

  // setFilterData(storedFilterData);

  // function handleSearching() {
  //   setSearchText(searchText);
  // }

  // .get(baseURL)
  // useEffect(() => {
  //   const handleStorageChange = (event) => {
  //     if (event.key === "filterData") {
  //       const storedFilterDataString = event.newValue;
  //       const storedFilterData = storedFilterDataString
  //         ? JSON.parse(storedFilterDataString)
  //         : null;
  //       setFilterData(storedFilterData);
  //     }
  //   };
  //   const storedFilterDataString = localStorage.getItem("filterData");
  //   const storedFilterData = storedFilterDataString
  //     ? JSON.parse(storedFilterDataString)
  //     : null;
  //   setFilterData(storedFilterData);
  //   console.log(
  //     "setfilter data: " +
  //       "\n" +
  //       filterData.academic_year +
  //       "\n" +
  //       filterData.degree +
  //       "\n" +
  //       filterData.project_type +
  //       "\n" +
  //       filterData.advisor_id
  //   );
  //   window.addEventListener("storage", handleStorageChange);

  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, [localStorage.getItem("filterData")]);
  const URLpageWithFilter = `https://api-seai-general.cyclic.app/general/project/filter?search=&page_no=${pageNumber}&page_size=${itemsPerPage}&academic_year=${filterData.academic_year}&degree=${filterData.degree}&project_type=${filterData.project_type}&advisor_id=${filterData.advisor_id}`;

  useEffect(() => {
    async function fetchData() {
      let url;

      if (searchText === "") {
        url = URLpageWithFilter;
      } else {
        url = URLpage;
      }
      console.log("url now: " + url);
      try {
        setLoadingResult(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        const response = await axios.get(url);
        setPost(response.data);
        console.log("response data is = " + response.data);
        setLoadingResult(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [searchText, pageNumber, filterData]);

  const nextPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
    console.log("pageNumber " + pageNumber);
  };

  const prevPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
    console.log("pageNumber " + pageNumber);
  };

  const functionFilter = () => {
    setFilterData(JSON.parse(localStorage.getItem("filterData")));
  };

  return (
    <div className="scroll-fix">
      <Navbar
        setSearchText={setSearchText}
        searchFunction={true}
        filterFunction={functionFilter}
      />
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
            {loadingResult ? (
              <div className="grid justify-items-center pt-36">
                <div class="loader"></div>
              </div>
            ) : (
              <div>
                <div className="projectlist-space">
                  {post?.data?.map((project, index) => (
                    <Banner projectId={project.project_id} />
                  ))}
                </div>
                <div className="items-center text-center">
                  <div
                    className={
                      "pt-2 flex text-center space-x-2 justify-center items-center "
                    }
                  >
                    <button
                      className={
                        "page-PrevNext " + (pageNumber == 1 ? "hidden" : "")
                      }
                      onClick={() => {
                        setPageNumber((prevPageNumber) => prevPageNumber - 1);
                      }}
                    >
                      <FontAwesomeIcon
                        className=" self-center mr-2"
                        icon={faChevronLeft}
                      />
                      Prev
                    </button>
                    <button
                      className={
                        "page-current text-center " +
                        (pageNumber == 1 ? "ml-10" : "")
                      }
                    >
                      Page {pageNumber}
                    </button>
                    <button
                      className="page-PrevNext"
                      onClick={() => {
                        setPageNumber((prevPageNumber) => prevPageNumber + 1);
                      }}
                    >
                      Next
                      <FontAwesomeIcon
                        className=" self-center ml-2"
                        icon={faChevronRight}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;