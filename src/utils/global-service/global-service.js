const { ClientError } = require("../utils/error/error");

const deleteElement = async (id, model, name) => {
  const elementToDelete = await model.findById(id);
  if (!elementToDelete) throw new Error(`${name} not found`);

  elementToDelete.isDeleted = true;
  await elementToDelete.save();

  return elementToDelete;
};

const findElement = async (id, model, name) => {
  const elementToFind = await model.findById(id);
  if (!elementToFind) throw new Error(`${name} not found`);

  return elementToFind;
};

const patchElement = async (id, body, model, name) => {
  const elementToPatch = await model.findById(id);
  if (!elementToPatch) throw new Error(`${name} not found`);

  for (const key in body) {
    elementToPatch[key] = body[key];
  }
  await elementToPatch.save();

  return elementToPatch;
};

const updateElement = async (id, body, model, name) => {
  const elementToUpdate = await model.findById(id);
  if (!elementToUpdate) throw new Error(`${name} not found`);

  elementToUpdate.set(body);
  await elementToUpdate.save();

  return elementToUpdate;
};

module.exports = {
  globalService: {
    deleteElement,
    findElement,
    patchElement,
    updateElement,
  },
};
