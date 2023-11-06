const { Router } = require("express");
const peopleRoute = Router();

const {
  postPeople,
  putPeople,
  patchPeople,
  getAllPeople,
  getPeople,
  deletePeople,
} = require("./people-controller.js");

peopleRoute
  .post("/", postPeople)
  .put("/:id", putPeople)
  .patch("/:id", patchPeople)
  .get("/", getAllPeople)
  .get("/:id", getPeople)
  .delete("/:id", deletePeople);

module.exports = peopleRoute;
