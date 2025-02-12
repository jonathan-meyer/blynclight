import Color from 'color';
import { HID } from 'node-hid';
import { LoggerFactory } from './Logger';

const logger = LoggerFactory.getLogger('blynclight:device');

const SLOW = 0b001000;
const MED = 0b010000;
const FAST = 0b100000;
const OFF = 0b001;
const DIM = 0b010;
const FLASH = 0b100;

type FlashType = 'fast' | 'med' | 'slow';

export class Blynclight {
  public static readonly VID: number = 0x0e53;
  public static readonly PID: number = 0x2516;

  private color: Color = Color();
  private device: HID;

  constructor(vid: number, pid: number) {
    this.device = new HID(vid, pid);
  }

  // https://github.com/JnyJny/busylight/blob/master/docs/devices/embrava.md

  write(color: Color, flash?: FlashType, dim?: boolean) {
    let modeBits = 0x00;

    switch (flash) {
      case 'fast':
        modeBits |= FAST | FLASH;
        break;
      case 'slow':
        modeBits |= SLOW | FLASH;
        break;
      case 'med':
        modeBits |= MED | FLASH;
        break;
    }

    this.device.write([
      0x00,
      color.rgb().red(), // red
      color.rgb().blue(), // blue
      color.rgb().green(), // green
      modeBits,
      0x00, // music
      0x00, // music
      0x22,
      0xff,
    ]);

    return color;
  }

  setColor(color: Color, flash?: FlashType, dim?: boolean): void {
    this.color = this.write(color, flash, dim);
  }

  getColor(): Color {
    return this.color;
  }

  on(): void {
    logger.debug('[on]');
    this.setColor(Color('white'));
  }

  off(): void {
    logger.debug('[off]');
    this.setColor(Color('black'));
  }

  toJSON() {
    return {
      power: 'on',
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
      } catch (err: any) {
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
