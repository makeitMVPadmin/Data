import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import "./styles/partials/_global.scss";
import MembersCard from "./pages/MembersCardPage";
import IndustryCard from "./pages/IndustryCardPage";
import LocationCard from "./pages/LocationCardPage";
import MembersCardRefine from "./pages/MembersCardPage/MembersCard";
import IndustryCardRefine from "./pages/IndustryCardPage/IndustryCard";
import { MembersDataProvider } from "./contexts/MembersContext";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/members" element={<MembersDataProvider><MembersCardRefine /></MembersDataProvider>} />
        <Route path="/industry" element={<MembersDataProvider><IndustryCardRefine /></MembersDataProvider>} />
      <Route path="/location" element={<LocationCard />} />
    </Routes>
  );
}

export default App;
