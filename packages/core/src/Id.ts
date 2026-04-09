import { v7 as uuid } from "uuid";
import z from "zod";

export const IdSchema = z.string().brand("Id");
export type Id = z.infer<typeof IdSchema>;

export const generateId = (entityName?: string) => {
  const id = uuid();

  if (entityName !== undefined) {
    return `${entityName}-${id}` as Id;
  }

  return id as Id;
};
