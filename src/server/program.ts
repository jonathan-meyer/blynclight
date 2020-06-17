import express, { Router } from "express";
import { LoggerFactory } from "../lib/Logger";
import ProgramManager from "../lib/ProgramManager";

const logger = LoggerFactory.getLogger("blynclight:program:router");

export default (programs: ProgramManager): Router =>
  express
    .Router()

    .get("/", (req, res) => {
      res.json(programs);
    })

    .post("/", (req, res) => {
      const { start, stop, stopAll } = req.body;

      logger.debug({ start, stop });

      if (start) {
        programs.start(start);
      }

      if (stop) {
        programs.stop(stop);
      }

      if (stopAll === "true") {
        programs.stopAll();
      }

      res.json(programs);
    })

    .get("*", (req, res) => {
      res.status(404).json({ 404: "Not Found" });
    });
