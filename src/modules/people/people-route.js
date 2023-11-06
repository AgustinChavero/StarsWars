const { Router } = require("express");
const peopleRoute = Router();

const {
  postPeople,
  putPeople,
  getAllPeople,
  getPeople,
  deletePeople,
} = require("./people-controller.js");

peopleRoute
  .post("/", postPeople)
  .put("/:id", putPeople)
  .get("/", getAllPeople)
  .get("/:id", getPeople)
  .delete("/:id", deletePeople);

module.exports = peopleRoute;
