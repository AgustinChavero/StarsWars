const { ClientError } = require("../errors/error");

const createElement = async (body, model, name) => {
  const newElement = await new model(body);

  return newElement;
};

const updateElement = async (id, body, model, name) => {
  const elementToUpdate = await model.findById(id);

  elementToUpdate.set(body);
  await elementToUpdate.save();

  return elementToUpdate;
};

const patchElement = async (id, body, model, name) => {
  const elementToPatch = await model.findById(id);

  for (const key in body) {
    elementToPatch[key] = body[key];
  }
  await elementToPatch.save();

  return elementToPatch;
};

const findAllElement = async (model, query) => {
  const modelFields = Object.keys(model.schema.obj);
  const data = {
    //is_deleted: false,
  };

  modelFields.forEach((field) => {
    if (query[field]) {
      data[field] = query[field];
    }
  });

  const elementsToFind = await model.find(data);

  return elementsToFind;
};

const findElement = async (id, model, name) => {
  const elementToFind = await model.findById(id);

  return elementToFind;
};

const deleteElement = async (id, model, name) => {
  const elementToDelete = await model.findById(id);

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
