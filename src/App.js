import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import "./styles/partials/_global.scss";
import { MembersDataProvider } from "./contexts/MembersContext";
import MembersCardRefine from "./pages/MembersCardPage/MembersCard";
import IndustryCardRefine from "./pages/IndustryCardPage/IndustryCard";
import LocationCardRefine from "./pages/LocationCardPage/LocationCard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/members"
        element={
          <MembersDataProvider>
            <MembersCardRefine />
          </MembersDataProvider>
        }
      />
      <Route
        path="/industry"
        element={
          <MembersDataProvider>
            <IndustryCardRefine />
          </MembersDataProvider>
        }
      />
      <Route
        path="/location"
        element={
          <MembersDataProvider>
            <LocationCardRefine />
          </MembersDataProvider>
        }
      />
    </Routes>
  );
}

export default App;
