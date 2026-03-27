import { Box } from "@mui/material";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { WhiteboardContext } from "../contexts/WhiteboardContext";
import { FabricWhiteboard } from "../FabricWhiteboard";

export const WhiteboardComponent = ({ children }: { children: ReactNode }) => {
  const [whiteboard, setWhiteboard] = useState<FabricWhiteboard | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return undefined;
    }

    const whiteboardHandle = new FabricWhiteboard(canvasRef.current, window.innerWidth, window.innerHeight);
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
  }, []);

  return (
    <WhiteboardContext
      value={{
        whiteboard,
      }}
    >
      <Box overflow="hidden">
        <canvas ref={canvasRef} />
      </Box>
      {children}
    </WhiteboardContext>
  );
};
