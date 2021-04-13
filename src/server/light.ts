import Color from "color";
import express, { Router } from "express";
import { Blynclight } from "../lib/Blynclight";
import { LoggerFactory } from "../lib/Logger";

const logger = LoggerFactory.getLogger("blynclight:light:router");

export default (light: Blynclight): Router =>
  express
    .Router()

    .get("/", (req, res) => {
      res.json(light);
    })

    .post("/", (req, res) => {
      const { power, color, rgb } = req.body;

      logger.debug({ power, color, rgb });

      if (/^on$/i.test(power)) {
        light.on();
      }

      if (/^off$/.test(power)) {
        light.off();
      }

      if (color) {
        light.setColor(Color(color));
      }

      if (rgb) {
        if (/[0-9a-fA-F]{6}/.test(rgb)) {
          light.setColor(Color.rgb(`#${rgb}`));
        }

        if (Array.isArray(rgb)) {
          const [r, g, b] = rgb;
          light.setColor(Color.rgb(r, g, b));
        }
      }

      res.json(light);
    })

    .get("*", (req, res) => {
      res.status(404).json({ 404: "Not Found" });
    });
