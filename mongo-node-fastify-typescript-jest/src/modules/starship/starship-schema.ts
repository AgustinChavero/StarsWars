import mongoose, { Document, Schema } from "mongoose";
import { NewStarship } from "./starship-interface";

export interface NewStarshipDocument extends NewStarship, Document {}

const starshipSchema = new Schema<NewStarshipDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    manufacturer: {
      type: String,
    },
    cost_in_credits: {
      type: String,
      default: "10000000",
    },
    length: {
      type: String,
      default: "10000",
    },
    max_atmosphering_speed: {
      type: String,
    },
    crew: {
      type: String,
      default: "100",
    },
    passengers: {
      type: String,
      default: "100",
    },
    cargo_capacity: {
      type: String,
      default: "10000",
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
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Starship = mongoose.model<NewStarshipDocument>("Starship", starshipSchema);

export default Starship;
