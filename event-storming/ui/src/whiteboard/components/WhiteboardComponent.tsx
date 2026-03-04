import { Box } from "@mui/material";
import { WhiteboardContext } from "@repo/event-storming-ui/whiteboard/contexts/WhiteboardContext";
import { FabricWhiteboard } from "@repo/event-storming-ui/whiteboard/FabricWhiteboard";
import { type ReactNode, useEffect, useRef, useState } from "react";

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
