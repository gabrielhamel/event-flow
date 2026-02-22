import type { ReactNode } from "react";
import type { Container } from "@/app/container";
import { ContainerContext } from "@/shared/contexts/ContainerContext";

export const ContainerProvider = ({
  children,
  container,
}: {
  children: ReactNode;
  container: Container;
}) => <ContainerContext value={container}>{children}</ContainerContext>;
