const mongoose = require("mongoose");

const planetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  rotation_period: {
    type: String,
    default: "12",
  },
  orbital_period: {
    type: String,
    default: "365",
  },
  diameter: {
    type: String,
    default: "12742",
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
    type: String,
    default: "8",
  },
  population: {
    type: String,
    default: "70000000000",
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
