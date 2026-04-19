import { eventStormingContract } from "../event-storming/infra/contract";
import { userContract } from "../user/infra/contract";

export const routerContract = {
  user: userContract,
  eventStorming: eventStormingContract,
};
