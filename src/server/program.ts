import express, { Router } from "express";
import { LoggerFactory } from "../lib/Logger";
import ProgramManager from "../lib/ProgramManager";

const logger = LoggerFactory.getLogger("blynclight:program:router");

const getStatus = (programs: ProgramManager) => {
  return {
    programs: programs.map((program) => program.toString()),
  };
};

export default (programs: ProgramManager): Router =>
  express
    .Router()

    .get("/", (req, res) => {
      res.json(getStatus(programs));
    })

    .post("/", (req, res) => {
      const { start, stop } = req.body;

      logger.debug({ start, stop });

      if (start) {
        programs.start(start);
      }

      if (stop) {
        programs.stop(stop);
      }

      res.json(getStatus(programs));
    })

    .get("/*", (req, res) => {
      res.status(404).json({ 404: "Not Found" });
    });
