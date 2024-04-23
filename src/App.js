import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import "./styles/partials/_global.scss";
import MembersCard from "./pages/MembersCardPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/members" element={<MembersCard />} />
    </Routes>
  );
}

export default App;
