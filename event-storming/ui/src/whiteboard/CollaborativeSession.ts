import { HocuspocusProvider } from "@hocuspocus/provider";
import { Doc } from "yjs";

export class CollaborativeSession {
  private readonly provider: HocuspocusProvider;

  constructor() {
    const sharedDocument = new Doc();

    this.provider = new HocuspocusProvider({
      url: "ws://localhost:6123",
      name: "example-document",
      document: sharedDocument,
      onAwarenessChange(data) {
        console.log("awareness change", data.states);
      },
    });

    this.provider.setAwarenessField("user", {
      color: [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)],
    });

    document.addEventListener("mousemove", (event) => {
      this.provider.setAwarenessField("mouse", {
        x: event.clientX,
        y: event.clientY,
      });
    });
  }

  destroy() {
    this.provider.destroy();
  }
}
