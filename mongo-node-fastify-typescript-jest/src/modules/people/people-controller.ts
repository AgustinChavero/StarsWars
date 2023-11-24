import { FastifyRequest, FastifyReply } from "fastify";
import People from "./people-schema";
import { NewPeople } from "./people-interface";
import { errorResponse } from "../../services/global-errors/custom-error";
import { customResponse } from "../../services/global-errors/custom-response";

import {
  createElement,
  deleteElement,
  findAllElement,
  findElement,
  updateElement,
} from "../../services/global-functions/global-service";
import { bodyValidation } from "../../services/global-validations/global-validation";
import { bodyDTO } from "./people-dto";

export const postPeople = async (
  req: FastifyRequest<{ Body: NewPeople }>,
  reply: FastifyReply
): Promise<void> => {
  const data: NewPeople = req.body;

  const bodyValidate = bodyValidation(bodyDTO, req);
  if (bodyValidate) return errorResponse(reply, 404, `${bodyValidate}`);

  const exist = await findAllElement(data, People);
  if (exist.length) return errorResponse(reply, 409, "Values no validates");

  const newPeople = await createElement(data, People);

  customResponse(reply, 200, { message: "People created", newPeople });
};

export const putPeople = async (
  req: FastifyRequest<{ Params: { id: string }; Body: NewPeople }>,
  reply: FastifyReply
): Promise<void> => {
  const id: string = req.params.id;
  const data: NewPeople = req.body;

  const exist = await findElement(id, People);
  if (!exist) return errorResponse(reply, 409, "People doesn't exists");

  const people = await updateElement(id, data, People);

  customResponse(reply, 200, { message: "People edited", people });
};

export const getAllPeople = async (
  req: FastifyRequest<{ Querystring: NewPeople }>,
  reply: FastifyReply
): Promise<void> => {
  const data: NewPeople = req.query;

  const peoples = await findAllElement(data, People);
  if (!peoples.length) return errorResponse(reply, 409, "Peoples not found");

  customResponse(reply, 200, { message: "Peoples founded", peoples });
};

export const getPeople = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const id: string = req.params.id;

  const people = await findElement(id, People);
  if (!people) return errorResponse(reply, 409, "People doesn't exists");

  customResponse(reply, 200, { message: "People founded", people });
};

export const deletePeople = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const id: string = req.params.id;

  const exist = await findElement(id, People);
  if (!exist) return errorResponse(reply, 409, "People doesn't exists");

  const people = await deleteElement(id, People);

  customResponse(reply, 200, { message: "People deleted", people });
};
