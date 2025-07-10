const Route = require("../models/route");

// 🛣️ 1. Create Route
exports.createRoute = async (req, res) => {
  const {
    routeName,
    vehicleType,
    recommendedVehicle,
    optimizationType,
    tradeoffWeights,
    stops,
    distance,
    duration,
    co2,
    fuelCost,
    geometry,
    analyticsSnapshot,
    offsetSuggested,
  } = req.body;

  try {
    const newRoute = new Route({
      routeName,
      vehicleType,
      recommendedVehicle,
      optimizationType,
      tradeoffWeights,
      stops,
      distance,
      duration,
      co2,
      fuelCost,
      geometry,
      analyticsSnapshot,
      offsetSuggested,
      createdBy: req.user.id, // comes from verifyToken middleware
    });

    await newRoute.save();
    res.status(201).json({ message: "Route created successfully", route: newRoute });
  } catch (err) {
    res.status(500).json({ error: "Failed to create route", detail: err.message });
  }
};

// 📋 2. Get Routes for Logged-in User
exports.getMyRoutes = async (req, res) => {
  try {
    const routes = await Route.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(routes);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch routes", detail: err.message });
  }
};

// (Optional) 🔍 3. Get Route by ID
exports.getRouteById = async (req, res) => {
  try {
    const route = await Route.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!route) {
      return res.status(404).json({ error: "Route not found" });
    }

    res.status(200).json(route);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch route", detail: err.message });
  }
};
