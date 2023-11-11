const { Router } = require("express");
const starshipRoute = Router();

const {
  postStarship,
  putStarship,
  getAllStarship,
  getStarship,
  deleteStarship,
} = require("./starship-controller.js");
const { validatePostStarship } = require("./validations/starship-post-validation.js");

starshipRoute
  .post("/", validatePostStarship, postStarship)
  .put("/:id", putStarship)
  .get("/", getAllStarship)
  .get("/:id", getStarship)
  .delete("/:id", deleteStarship);

module.exports = starshipRoute;
