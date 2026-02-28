import { type Canvas, FabricObject, Group, Shadow, Textbox } from "fabric";

export class StickyNote {
  private readonly textbox: Textbox;
  private readonly card: FabricObject;
  private readonly group: Group;

  constructor(color: string) {
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
      selectable: true,
      shadow: new Shadow({
        blur: 10,
        color: "rgba(0, 0, 0, 0.2)",
        offsetX: 2,
        offsetY: 2,
      }),
      subTargetCheck: true,
    });

    this.group.on("mousedblclick", () => {
      this.textbox.canvas?.setActiveObject(this.textbox);
      this.textbox.enterEditing();
      this.textbox.selectAll();
    });
  }

  attach(canvas: Canvas) {
    const viewportCenter = canvas.getVpCenter();
    const left = viewportCenter.x;
    const top = viewportCenter.y;

    this.group.setX(left);
    this.group.setY(top);

    canvas.add(this.group);

    canvas.setActiveObject(this.textbox);
    this.textbox.enterEditing();
  }
}
