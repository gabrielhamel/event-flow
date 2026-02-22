import type { GPIOOutput } from "@repo/core/infrastructure/gpio/GPIOOutput";

export class GPIORegister {
  private exportedGPIO: GPIOOutput[] = [];

  register(gpio: GPIOOutput) {
    this.exportedGPIO.push(gpio);
  }

  destroy() {
    for (const gpio of this.exportedGPIO) {
      gpio.destroy();
    }

    this.exportedGPIO = [];
  }
}
