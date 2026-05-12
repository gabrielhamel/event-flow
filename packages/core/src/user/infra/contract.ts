import { oc } from "@orpc/contract";
import { UserDTOSchema } from "../domain/UserEntity";

const getCurrentUserContract = oc.output(UserDTOSchema);

export const userContract = {
  current: getCurrentUserContract,
};
