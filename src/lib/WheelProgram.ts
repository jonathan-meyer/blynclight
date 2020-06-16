import Blynclight from "./Blynclight";
import ColorWheel from "./ColorWheel";
import { LoggerFactory } from "./Logger";
import Program from "./Program";

const logger = LoggerFactory.getLogger("blynclight:wheel-program");

class WheelProgram extends Program {
  wheel: ColorWheel = new ColorWheel();

  constructor(light: Blynclight) {
    super("wheel");

    logger.debug(light.getColor());
  }
}

export default WheelProgram;
