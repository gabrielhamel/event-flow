import type { Canvas, TPointerEvent, TPointerEventInfo } from "fabric";

export const listenCanvasZoom = (canvas: Canvas, onCanvasZoom: (delta: number, pointer: TPointerEvent) => void) => {
  const handleMouseWheel = ({ e: event }: TPointerEventInfo<WheelEvent>) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.ctrlKey) {
      onCanvasZoom(event.deltaY, event);
    }
  };

  return canvas.on("mouse:wheel", handleMouseWheel);
};

export const addZoomingModule = (canvas: Canvas) => {
  const zoomToPointer = (delta: number, pointer: TPointerEvent) => {
    const zoomFactor = canvas.getZoom() * (0.99 ** delta);
    const zoomClamped = Math.max(0.4, Math.min(5, zoomFactor));

    const viewportPoint = canvas.getViewportPoint(pointer);
    canvas.zoomToPoint(viewportPoint, zoomClamped);
  };

  return listenCanvasZoom(canvas, zoomToPointer);
};
