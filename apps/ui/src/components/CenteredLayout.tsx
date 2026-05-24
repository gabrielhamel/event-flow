import type { ReactNode } from "react";
import { Box } from "@mui/material";

export const CenteredLayout = ({
  children,
  background,
}: {
  children: ReactNode;
  background?: string;
}) => (
  <Box
    sx={{
      background,
      display: "flex",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {children}
  </Box>
);
