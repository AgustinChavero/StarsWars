import mongoose, { Document, Schema } from "mongoose";
import { NewPlanet } from "./planet-interface";

export interface NewPlanetDocument extends NewPlanet, Document {}

const planetSchema = new Schema<NewPlanetDocument>(
  {
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
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Planet = mongoose.model<NewPlanetDocument>("Planet", planetSchema);

export default Planet;
