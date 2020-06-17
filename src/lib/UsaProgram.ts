import Color from "color";
import Blynclight from "./Blynclight";
import { LoggerFactory } from "./Logger";
import Program from "./Program";

const logger = LoggerFactory.getLogger("blynclight:usa-program");

class UsaProgram extends Program {
  private light: Blynclight;
  private color: Color = new Color("red");
  private value: number = 0;

  constructor(light: Blynclight) {
    super("usa");

    logger.debug("[CTOR]");

    this.light = light;
  }

  run(): void {
    if (this.value >= 0 && this.value < 85) {
      this.color = new Color("red");
    }

    if (this.value >= 85 && this.value < 170) {
      this.color = new Color("white");
    }

    if (this.value >= 170 && this.value < 255) {
      this.color = new Color("blue");
    }

    this.light.setColor(this.color);
    this.value = (this.value + 1) % 255;
  }
}

export default UsaProgram;
