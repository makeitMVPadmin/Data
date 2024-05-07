import "./HomePage.scss";
import React, { useState } from "react";
import DisciplineChart from "../../components/DisciplineCard/DisciplineCard";
import mockData from "../../data/mockData.json"
import LocationCardRefine from "../LocationCardPage/LocationCard";
import MembersCardRefine from "../MembersCardPage/MembersCard";
import IndustryCardRefine from "../IndustryCardPage/IndustryCard";
import ExperienceGraph from "../ExperienceCardPage/experienceCard";


const Home = () => {
  const [isOnDashboard, setIsOnDashboard] = useState(true)

  return (
    <div className="home">
      <div className="home__upper">
        <div className="home__overview">
          <div className="home__date">
            <h2 className="home__date-font">April 28, 2014</h2>
          </div>
          <div className="home__total-members">
            <h2 className="home__members-font">Total Members</h2>
            <h1 className="home__number">13823</h1>
          </div>
        </div>

        <div className="cards home__members">
          <MembersCardRefine isOnDashboard={isOnDashboard}/>
        </div>
        <div className="cards home__discipline">
          <DisciplineChart data={mockData} isOnDashboard={isOnDashboard}/>
        </div>
      </div>

      <div className="home__lower">
        <div className="cards home-location">
          <LocationCardRefine isOnDashboard={isOnDashboard} />
        </div>
        <div className="cards home-industry">
          <IndustryCardRefine isOnDashboard={isOnDashboard} />
        </div>
        <div className="cards home-experience">
            <ExperienceGraph isOnDashboard={isOnDashboard} />
        </div>
      </div>

    </div>
  );
};

export default Home;
