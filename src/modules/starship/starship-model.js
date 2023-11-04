import mongoose from "mongoose";

const starshipSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  model: {
    type: String,
  },
  manufacturer: {
    type: String,
  },
  cost_in_credits: {
    type: String,
  },
  length: {
    type: String,
  },
  max_atmosphering_speed: {
    type: String,
  },
  crew: {
    type: String,
  },
  passengers: {
    type: String,
  },
  cargo_capacity: {
    type: String,
  },
  consumables: {
    type: String,
  },
  hyperdrive_rating: {
    type: String,
  },
  MGLT: {
    type: String,
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
