import { type Canvas, FabricObject, Group, Shadow, Textbox } from "fabric";

export class StickyNote {
  private readonly textbox: Textbox;
  private readonly card: FabricObject;
  private readonly group: Group;

  constructor(color: string) {
    const size = 150;

    this.card = new FabricObject({
      width: size,
      height: size,
      backgroundColor: color,
      hasControls: false,
      hasBorders: false,
    });

    const textPadding = 20;
    this.textbox = new Textbox("", {
      fontSize: 18,
      hasControls: false,
      hasBorders: false,
      fontFamily: "Roboto",
      width: size - textPadding,
      height: size - textPadding,
      textAlign: "center",
      splitByGrapheme: true,
      fill: "#333333",
    });

    this.textbox.on("changed", () => {
      this.textbox.setRelativeY(0);
    });

    this.group = new Group([this.card, this.textbox], {
      hasControls: false,
      hasBorders: false,
      selectable: true,
      subTargetCheck: true,
      shadow: new Shadow({
        color: "rgba(0, 0, 0, 0.2)",
        blur: 10,
        offsetX: 2,
        offsetY: 2,
      }),
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
