const express = require("express");
const {
  createRoute,
  getMyRoutes,
  getRouteById,
} = require("../controllers/routeController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

// Protected routes — require login
router.post("/", verifyToken, createRoute);         // Create route
router.get("/my", verifyToken, getMyRoutes);        // Get all my routes
router.get("/:id", verifyToken, getRouteById);      // View one route

module.exports = router;
