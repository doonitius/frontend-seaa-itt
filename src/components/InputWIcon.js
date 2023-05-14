import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const InputWIcon = ({ color, icon, placeholderInput, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="bg-white relative border-2 rounded-md transition-all duration-500">
      <div className="flex items-center">
        <FontAwesomeIcon
          icon={icon}
          className={`text-base px-3 ${
            isFocused ? `text-${color}` : "text-black1"
          }`}
        />
        <input
          className="padding-input outline-none w-full h-full"
          type="text"
          placeholder={placeholderInput}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
export default InputWIcon;
