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

peopleRoute.post("/").put("/:id").patch("/:id").get("/").get("/:id").delete("/:id");

module.exports = peopleRoute;
