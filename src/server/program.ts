import express, { Router } from "express";
import { LoggerFactory } from "../lib/Logger";
import ProgramList from "../lib/ProgramList";

const logger = LoggerFactory.getLogger("blynclight:program:router");

const getStatus = (programs: ProgramList) => {
  return {
    programs: programs.list(),
  };
};

export default (programs: ProgramList): Router =>
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
        programs.stop(start);
      }

      res.json(getStatus(programs));
    })

    .get("/*", (req, res) => {
      res.status(404).json({ 404: "Not Found" });
    });
