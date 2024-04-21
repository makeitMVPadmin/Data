import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/HomePage"
import Navbar from "./components/Navbar/Navbar";
import Discipline from "./pages/DisciplinePage/Discipline";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discipline" element={<Discipline />} />

      </Routes>
    </>
  );
}

export default App;
