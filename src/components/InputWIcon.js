import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const InputWIcon = ({ color, icon, placeholderInput, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div
      className={`h-full bg-white relative border-2 rounded-md transition-all duration-500${
        isFocused ? `border-${color}` : ""
      }`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <div className="flex items-center">
        <FontAwesomeIcon
          icon={icon}
          className={`text-lg px-4 ${
            isFocused ? `text-${color}` : "text-black1"
          }`}
        />
        <input
          className="pl-1 py-2 outline-none w-full h-full"
          type="text"
          placeholder={placeholderInput}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
export default InputWIcon;
