import React from "react";
import pdfDownloadIcon from "../assets/icons/pdf-download.svg";

const PDFButton = ({ text = "PDF" }) => {
  return (
    <button className="flex items-center justify-center gap-3 border-2 rounded-[10px] border-black w-28 bg-darkBlue text-white h-full">
      <img src={pdfDownloadIcon} alt="pdf download" className="w-8 h-8" />
      <p className="text-xl font-['Gilroy'] font-bold not-italic">{text}</p>
    </button>
  );
};
export default PDFButton;
