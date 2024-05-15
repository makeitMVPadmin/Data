import { Routes, Route, Navigate } from "react-router-dom";
import "./styles/partials/_global.scss";
import DashboardPage from "./pages/HomePage/DashboardPage.jsx";
import { MembersDataProvider } from "./contexts/MembersContext.js";
import MembersCardRefine from "./pages/MembersCardPage/MembersCard.jsx";
import IndustryCardRefine from "./pages/IndustryCardPage/IndustryCard.jsx";
import LocationCardRefine from "./pages/LocationCardPage/LocationCard.jsx";
import Discipline from "./pages/DisciplinePage/Discipline.jsx";
import ExperienceGraph from "./pages/ExperienceCardPage/experienceCard.jsx";
import React, { useEffect, useState } from "react";
import fetchUserData from "./functions/fetchUserData.js";
import { useParams } from "react-router-dom";

const DefaultCommunityManagerId = 'UID18137005';

function App() {
  const { communityManagerId: paramCommunityManagerId } = useParams(); // Extract from URL params
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const communityManagerId = paramCommunityManagerId || DefaultCommunityManagerId;

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

  return (
    <MembersDataProvider>
      <Routes>
        <Route path="/" element={<Navigate to={`/${communityManagerId}`} />} />
        <Route path='/:communityManagerId' element={<DashboardPage userData={userData} />} />
        <Route path='/experience' element={ <ExperienceGraph userData={userData} />}/>
        <Route path="/members" element={<MembersCardRefine userData={userData} />} />
        <Route path="/industry" element={<IndustryCardRefine userData={userData} />} />
        <Route path="/location" element={<LocationCardRefine userData={userData} />} />
        <Route path="/discipline" element={<Discipline userData={userData} />} />
      </Routes>
    </MembersDataProvider>
  );
}

export default App;
