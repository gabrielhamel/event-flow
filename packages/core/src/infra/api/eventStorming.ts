import { oc } from "@orpc/contract";
import z from "zod";
import { EventStormingDTOSchema } from "../../event-storming/domain/EventStormingEntity";
import { IdSchema } from "../../Id";

export const createEventStormingContract = oc.input(
  z.object({
    id: IdSchema,
  }),
);

export const getEventStormingContract = oc
  .input(z.object({ id: IdSchema }))
  .output(EventStormingDTOSchema);
