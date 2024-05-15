import "./HomePage.scss";
import React, { useEffect, useState } from "react";
import DisciplineChart from "../../components/DisciplineCard/DisciplineCard";
import mockData from "../../data/mockData.json"
import LocationCardRefine from "../LocationCardPage/LocationCard";
import MembersCardRefine from "../MembersCardPage/MembersCard";
import IndustryCardRefine from "../IndustryCardPage/IndustryCard";
import ExperienceGraph from "../ExperienceCardPage/experienceCard";
import fetchUserData from "../../functions/fetchUserData";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

let IDID = 'UID18137005'

const Home = () => {
  const { communityManagerId } = useParams();
  const [isOnDashboard, setIsOnDashboard] = useState(true)
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserData({ communityManagerId: communityManagerId });
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error);
        setLoading(false);
      }
    };
    if (communityManagerId) {
      fetchData();
    }
  }, [communityManagerId]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(userData)

  return (
    <>
      <Navbar/>
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
    </>
  );
};

export default Home;
