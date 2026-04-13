import type { Id } from "@repo/core/Id";
import { Box } from "@mui/material";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { useThemeMode } from "../../useThemeMode";
import { WhiteboardContext } from "../contexts/WhiteboardContext";
import { FabricWhiteboard } from "../FabricWhiteboard";

export const WhiteboardComponent = ({
  children,
  documentId,
}: {
  children: ReactNode;
  documentId: Id;
}) => {
  const [whiteboard, setWhiteboard] = useState<FabricWhiteboard | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { mode } = useThemeMode();

  useEffect(() => {
    if (!canvasRef.current) {
      return undefined;
    }

    const whiteboardHandle = new FabricWhiteboard(
      canvasRef.current,
      {
        height: window.innerHeight,
        width: window.innerWidth,
      },
      mode,
      documentId,
    );
    setWhiteboard(whiteboardHandle);

    const resizeObserver = () => whiteboardHandle.resize(window.innerWidth, window.innerHeight);

    window.addEventListener("resize", resizeObserver);

    return () => {
      window.removeEventListener("resize", resizeObserver);
      setWhiteboard(null);

      whiteboardHandle.dispose().catch((reason: unknown) => {
        console.error("Error destroying whiteboard:", reason);
      });
    };
  }, [mode, documentId]);

  return (
    <WhiteboardContext
      value={{
        whiteboard,
      }}
    >
      <Box sx={{ overflow: "hidden" }}>
        <canvas ref={canvasRef} />
      </Box>
      {children}
    </WhiteboardContext>
  );
};
