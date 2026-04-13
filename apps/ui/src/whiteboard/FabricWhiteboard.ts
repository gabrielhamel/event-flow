import type { Id } from "@repo/core/Id";
import { getInfraConfig } from "@repo/core/infra/config";
import { WhiteboardSession } from "@repo/core/whiteboard/collaborative/WhiteboardSession";
import { Canvas, type TPointerEventInfo } from "fabric";
import { addPanningModule } from "./canvas/modules/pan";
import { addZoomingModule } from "./canvas/modules/zoom";
import { FabricCursorFactory } from "./objects/factories/FabricCursorFactory";
import { FabricStickyNoteFactory } from "./objects/factories/FabricStickyNoteFactory";

const isInDevelopment = import.meta.env.MODE === "development";
const { apiWebsocketBaseUrl } = getInfraConfig(isInDevelopment);

export class FabricWhiteboard {
  private readonly canvas: Canvas;
  private readonly collaborativeSession: WhiteboardSession;
  private readonly stickyNoteFactory: FabricStickyNoteFactory;

  constructor(
    anchor: HTMLCanvasElement,
    size: { width: number; height: number },
    theme: "light" | "dark",
    documentId: Id,
  ) {
    this.canvas = new Canvas(anchor, {
      backgroundColor: theme === "light" ? "#F8F9FA" : "#1E1E1E",
      enableRetinaScaling: true,
      height: size.height,
      selection: false,
      width: size.width,
    });

    addPanningModule(this.canvas);
    addZoomingModule(this.canvas);

    this.canvas.requestRenderAll();

    this.stickyNoteFactory = new FabricStickyNoteFactory(this.canvas);
    const cursorFactory = new FabricCursorFactory(this.canvas);

    this.collaborativeSession = new WhiteboardSession(
      `${apiWebsocketBaseUrl}/collaboration`,
      this.stickyNoteFactory,
      cursorFactory,
      documentId,
    );

    this.canvas.on("mouse:move", this.handleMouseMove.bind(this));
  }

  async dispose() {
    this.collaborativeSession.dispose();
    await this.canvas.dispose();
  }

  resize(width: number, height: number) {
    this.canvas.setDimensions({
      height,
      width,
    });
  }

  createStickyNote(color: string) {
    const { x, y } = this.canvas.getVpCenter();

    const stickyNote = this.stickyNoteFactory.create({
      data: {
        color,
        text: "",
        x,
        y,
      },
      session: this.collaborativeSession,
    });

    this.collaborativeSession.addStickyNote(stickyNote);
  }

  private handleMouseMove(event: TPointerEventInfo) {
    this.collaborativeSession.updateCursorPosition(event.scenePoint.x, event.scenePoint.y);
  }
}
