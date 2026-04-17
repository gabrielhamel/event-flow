import { createEventStormingContract, getEventStormingContract } from "./eventStorming";
import { getCurrentUserContract } from "./user";

export const routerContract = {
  user: {
    current: getCurrentUserContract,
  },
  eventStorming: {
    get: getEventStormingContract,
    create: createEventStormingContract,
  },
};
