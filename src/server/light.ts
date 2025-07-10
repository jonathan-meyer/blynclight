import Color from 'color';
import express, { Router } from 'express';
import { Blynclight } from '../lib/Blynclight';
import { LoggerFactory } from '../lib/Logger';
import ProgramManager from '../lib/ProgramManager';

const logger = LoggerFactory.getLogger('blynclight:light:router');
type Mode = 'steady' | 'blink' | 'pulse' | 'off' | 'program';

const getColor = (color: any, rgb: any): Color | undefined => {
  if (color) {
    return Color(color);
  } else if (rgb) {
    if (/[0-9a-fA-F]{6}/.test(rgb)) {
      return Color.rgb(`#${rgb}`);
    }

    if (Array.isArray(rgb)) {
      const [r, g, b] = rgb;
      return Color.rgb(r, g, b);
    }
  }
};

export default (light: Blynclight, programs: ProgramManager): Router => {
  let lightColor: Color = light.getColor();
  let lightMode: Mode = programs.isRunning() ? 'program' : 'off';

  return express
    .Router()

    .get('/', (req, res) => {
      res.json(light);
    })

    .post('/', (req, res) => {
      const { body } = req;

      const color = getColor(body.color, body.rgb);
      const mode: Mode = body.mode ?? 'steady';

      logger.debug({ mode, color });

      switch (mode) {
        case 'blink':
          programs.stopAll();
          lightColor = color ?? lightColor;
          lightMode = mode;
          light.setColor(lightColor, 'med');
          res.json(light);
          break;

        case 'pulse':
          programs.stopAll();
          lightColor = color ?? lightColor;
          lightMode = mode;
          light.setColor(lightColor, 'slow');
          res.json(light);
          break;

        case 'steady':
          programs.stopAll();
          lightColor = color ?? lightColor;
          lightMode = mode;
          light.setColor(lightColor);
          res.json(light);
          break;

        case 'off':
          lightMode = mode;
          programs.stopAll();
          light.off();
          res.json(light);
          break;

        default:
          res.status(400);
      }

      res.end();
    })

    .get('*', (req, res) => {
      res.status(404).json({ 404: 'Not Found' });
    });
};
