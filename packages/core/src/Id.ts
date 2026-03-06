import { v7 as uuid } from "uuid";

export type Id = string & { _brand: "Id" };

export const generateId = (entityName?: string) => {
  const id = uuid();

  if (entityName !== undefined) {
    return `${entityName}-${id}` as Id;
  }

  return id as Id;
};
