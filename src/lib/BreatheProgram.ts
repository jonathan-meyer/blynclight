import Color from 'color';
import { Blynclight } from './Blynclight';
import { LoggerFactory } from './Logger';
import Program from './Program';
import { isEmpty } from 'lodash';

const logger = LoggerFactory.getLogger('blynclight:usa-program');

class BreatheProgram extends Program {
  public static ID: string = 'breathe';

  private light: Blynclight;

  private colors: Color[] = [];

  private mix: number = 0;

  constructor(light: Blynclight) {
    super(BreatheProgram.ID);

    logger.debug('[CTOR]');

    this.light = light;
  }

  run(): void {
    if (isEmpty(this.colors)) {
      this.colors = [
        Color('black'),
        Color(this.options?.color ?? 'white'),
        Color(this.options?.color ?? 'white'),
      ];
    }

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
    this.colors = [];
    this.mix = 0;
  }
}

export default BreatheProgram;
