import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/HomePage";
import PromptPage from "./pages/PromptPage/PromptPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/prompt" element={<PromptPage />} />
    </Routes>
  );
}

export default App;
