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
          if (color) {
            programs.stopAll();
            lightColor = color;
            lightMode = mode;
            light.setColor(lightColor, 'med');
          } else {
            res.status(400);
          }
          break;

        case 'pulse':
          break;

        case 'steady':
          if (color) {
            programs.stopAll();
            lightColor = color;
            lightMode = mode;
            light.setColor(lightColor);
          } else {
            res.status(400);
          }
          break;

        case 'off':
          lightMode = mode;
          programs.stopAll();
          light.off();
          break;

        default:
          res.status(400);
      }
    })

    .get('*', (req, res) => {
      res.status(404).json({ 404: 'Not Found' });
    });
};
