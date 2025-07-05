import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between">
      <h1 className="font-bold text-xl">EcoRoute Optimizer 🌱</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/create-route">Create Route</Link>
        <Link to="/saved-routes">Saved Routes</Link>
        <Link to="/dispatchers">Dispatchers</Link>
      </div>
    </nav>
  );
}
