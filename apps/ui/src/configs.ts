import { getInfraConfig } from "@repo/core/infra/config";

const isInDevelopment = import.meta.env.MODE === "development";

export const configs = getInfraConfig(isInDevelopment);
