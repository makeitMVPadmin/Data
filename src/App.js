import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import "./styles/partials/_global.scss";
import MembersCard from "./pages/MembersCardPage";
import IndustryCard from "./pages/IndustryCardPage";
import LocationCard from "./pages/LocationCardPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/members" element={<MembersCard />} />
      <Route path="/industry" element={<IndustryCard />} />
      <Route path="/location" element={<LocationCard />} />
    </Routes>
  );
}

export default App;
