import "./HomePage.scss";
import React, { useEffect, useState } from "react";
import DisciplineChart from "../../components/DisciplineCard/DisciplineCard";
import LocationCardRefine from "../LocationCardPage/LocationCard";
import MembersCardRefine from "../MembersCardPage/MembersCard";
import IndustryCardRefine from "../IndustryCardPage/IndustryCard";
import ExperienceGraph from "../ExperienceCardPage/experienceCard";
import Navbar from "../../components/Navbar/Navbar";
import TempUi from "../../components/TempUi/TempUi";


const DashboardPage = ({userData}) => {

  const [isOnDashboard, setIsOnDashboard] = useState(true)

  const numberOfUsers = userData.length

  return (
    <div className="dash__body">
      <TempUi />
      <Navbar userData={userData}/>
      <div className="home">
        <div className="home__upper">
          <div className="home__overview">
            <div className="home__date">
              <h2 className="home__date-font">April 28, 2014</h2>
            </div>
            <div className="home__total-members">
              <h2 className="home__members-font">Total Members</h2>
              <h1 className="home__number">{numberOfUsers}</h1>
            </div>
          </div>

          <div className="cards home__members">
            <MembersCardRefine userData={userData} isOnDashboard={isOnDashboard}/>
          </div>
          <div className="cards home__discipline">
            <DisciplineChart userData={userData} isOnDashboard={isOnDashboard}/>
          </div>
        </div>

        <div className="home__lower">
          <div className="cards home-location">
            <LocationCardRefine userData={userData} isOnDashboard={isOnDashboard} />
          </div>
          <div className="cards home-industry">
            <IndustryCardRefine userData={userData} isOnDashboard={isOnDashboard} />
          </div>
          <div className="cards home-experience">
              <ExperienceGraph userData={userData} isOnDashboard={isOnDashboard} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
