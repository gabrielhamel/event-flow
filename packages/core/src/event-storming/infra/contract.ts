import { oc } from "@orpc/contract";
import z from "zod";
import { IdSchema } from "../../Id";
import { EventStormingDTOSchema } from "../domain/EventStormingEntity";

const createEventStormingContract = oc.input(
  z.object({
    id: IdSchema,
  }),
);

const getEventStormingContract = oc
  .input(z.object({ id: IdSchema }))
  .output(EventStormingDTOSchema);

export const eventStormingContract = {
  create: createEventStormingContract,
  get: getEventStormingContract,
};
