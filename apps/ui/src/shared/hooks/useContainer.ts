import { useContext } from "react";
import type { Container } from "@/app/container";
import { ContainerContext } from "@/shared/contexts/ContainerContext";

export const useContainer = () => useContext(ContainerContext) as Container;
