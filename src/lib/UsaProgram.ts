import Color from 'color';
import { Blynclight } from './Blynclight';
import { LoggerFactory } from './Logger';
import Program from './Program';

const logger = LoggerFactory.getLogger('blynclight:usa-program');

class UsaProgram extends Program {
  public static ID: string = 'usa';

  private light: Blynclight;

  private colors: Color[] = [
    Color('red'),
    Color('red'),
    Color('white'),
    Color('white'),
    Color('blue'),
    Color('blue'),
  ];

  private mix: number = 0;

  constructor(light: Blynclight) {
    super(UsaProgram.ID);

    logger.debug('[CTOR]');

    this.light = light;
  }

  run(): void {
    this.light.setColor(this.colors[0].mix(this.colors[1], this.mix));
    this.mix = this.mix + 0.03;

    if (this.mix > 1) {
      // rotate the colors in the color array
      let c = this.colors.shift();
      if (c) this.colors.push(c);

      this.mix = 0;
    }
  }

  onStop(): void {
    logger.debug('[stop]');
    this.light.off();
  }
}

export default UsaProgram;
