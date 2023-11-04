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
    },
    opening_crawl: {
      type: String,
    },
    director: {
      type: String,
    },
    producer: {
      type: String,
    },
    release_date: {
      type: String,
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
    },
  },
  {
    timestamps: true,
  }
);

const Film = mongoose.model("Film", filmSchema);

module.exports = Film;
