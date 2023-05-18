import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faMagnifyingGlass,
  faSquareCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function ToastFilter(props) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
      // props.timeUp();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`toast ${isOpen ? "toast-open" : "toast-close"}`}>
      <div className="toast-filter">
        <div className="toast-filter-content flex text-center items-center justify-center">
          <FontAwesomeIcon
            className="faCircleCheck pr-3"
            icon={faCircleCheck}
          />
          <div>Success Edit Filter</div>
        </div>
      </div>
    </div>
  );
}
export default ToastFilter;
