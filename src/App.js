import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import "./styles/partials/_global.scss";
import MembersChart from "./pages/MembersChartPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/members" element={<MembersChart />} />
    </Routes>
  );
}

export default App;
