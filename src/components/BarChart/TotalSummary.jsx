import React from "react";
import upArrowIcon from "../../assets/icons/up-arrow.svg";
import downArrowIcon from "../../assets/icons/down-arrow.svg";

const TotalSummary = ({ title, currentTotal, currentDate, pastTotal }) => {
  const arrow = () => {
    if (currentTotal > pastTotal) {
      return <img src={upArrowIcon} alt="Up Arrow" className="w-8 h-8" />;
    } else {
      return <img src={downArrowIcon} alt="Down Arrow" className="w-8 h-8" />;
    }
  };

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-3 text-xl not-italic font-extrabold text-black">
        {title}
      </div>
      <div className="col-start-2">
        <div className="text-3xl not-italic font-extrabold">{currentTotal}</div>
        <div className="text-lg not-italic font-medium text-black/50">
          {currentDate}
        </div>
      </div>
      <div className="">
        <div className="flex items-center">
          <div className="flex-none">{arrow()}</div>
          <div className="flex-none text-3xl not-italic font-extrabold">{pastTotal}</div>
        </div>
        <div className="text-lg not-italic font-medium text-black/50">Past month</div>
      </div>
    </div>
  );
};

export default TotalSummary;
