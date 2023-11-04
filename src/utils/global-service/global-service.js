const { ClientError } = require("../utils/error/error");

const deleteItem = async (id, model, name) => {
  const updateItem = await model.findOne({ where: { id } });

  if (!updateItem) throw new ClientError(`${name} not found`, 404);

  await updateItem.update({ isDeleted: true });

  await updateItem.save();

  return updateItem;
};

const findItem = async (id, model, name) => {
  const itemFind = await model.findByPk(id);

  if (!itemFind) throw new ClientError(`${name} not found`, 404);

  return itemFind;
};

const patchItem = async (id, body, model, name) => {
  const itemPatch = await model.findOne({ where: { id } });

  if (!itemPatch) throw new ClientError(`${name} not found`, 404);

  await itemPatch.update(body, { fields: Object.keys(body) });

  await itemPatch.save();

  return itemPatch;
};

const updateItem = async (id, body, model, name) => {
  const itemUpdate = await model.findOne({ where: { id } });

  if (!itemUpdate) throw new ClientError(`${name} not found`, 404);

  await itemUpdate.update(body);

  await itemUpdate.save();

  return itemUpdate;
};

module.exports = {
  globalService: {
    deleteItem,
    findItem,
    patchItem,
    updateItem,
  },
};