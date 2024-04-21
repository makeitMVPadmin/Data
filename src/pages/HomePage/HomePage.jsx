import "./HomePage.scss";
import React from "react";
import DisciplineChart from "../../components/DisciplineCard/DisciplineCard";
import mockData from "../../data/mockData.json"


const Home = () => {
  return (
    <div className="home">
      <div className="home__upper">
        <div className="cards home__overview">
          <div className="date">Aprel 17 2014</div>
          <div className="home__total-members">Total Members 13823</div>
        </div>

        <div className="cards home-members">Members</div>
        <div className="cards home-discipline">
          <DisciplineChart data={mockData}/>
        </div>
      </div>

      <div className="home__lower">
        <div className="cards home-location">Location</div>
        <div className="cards home-industry">Industry</div>
        <div className="cards home-experience">Experience</div>
      </div>

    </div>
  );
};

export default Home;
