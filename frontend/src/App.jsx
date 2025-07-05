import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import 'leaflet/dist/leaflet.css';
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import CreateRoute from "./pages/CreateRoute";
import SavedRoutes from "./pages/SavedRoutes";
import DispatcherProfiles from "./pages/DispatcherProfile";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-route" element={<CreateRoute />} />
        <Route path="/saved-routes" element={<SavedRoutes />} />
        <Route path="/dispatchers" element={<DispatcherProfiles />} />
      </Routes>
    </Router>
  );
}
