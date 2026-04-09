import { oc } from "@orpc/contract";
import { z } from "zod";

export const getCurrentUserContract = oc.output(z.object({ email: z.email() }));
