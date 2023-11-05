const { ClientError } = require("../errors/error");

const createElement = async (body, model, name) => {
  const newElement = await new model(body);
  if (!newElement) throw new ClientError(`Error to create ${name}`, 404);

  return newElement;
};

const updateElement = async (id, body, model, name) => {
  const elementToUpdate = await model.findById(id);
  if (!elementToUpdate) throw new ClientError(`${name} not found`, 409);

  elementToUpdate.set(body);
  await elementToUpdate.save();

  return elementToUpdate;
};

const patchElement = async (id, body, model, name) => {
  const elementToPatch = await model.findById(id);
  if (!elementToPatch) throw new ClientError(`${name} not found`, 409);

  for (const key in body) {
    elementToPatch[key] = body[key];
  }
  await elementToPatch.save();

  return elementToPatch;
};

const findAllElement = async (model, query, name) => {
  const modelFields = Object.keys(model.schema.obj);
  const data = {
    is_deleted: false,
  };

  modelFields.forEach((field) => {
    if (query[field]) {
      data[field] = query[field];
    }
  });

  const elementsToFind = await model.find(data);
  if (!elementsToFind.length)
    throw new ClientError(`${name} with that params doesnt exist`, 409);

  return elementsToFind;
};

const findElement = async (id, model, name) => {
  const elementToFind = await model.findById(id);
  if (!elementToFind) throw new ClientError(`${name} not found`, 409);

  return elementToFind;
};

const deleteElement = async (id, model, name) => {
  const elementToDelete = await model.findById(id);
  if (!elementToDelete) throw new ClientError(`${name} not found`, 409);

  elementToDelete.is_deleted = true;
  await elementToDelete.save();

  return elementToDelete;
};

module.exports = {
  globalService: {
    createElement,
    updateElement,
    patchElement,
    findAllElement,
    findElement,
    deleteElement,
  },
};
