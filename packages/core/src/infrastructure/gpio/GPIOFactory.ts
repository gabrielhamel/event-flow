import { GPIOOutput } from "@repo/core/infrastructure/gpio/GPIOOutput";
import { GPIORegister } from "@repo/core/infrastructure/gpio/GPIORegister";

export class GPIOFactory {
  private readonly gpioRegister = new GPIORegister();

  create(pin: number) {
    const gpio = GPIOOutput.create(pin);
    this.gpioRegister.register(gpio);

    return gpio;
  }
}
