import type { ReactNode } from "react";

export const ResponsiveGrid = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-1">
    {children}
  </div>
);
