import { Box } from "@mui/material";
import { WhiteboardContext } from "@repo/event-storming-ui/whiteboard/contexts/WhiteboardContext.ts";
import { Whiteboard } from "@repo/event-storming-ui/whiteboard/Whiteboard.ts";
import { type ReactNode, useEffect, useRef, useState } from "react";

export const WhiteboardComponent = ({ children }: { children: ReactNode }) => {
  const [whiteboard, setWhiteboard] = useState<Whiteboard | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return undefined;
    }

    const whiteboardHandle = new Whiteboard(canvasRef.current, window.innerWidth, window.innerHeight);
    setWhiteboard(whiteboardHandle);

    const resizeObserver = () => whiteboardHandle.resize(window.innerWidth, window.innerHeight);

    window.addEventListener("resize", resizeObserver);

    return () => {
      window.removeEventListener("resize", resizeObserver);
      whiteboardHandle.destroy();
      setWhiteboard(null);
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
