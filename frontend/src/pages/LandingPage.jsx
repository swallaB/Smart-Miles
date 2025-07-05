import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-green-50">
      <h1 className="text-4xl font-bold mb-4">EcoRoute Optimizer 🌱</h1>
      <p className="mb-6 text-lg">Deliver smarter, greener, and cheaper.</p>
      <Link to="/create-route" className="bg-green-600 text-white px-4 py-2 rounded">
        Get Started
      </Link>
    </div>
  );
}
