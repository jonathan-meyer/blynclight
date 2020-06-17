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

  onStart(): void {
    logger.debug("[start]");
    this.light.on();
  }

  run(): void {
    this.light.setColor(this.wheel.next());
  }

  onStop(): void {
    logger.debug("[stop]");
    this.light.off();
  }
}

export default WheelProgram;
