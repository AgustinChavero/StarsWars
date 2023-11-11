const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    episode_id: {
      type: Number,
      default: 1.0,
    },
    opening_crawl: {
      type: String,
      trim: true,
    },
    director: {
      type: String,
      trim: true,
      default: "Agustin Chavero",
    },
    producer: {
      type: String,
      trim: true,
      default: "Agustin Chavero",
    },
    release_date: {
      type: String,
      trim: true,
    },
    characters: {
      type: [String],
    },
    planets: {
      type: [String],
    },
    starships: {
      type: [String],
    },
    vehicles: {
      type: [String],
    },
    species: {
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

const Film = mongoose.model("Film", filmSchema);

module.exports = Film;
