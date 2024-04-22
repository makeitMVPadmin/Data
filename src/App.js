import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import "./styles/partials/_global.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
