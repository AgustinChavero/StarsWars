import { Model, Document } from "mongoose";

export const createElement = async (
  body: object,
  model: Model<any | Document>
): Promise<Document> => {
  const newElement = await model.create(body);

  return newElement;
};

export const updateElement = async (
  id: string,
  body: object,
  model: Model<any | Document>
): Promise<Document> => {
  const elementToUpdate = await model.findByIdAndUpdate(id, body);

  elementToUpdate.set(body);
  await elementToUpdate.save();

  return elementToUpdate;
};

export const findAllElement = async (
  query: { [key: string]: any },
  model: Model<any | Document>
): Promise<void | any> => {
  const modelFields = Object.keys(model.schema.obj);
  const data: { [key: string]: any } = {
    is_deleted: false,
  };

  for (const field in query) {
    if (modelFields.includes(field)) {
      data[field] = query[field];
    }
  }

  const elementsToFind = await model.find(data);

  return elementsToFind;
};

export const findElement = async (
  id: string,
  model: Model<any | Document>
): Promise<void | null> => {
  const elementToFind = await model.findById(id);

  return elementToFind;
};

export const deleteElement = async (
  id: string,
  model: Model<any | Document>
): Promise<void> => {
  const elementToDelete = await model.findById(id);

  elementToDelete.is_deleted = true;
  await elementToDelete.save();

  return elementToDelete;
};
