import { oc } from "@orpc/contract";
import { UserDTOSchema } from "../../user/domain/UserEntity";

export const getCurrentUserContract = oc.output(UserDTOSchema);
