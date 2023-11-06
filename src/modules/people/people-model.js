const mongoose = require("mongoose");

const peopleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    height: {
      type: Number,
      default: 175,
    },
    mass: {
      type: String,
    },
    hair_color: {
      type: String,
    },
    skin_color: {
      type: String,
    },
    eye_color: {
      type: String,
    },
    birth_year: {
      type: String,
    },
    gender: {
      type: String,
    },
    homeworld: {
      type: String,
    },
    films: {
      type: [String],
    },
    species: {
      type: [String],
    },
    vehicles: {
      type: [String],
    },
    starships: {
      type: [String],
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const People = mongoose.model("People", peopleSchema);

module.exports = People;
