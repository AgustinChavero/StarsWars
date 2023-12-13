import { FastifyInstance } from "fastify";
import {
  postStarship,
  putStarship,
  getStarship,
  getAllStarship,
  deleteStarship,
} from "./starship-controller";

async function starshipRoutes(route: FastifyInstance) {
  route.post("/starship", postStarship);
  route.put("/starship/:id", putStarship);
  route.get("/starship", getAllStarship);
  route.get("/starship/:id", getStarship);
  route.delete("/starship/:id", deleteStarship);
}

export default starshipRoutes;
