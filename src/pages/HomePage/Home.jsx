import "./HomePage.scss";
import React from "react";
import DisciplineChart from "../../components/DisciplineCard/DisciplineCard";
import mockData from "../../data/mockData.json"


const Home = () => {
  return (
    <div className="home">
      <div className="home__upper">
        <div className="home__overview">
          <div className="home__date">
            <h2 className="home__date-font">Aprel 28, 2014</h2>
          </div>
          <div className="home__total-members">
            <h2 className="home__members-font">Total Members</h2>
            <h1 className="home__number">13823</h1>
          </div>
        </div>

        <div className="cards home__members">Members</div>
        <div className="cards home__discipline">
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
