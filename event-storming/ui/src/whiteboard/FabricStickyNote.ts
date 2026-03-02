import type { StickyNote, StickyNoteDocumentObject } from "@repo/core/StickyNote";
import { type Canvas, FabricObject, Group, Shadow, Textbox } from "fabric";

export class FabricStickyNote implements StickyNote {
  private readonly textbox: Textbox;
  private readonly card: FabricObject;
  private readonly group: Group;
  private readonly identifier: string;
  private readonly color: string;

  constructor(color: string, x: number, y: number) {
    this.identifier = crypto.randomUUID();
    this.color = color;

    const size = 150;

    this.card = new FabricObject({
      backgroundColor: color,
      hasBorders: false,
      hasControls: false,
      height: size,
      width: size,
    });

    const textPadding = 20;
    this.textbox = new Textbox("", {
      fill: "#333333",
      fontFamily: "Roboto",
      fontSize: 18,
      hasBorders: false,
      hasControls: false,
      height: size - textPadding,
      splitByGrapheme: true,
      textAlign: "center",
      width: size - textPadding,
    });

    this.textbox.on("changed", () => {
      this.textbox.setRelativeY(0);
    });

    this.group = new Group([this.card, this.textbox], {
      hasBorders: false,
      hasControls: false,
      left: x,
      selectable: true,
      shadow: new Shadow({
        blur: 10,
        color: "rgba(0, 0, 0, 0.2)",
        offsetX: 2,
        offsetY: 2,
      }),
      subTargetCheck: true,
      top: y,
    });

    this.group.on("mousedblclick", () => {
      this.textbox.canvas?.setActiveObject(this.textbox);
      this.textbox.enterEditing();
      this.textbox.selectAll();
    });
  }

  static makeFromDocumentObject(object: StickyNoteDocumentObject) {
    const stickyNote = new FabricStickyNote(object.color, object.x, object.y);
    stickyNote.updateFromDocumentObject(object);
    return stickyNote;
  }

  id() {
    return this.identifier;
  }

  attach(canvas: Canvas) {
    canvas.add(this.group);
  }

  enterEditing() {
    this.textbox.canvas?.setActiveObject(this.textbox);
    this.textbox.enterEditing();
  }

  toDocumentObject() {
    return {
      color: this.color,
      id: this.identifier,
      text: this.textbox.text,
      x: this.group.left,
      y: this.group.top,
    };
  }

  updateFromDocumentObject(object: StickyNoteDocumentObject) {
    this.textbox.set("text", object.text);
    this.group.set({
      left: object.x,
      top: object.y,
    });
  }
}
