import Blynclight from "./Blynclight";
import ColorWheel from "./ColorWheel";
import { LoggerFactory } from "./Logger";
import Program from "./Program";

const logger = LoggerFactory.getLogger("blynclight:wheel-program");

class WheelProgram extends Program {
  readonly wheel: ColorWheel = new ColorWheel();
  private light: Blynclight;

  constructor(light: Blynclight) {
    super("wheel");

    logger.debug("[CTOR]");

    this.light = light;
  }

  run(): void {
    this.light.setColor(this.wheel.next());
  }
}

export default WheelProgram;
