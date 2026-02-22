import type { ReactNode } from "react";
import { Toolbar as PrimeReactToolbar } from "primereact/toolbar";

export const Toolbar = ({
  start,
  center,
}: {
  start: ReactNode;
  center: ReactNode;
}) => (
  <PrimeReactToolbar
    className="noVerticalPadding"
    center={center}
    start={start}
  />
);
