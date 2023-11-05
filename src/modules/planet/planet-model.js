const mongoose = require("mongoose");

const planetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  rotation_period: {
    type: Number,
    default: 12,
  },
  orbital_period: {
    type: Number,
    default: 365,
  },
  diameter: {
    type: Number,
    default: 12742,
  },
  climate: {
    type: String,
  },
  gravity: {
    type: String,
  },
  terrain: {
    type: String,
  },
  surface_water: {
    type: Number,
    default: 8,
  },
  population: {
    type: Number,
    default: 70000000000,
  },
  residents: {
    type: [String],
  },
  films: {
    type: [String],
  },
  is_deleted: {
    type: Boolean,
  },
});

const Planet = mongoose.model("Planet", planetSchema);

module.exports = Planet;
