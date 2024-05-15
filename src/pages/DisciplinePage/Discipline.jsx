import "./DisciplinePage.scss";
import React from "react";
import DisciplineChart from "../../components/DisciplineCard/DisciplineCard";
import mockData from "../../data/mockData.json"



const Discipline = ({userData}) => {
  return (
    <div className="discipline">
        <div className="discipline__overview">
          <DisciplineChart userData={userData}/>
        </div>
    </div>
  );
};

export default Discipline;