import { CollaborativeEntity } from "@repo/core/collaborative/CollaborativeEntity";
import type { StickyNoteCollaborativeData } from "@repo/core/StickyNoteCollaborativeData";
import { type Canvas, FabricObject, Group, Shadow, Textbox } from "fabric";

export class FabricStickyNote extends CollaborativeEntity<StickyNoteCollaborativeData> {
  private readonly textbox: Textbox;
  private readonly card: FabricObject;
  private readonly group: Group;

  constructor(props: {
    id?: string;
    data: StickyNoteCollaborativeData;
    onUpdate: (id: string, data: StickyNoteCollaborativeData) => void;
  }) {
    super({ data: props.data, id: props.id ?? crypto.randomUUID(), onUpdate: props.onUpdate });

    const size = 150;
    const textPadding = 20;

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
      hasBorders: false,
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
  }

  attachToCanvas(canvas: Canvas) {
    canvas.add(this.group);
  }

  updateFromCollaborativeData(data: StickyNoteCollaborativeData) {
    this.card.set("backgroundColor", data.color);
    this.textbox.set("text", data.text);
    this.group.set({
      left: data.x,
      top: data.y,
    });
    this.group.canvas?.requestRenderAll();
  }

  private handleMouseDoubleClick() {
    this.textbox.canvas?.setActiveObject(this.textbox);
    this.textbox.enterEditing();
    this.textbox.selectAll();
  }

  private handleMoving() {
    this.data.x = this.group.left;
    this.data.y = this.group.top;

    this.propagateCollaborativeUpdate();
  }

  private handleTextChange() {
    this.textbox.setRelativeY(0);
    this.data.text = this.textbox.text;

    this.propagateCollaborativeUpdate();
  }
}
