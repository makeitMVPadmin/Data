import React from "react";
import searchIcon from "../assets/icons/search-icon.svg";

const SearchButton = ({ onClick, city, state, country }) => {
  return (
    <button
      className="flex items-center justify-center gap-3 border-2 rounded-[10px] border-black w-auto mx-7 bg-customYellow"
      onClick={() => onClick({city, state, country})}
    >
      <img src={searchIcon} alt="search" className="w-8 h-8" />
      <p className="text-xl font-['Gilroy'] font-bold not-italic">Search</p>
    </button>
  );
};
export default SearchButton;
