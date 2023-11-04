import mongoose from "mongoose";

const planetSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  rotation_period: {
    type: String,
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
  },
  population: {
    type: String,
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
