import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import "./styles/partials/_global.scss";
import { MembersDataProvider } from "./contexts/MembersContext";
import MembersCardRefine from "./pages/MembersCardPage/MembersCard";
import IndustryCardRefine from "./pages/IndustryCardPage/IndustryCard";
import LocationCardRefine from "./pages/LocationCardPage/LocationCard";

function App() {
  return (
    <MembersDataProvider>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/members" element={<MembersCardRefine />} />
        <Route path="/industry" element={<IndustryCardRefine />} />
        <Route path="/location" element={<LocationCardRefine />} />
      </Routes>
    </MembersDataProvider>
  );
}

export default App;
