import { Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage/HomePage.jsx';
import DashboardPage from './pages/Dashboard/DashboardPage.jsx';

function App() {
  return (
    <Routes>
      <Route path='/' element={ <Home />}/>
      <Route path='/dashboard' element={ <DashboardPage />}/>
    </Routes>
  );
}

export default App;
