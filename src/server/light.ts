import Color from "color";
import express, { Router } from "express";
import Blynclight from "../lib/Blynclight";
import { LoggerFactory } from "../lib/Logger";

const logger = LoggerFactory.getLogger("blynclight:light:router");

let state = {
  color: Color(),
  program: null,
};

const updateLight = (light: Blynclight, newState: any) => {
  state = Object.assign(state, newState);

  if (state.color) {
    light.setColor(state.color);
  }

  if (state.program) {
  }
};

export default (light: Blynclight): Router =>
  express
    .Router()

    .get("/", (req, res) => {
      res.json(state);
    })

    .post("/", (req, res) => {
      const { color, rgb, program } = req.body;

      if (color) {
        updateLight(light, { color: Color(color) });
      }

      if (rgb) {
        if (/[0-9a-fA-F]{6}/.test(rgb)) {
          updateLight(light, { color: Color.rgb(`#${rgb}`) });
        }

        if (Array.isArray(rgb)) {
          const [r, g, b] = rgb;
          updateLight(light, { color: state.color = Color.rgb(r, g, b) });
        }
      }

      if (program) {
        const [cmd, ...args] = program.split(",");
        logger.debug({ cmd, args });
      }

      res.json(state);
    });
