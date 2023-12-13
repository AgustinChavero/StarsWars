import { FastifyInstance } from "fastify";
import {
  postPlanet,
  putPlanet,
  getPlanet,
  getAllPlanet,
  deletePlanet,
} from "./planet-controller";

async function planetRoutes(route: FastifyInstance) {
  route.post("/planet", postPlanet);
  route.put("/planet/:id", putPlanet);
  route.get("/planet", getAllPlanet);
  route.get("/planet/:id", getPlanet);
  route.delete("/planet/:id", deletePlanet);
}

export default planetRoutes;
