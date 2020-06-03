import { HID } from "node-hid";
import Color from "./Color";
import { Logger, LoggerFactory } from "./Logger";

const log: Logger = LoggerFactory.getLogger("blynclight:device");

class Blynclight {
  public static readonly vid: number = 0x0e53;
  public static readonly pid: number = 0x2516;

  private device: HID;

  constructor(vid: number, pid: number) {
    this.device = new HID(vid, pid);
  }

  set(color: Color) {
    this.device.write([
      0x00,
      color.red(), // red
      color.green(), // blue
      color.blue(), // green
      0x00, // blink
      0x00,
      0x00,
      0x00,
      0xff,
    ]);
  }

  on(): void {
    this.set(new Color(255, 255, 255));
  }

  off(): void {
    this.set(new Color(0, 0, 0));
  }
}

export default Blynclight;
