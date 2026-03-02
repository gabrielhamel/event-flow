import { CollaborativeEntity } from "@repo/core/CollaborativeEntity";
import type { StickyNoteCollaborativeData } from "@repo/core/StickyNoteCollaborativeData";
import { type Canvas, FabricObject, Group, Shadow, Textbox } from "fabric";

export class FabricStickyNote extends CollaborativeEntity<StickyNoteCollaborativeData> {
  private readonly textbox: Textbox;
  private readonly card: FabricObject;
  private readonly group: Group;
  private readonly canvas: Canvas;

  constructor(data: StickyNoteCollaborativeData, canvas: Canvas) {
    super(data);

    this.canvas = canvas;

    const size = 150;
    const textPadding = 20;

    this.card = new FabricObject({
      backgroundColor: data.color,
      hasBorders: false,
      hasControls: false,
      height: size,
      width: size,
    });
    this.textbox = new Textbox(data.text, {
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
    this.group = new Group([this.card, this.textbox], {
      hasBorders: false,
      hasControls: false,
      left: data.position.x,
      selectable: true,
      shadow: new Shadow({
        blur: 10,
        color: "rgba(0, 0, 0, 0.2)",
        offsetX: 2,
        offsetY: 2,
      }),
      subTargetCheck: true,
      top: data.position.y,
    });

    this.textbox.on("changed", this.handleTextChange.bind(this));
    this.group.on("mousedblclick", this.handleMouseDoubleClick.bind(this));
    this.group.on("moving", this.handleMoving.bind(this));

    this.canvas.add(this.group);
  }

  onUpdate(data: Partial<StickyNoteCollaborativeData>) {
    if (data.color !== undefined) {
      this.card.set("backgroundColor", data.color);
    }

    if (data.text !== undefined) {
      this.textbox.set("text", data.text);
    }

    if (data.position !== undefined) {
      this.group.set({
        left: data.position.x,
        top: data.position.y,
      });
    }
  }

  private handleMouseDoubleClick() {
    this.canvas.setActiveObject(this.textbox);
    this.textbox.enterEditing();
    this.textbox.selectAll();
  }

  private handleMoving() {
    this.data.position = {
      x: this.group.left,
      y: this.group.top,
    };

    // TODO Propagate the change to other collaborators
  }

  private handleTextChange() {
    this.textbox.setRelativeY(0);
    this.data.text = this.textbox.text;

    // TODO Propagate the change to other collaborators
  }
}
