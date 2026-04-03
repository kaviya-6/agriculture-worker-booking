import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import Login from './pages/Login';
import FarmerDashboard from './pages/FarmerDashboard';
import WorkerDashboard from './pages/WorkerDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
            <Route path="/worker-dashboard" element={<WorkerDashboard />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
