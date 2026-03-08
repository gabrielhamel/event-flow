import { CollaborativeEntity } from "@repo/core/collaborative/CollaborativeEntity";
import { generateId, type Id } from "@repo/core/Id";
import type { StickyNote } from "@repo/core/whiteboard/objects/StickyNote";
import { type Canvas, FabricObject, Group, Shadow, Textbox } from "fabric";

export class FabricStickyNote extends CollaborativeEntity<StickyNote> {
  private readonly textbox: Textbox;
  private readonly card: FabricObject;
  private readonly group: Group;
  private readonly canvas: Canvas;

  constructor(props: {
    id?: Id;
    canvas: Canvas;
    data: StickyNote;
    onUpdate: (id: Id, data: StickyNote) => void;
    onDelete: (id: Id) => void;
  }) {
    super({
      data: props.data,
      id: props.id ?? generateId("sticky-note"),
      onDelete: props.onDelete,
      onUpdate: props.onUpdate,
    });

    const size = 150;
    const textPadding = 20;

    this.canvas = props.canvas;

    this.card = new FabricObject({
      backgroundColor: props.data.color,
      hasBorders: false,
      hasControls: false,
      height: size,
      width: size,
    });
    this.textbox = new Textbox(props.data.text, {
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
      borderColor: "#0096FF",
      borderScaleFactor: 3,
      hasBorders: true,
      hasControls: false,
      left: props.data.x,
      selectable: true,
      shadow: new Shadow({
        blur: 10,
        color: "rgba(0, 0, 0, 0.2)",
        offsetX: 2,
        offsetY: 2,
      }),
      subTargetCheck: true,
      top: props.data.y,
    });

    this.textbox.on("changed", this.handleTextChange.bind(this));
    this.group.on("mousedblclick", this.handleMouseDoubleClick.bind(this));
    this.group.on("moving", this.handleMoving.bind(this));

    this.canvas.add(this.group);
  }

  updateFromCollaborativeData(data: StickyNote) {
    this.card.set("backgroundColor", data.color);
    this.textbox.set("text", data.text);
    this.group.set({
      left: data.x,
      top: data.y,
    });
    this.group.setCoords();

    if (this.canvas.getActiveObject() === this.group) {
      this.canvas.discardActiveObject();
    }

    this.canvas.requestRenderAll();
  }

  dispose() {
    this.canvas.remove(this.group);

    this.group.dispose();
    this.textbox.dispose();
    this.card.dispose();
  }

  private handleMouseDoubleClick() {
    this.canvas.setActiveObject(this.textbox);

    this.textbox.enterEditing();
    this.textbox.selectAll();
  }

  private handleMoving() {
    this.data.x = this.group.left;
    this.data.y = this.group.top;

    this.propagateUpdate();
  }

  private handleTextChange() {
    this.textbox.setRelativeY(0);
    this.data.text = this.textbox.text;

    this.propagateUpdate();
  }
}
