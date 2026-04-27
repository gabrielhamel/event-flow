import { getInfraConfig } from "@repo/core/infra/config";

const isInDevelopment = import.meta.env.MODE === "development";
const hostname = window.location.hostname;

export const configs = getInfraConfig(isInDevelopment, hostname);
