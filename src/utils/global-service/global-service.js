const { ClientError } = require("../utils/error/error");

const updateElement = async (id, body, model, name) => {
  const elementToUpdate = await model.findById(id);
  if (!elementToUpdate) throw new ClientError(`${name} not found`);

  elementToUpdate.set(body);
  await elementToUpdate.save();

  return elementToUpdate;
};

const patchElement = async (id, body, model, name) => {
  const elementToPatch = await model.findById(id);
  if (!elementToPatch) throw new ClientError(`${name} not found`);

  for (const key in body) {
    elementToPatch[key] = body[key];
  }
  await elementToPatch.save();

  return elementToPatch;
};

const findElement = async (id, model, name) => {
  const elementToFind = await model.findById(id);
  if (!elementToFind) throw new ClientError(`${name} not found`);

  return elementToFind;
};

const deleteElement = async (id, model, name) => {
  const elementToDelete = await model.findById(id);
  if (!elementToDelete) throw new ClientError(`${name} not found`);

  elementToDelete.isDeleted = true;
  await elementToDelete.save();

  return elementToDelete;
};

module.exports = {
  globalService: {
    updateElement,
    patchElement,
    findElement,
    deleteElement,
  },
};
