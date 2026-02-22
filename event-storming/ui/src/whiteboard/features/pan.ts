import type { Canvas, TPointerEventInfo } from "fabric";

export const setupPanningForCanvas = (canvas: Canvas) => {
  const moveViewport = (deltaX: number, deltaY: number) => {
    const transform = canvas.viewportTransform;
    transform[4] += deltaX;
    transform[5] += deltaY;

    canvas.requestRenderAll();
  };

  const handleMouseWheel = ({ e: event }: TPointerEventInfo<WheelEvent>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!event.ctrlKey) {
      moveViewport(-event.deltaX * 1.7, -event.deltaY * 1.7);
    }
  };

  canvas.on("mouse:wheel", handleMouseWheel);
};
