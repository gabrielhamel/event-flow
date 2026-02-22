import type { BinaryOutput } from "@repo/core/domain/repository/BinaryOutput";
import { Gpio } from "onoff";

export class GPIOOutput implements BinaryOutput {
  private readonly gpio: Gpio;

  private constructor(gpio: Gpio) {
    this.gpio = gpio;
  }

  static create(pin: number) {
    const raw = new Gpio(pin, "out");

    return new GPIOOutput(raw);
  }

  destroy() {
    this.gpio.unexport();
  }

  async write(value: 0 | 1) {
    return this.gpio.write(value);
  }
}
