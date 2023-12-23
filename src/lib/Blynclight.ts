import Color from "color";
import { HID } from "node-hid";
import { LoggerFactory } from "./Logger";

const logger = LoggerFactory.getLogger("blynclight:device");

export class Blynclight {
  public static readonly VID: number = 0x0e53;
  public static readonly PID: number = 0x2516;

  private color: Color = Color();
  private device: HID;

  constructor(vid: number, pid: number) {
    this.device = new HID(vid, pid);
  }

  setColor(color: Color): void {
    this.color = color;
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

  getColor(): Color {
    return this.color;
  }

  on(): void {
    logger.debug("[on]");
    this.setColor(Color("white"));
  }

  off(): void {
    logger.debug("[off]");
    this.setColor(Color("black"));
  }

  toJSON() {
    return {
      power: "on",
      color: this.color.hex(),
      colorName: this.color.keyword(),
    };
  }
}

export class BlynclightFactory {
  private static lights: { [index: string]: Blynclight } = {};

  static async getLight(vid: number, pid: number): Promise<Blynclight> {
    const id = `${vid}:${pid}`;
    let timeout = 1000;
    let restartCount = 0;

    while (!this.lights[id]) {
      try {
        this.lights[id] = new Blynclight(vid, pid);
      } catch (err:any) {
        logger.error(err.message);
        await new Promise((resolve) =>
          setTimeout(resolve, timeout * (restartCount / 10))
        );
        restartCount++;
      }
    }

    return this.lights[id];
  }
}
