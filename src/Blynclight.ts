import { HID } from "node-hid";
import Color from "./Color";

class Blynclight {
  public static readonly vid: number = 0x0e53;
  public static readonly pid: number = 0x2516;

  device: HID;

  constructor(vid: number, pid: number) {
    this.device = new HID(vid, pid);
  }

  set(color: Color) {
    this.device.write([
      0x00,
      color.red, // red
      color.green, // blue
      color.blue, // green
      0x00, // blink
      0x00,
      0x00,
      0x00,
      0xff,
    ]);
  }

  off() {
    this.set(new Color());
  }
}

export default Blynclight;
