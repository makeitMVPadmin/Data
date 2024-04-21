import "./Discipline.scss";
import React from "react";
import DisciplineChart from "../../components/DisciplineCard/DisciplineCard";
import mockData from "../../data/mockData.json"


const Discipline = () => {
  return (
    <div className="discipline">
        <div className="discipline__overview">
          <DisciplineChart data={mockData}/>
        </div>
    </div>
  );
};

export default Discipline;