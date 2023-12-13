import { FastifyInstance } from "fastify";
import {
  postPeople,
  putPeople,
  getPeople,
  getAllPeople,
  deletePeople,
} from "./people-controller";

async function peopleRoutes(route: FastifyInstance) {
  route.post("/people", postPeople);
  route.put("/people/:id", putPeople);
  route.get("/people", getAllPeople);
  route.get("/people/:id", getPeople);
  route.delete("/people/:id", deletePeople);
}

export default peopleRoutes;
