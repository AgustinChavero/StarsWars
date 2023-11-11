const { Router } = require("express");
const planetRoute = Router();

const {
  postPlanet,
  putPlanet,
  getAllPlanet,
  getPlanet,
  deletePlanet,
} = require("./planet-controller.js");
const { validatePostPlanet } = require("./validations/planet-post-validation.js");

planetRoute
  .post("/", validatePostPlanet, postPlanet)
  .put("/:id", putPlanet)
  .get("/", getAllPlanet)
  .get("/:id", getPlanet)
  .delete("/:id", deletePlanet);

module.exports = planetRoute;
