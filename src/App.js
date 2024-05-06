import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/Home.jsx";
import "./styles/partials/_global.scss";
import DashboardPage from './pages/Dashboard/DashboardPage.jsx'
import { MembersDataProvider } from "./contexts/MembersContext.js";
import MembersCardRefine from "./pages/MembersCardPage/MembersCard.jsx";
import IndustryCardRefine from "./pages/IndustryCardPage/IndustryCard.jsx";
import LocationCardRefine from "./pages/LocationCardPage/LocationCard.jsx";
import ExperiencePage from "./pages/ExperienceCardPage/experienceCard.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Discipline from "./pages/DisciplinePage/Discipline.jsx";

function App() {
  return (
    <MembersDataProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={ <Home />}/>
        <Route path='/dashboard' element={ <DashboardPage />}/>
        <Route path='/experience' element={ <ExperiencePage />}/>
        <Route path="/members" element={<MembersCardRefine />} />
        <Route path="/industry" element={<IndustryCardRefine />} />
        <Route path="/location" element={<LocationCardRefine />} />
        <Route path="/discipline" element={<Discipline />} />
      </Routes>
    </MembersDataProvider>
  );
}

export default App;
