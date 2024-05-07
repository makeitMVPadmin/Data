import React from "react";
import searchIcon from "../assets/icons/search-icon.svg";

const SearchButton = ({ onClick }) => {
  return (
    <button
      className="flex items-center justify-center gap-3 border-2 rounded-[10px] border-black w-40 mx-2 bg-customYellow"
      onClick={onClick}
    >
      <img src={searchIcon} alt="search" className="w-8 h-8" />
      <p className="text-xl font-['Gilroy'] font-bold not-italic">Search</p>
    </button>
  );
};
export default SearchButton;