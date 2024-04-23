import { Routes, Route } from "react-router-dom";
import Home from "./main.js"
import PromptPage from "./pages/PromptPage/PromptPage";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prompt" element={<PromptPage />} />
      </Routes>
    </>
  );
}

export default App;
