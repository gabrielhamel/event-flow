import { getCurrentUserContract } from "./user";

export const routerContract = {
  user: {
    current: getCurrentUserContract,
  },
};
