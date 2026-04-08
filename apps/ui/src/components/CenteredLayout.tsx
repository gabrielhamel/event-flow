import type { ReactNode } from "react";
import { Box } from "@mui/material";

export const CenteredLayout = ({ children }: { children: ReactNode }) => (
  <Box display={"flex"} height={"100%"} alignItems={"center"} justifyContent={"center"}>
    {children}
  </Box>
);
