const createElement = async (body, model) => {
  const newElement = await model.create(body);

  return newElement;
};

const updateElement = async (id, body, model) => {
  const elementToUpdate = await model.findByIdAndUpdate(id, body);

  elementToUpdate.set(body);
  await elementToUpdate.save();

  return elementToUpdate;
};

const patchElement = async (id, body, model) => {
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
    is_deleted: false,
  };

  modelFields.forEach((field) => {
    if (query[field]) {
      data[field] = query[field];
    }
  });

  const elementsToFind = await model.find(data);

  return elementsToFind;
};

const findElement = async (id, model) => {
  const elementToFind = await model.findById(id);

  return elementToFind;
};

const deleteElement = async (id, model) => {
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
