import { createContext } from "react";
import type { Container } from "@/app/container";

export const ContainerContext = createContext<Container | null>(null);
