const mongoose = require("mongoose");

const stopSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
  address: String,
});

const routeSchema = new mongoose.Schema({
  // 🏷️ Basic Info
  routeName: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // 🧭 Stops & Geometry
  stops: [stopSchema], // pickup + dropoffs
  geometry: Object,     // OR encoded polyline string

  // 🚗 Vehicle Info
  vehicleType: { type: String, required: true },             // user selected
  recommendedVehicle: { type: String },                      // system suggested
  optimizationType: {                                        // how it was optimized
    type: String,
    enum: ["eco", "fastest", "shortest", "custom"],
    default: "eco",
  },
  tradeoffWeights: {
    cost: { type: Number, default: 0.33 },
    co2: { type: Number, default: 0.34 },
    time: { type: Number, default: 0.33 },
  },

  // 📊 Route Results
  distance: Number,     // km
  duration: Number,     // mins
  co2: Number,          // kg
  fuelCost: Number,     // ₹

  // 📈 Analytics Snapshot
  analyticsSnapshot: {
    typicalCo2: Number,     // petrol van baseline
    co2Saved: Number,       // kg saved
    fuelSaved: Number,      // ₹ saved
    timeSaved: Number,      // mins saved
  },

  // 🌳 Offset Prompt
  offsetSuggested: { type: Boolean, default: false },

  // 📆 For Dashboard Timeline
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Route", routeSchema);
