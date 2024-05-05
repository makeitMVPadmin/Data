import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/Home.jsx";
import "./styles/partials/_global.scss";
import DashboardPage from './pages/Dashboard/DashboardPage.jsx'
import { MembersDataProvider } from "./contexts/MembersContext.js";
import MembersCardRefine from "./pages/MembersCardPage/MembersCard.jsx";
import IndustryCardRefine from "./pages/IndustryCardPage/IndustryCard.jsx";
import LocationCardRefine from "./pages/LocationCardPage/LocationCard.jsx";

function App() {
  return (
    <MembersDataProvider>
      <Routes>
        <Route path='/' element={ <Home />}/>
      <Route path='/dashboard/:communityId' element={ <DashboardPage />}/>

        <Route path="/members" element={<MembersCardRefine />} />
        <Route path="/industry" element={<IndustryCardRefine />} />
        <Route path="/location" element={<LocationCardRefine />} />
      </Routes>
    </MembersDataProvider>
  );
}

export default App;
