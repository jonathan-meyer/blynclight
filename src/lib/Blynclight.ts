import Color from "color";
import { HID } from "node-hid";
import { LoggerFactory } from "./Logger";

const log = LoggerFactory.getLogger("blynclight:device");

class Blynclight {
  public static readonly vid: number = 0x0e53;
  public static readonly pid: number = 0x2516;

  private device: HID;

  constructor(vid: number, pid: number) {
    this.device = new HID(vid, pid);
  }

  setColor(color: Color) {
    //log.debug(`[set: ${color}]`);
    this.device.write([
      0x00,
      color.rgb().red(), // red
      color.rgb().blue(), // green
      color.rgb().green(), // blue
      0x00, // blink
      0x00,
      0x00,
      0x00,
      0xff,
    ]);
  }

  getColor() {
    return Color("black");
  }

  on(): void {
    log.debug("[on]");
    this.setColor(Color("white"));
  }

  off(): void {
    log.debug("[off]");
    this.setColor(Color("black"));
  }
}

export default Blynclight;
