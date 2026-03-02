import type { Canvas, TPointerEvent, TPointerEventInfo } from "fabric";

export const addZoomingModule = (canvas: Canvas) => {
  const zoomToPosition = (delta: number, pointer: TPointerEvent) => {
    const zoomFactor = canvas.getZoom() * (0.99 ** delta);
    const zoomClamped = Math.max(0.4, Math.min(5, zoomFactor));

    const viewportPoint = canvas.getViewportPoint(pointer);
    canvas.zoomToPoint(viewportPoint, zoomClamped);
  };

  const handleMouseWheel = ({ e: event }: TPointerEventInfo<WheelEvent>) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.ctrlKey) {
      zoomToPosition(event.deltaY, event);
    }
  };

  canvas.on("mouse:wheel", handleMouseWheel);
};
