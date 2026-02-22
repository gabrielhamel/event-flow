import { Box } from "@mui/material";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { WhiteboardContext } from "../contexts/WhiteboardContext.ts";
import { Whiteboard } from "../Whiteboard.ts";

export const WhiteboardComponent = ({ children }: { children: ReactNode }) => {
  const [whiteboard, setWhiteboard] = useState<Whiteboard | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const whiteboard = new Whiteboard(canvasRef.current, window.innerWidth, window.innerHeight);
    setWhiteboard(whiteboard);

    const resizeObserver = () => whiteboard.resize(window.innerWidth, window.innerHeight);

    window.addEventListener("resize", resizeObserver);

    return () => {
      window.removeEventListener("resize", resizeObserver);
      void whiteboard.destroy();
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
