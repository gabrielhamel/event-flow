import type { ReactNode } from "react";

export const FormField = ({
  label,
  children,
}: {
  children: ReactNode;
  label: string;
}) => (
  <div className="flex flex-col gap-2">
    <label>{label}</label>
    {children}
  </div>
);
