const { Router } = require("express");
const planetRoute = Router();

const {
  postPlanet,
  putPlanet,
  getAllPlanet,
  getPlanet,
  deletePlanet,
} = require("./planet-controller.js");

planetRoute
  .post("/", postPlanet)
  .put("/:id", putPlanet)
  .get("/", getAllPlanet)
  .get("/:id", getPlanet)
  .delete("/:id", deletePlanet);

module.exports = planetRoute;
