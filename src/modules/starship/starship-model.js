const mongoose = require("mongoose");

const starshipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  model: {
    type: String,
  },
  manufacturer: {
    type: String,
  },
  cost_in_credits: {
    type: Number,
    default: 10000000,
  },
  length: {
    type: Number,
    default: 10000,
  },
  max_atmosphering_speed: {
    type: String,
  },
  crew: {
    type: Number,
    default: 100,
  },
  passengers: {
    type: Number,
    default: 100,
  },
  cargo_capacity: {
    type: Number,
    default: 10000,
  },
  consumables: {
    type: String,
  },
  hyperdrive_rating: {
    type: Number,
    default: 2.0,
  },
  MGLT: {
    type: Number,
    default: 5,
  },
  starship_class: {
    type: String,
  },
  pilots: {
    type: [String],
  },
  films: {
    type: [String],
  },
  is_deleted: {
    type: Boolean,
  },
});

const Starship = mongoose.model("Starship", starshipSchema);

module.exports = Starship;
