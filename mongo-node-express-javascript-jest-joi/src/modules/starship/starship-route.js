const { Router } = require("express");
const starshipRoute = Router();

const {
  postStarship,
  putStarship,
  getAllStarship,
  getStarship,
  deleteStarship,
} = require("./starship-controller.js");

starshipRoute
  .post("/", postStarship)
  .put("/:id", putStarship)
  .get("/", getAllStarship)
  .get("/:id", getStarship)
  .delete("/:id", deleteStarship);

module.exports = starshipRoute;
