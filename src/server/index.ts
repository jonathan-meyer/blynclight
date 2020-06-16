import bodyParser from "body-parser";
import errorHandler from "errorhandler";
import express from "express";
import morgan from "morgan";
import Blynclight from "../lib/Blynclight";
import { LoggerFactory } from "../lib/Logger";
import ProgramList from "../lib/ProgramList";
import WheelProgram from "../lib/WheelProgram";
import lightRouter from "./light";
import programRouter from "./program";

const log = LoggerFactory.getLogger("blynclight:server");
const app = express();

const light = new Blynclight(Blynclight.vid, Blynclight.pid);
const programs = new ProgramList();

programs.addLight(light);
programs.addProgram(new WheelProgram(light));

app.use(morgan("common"));
app.use(bodyParser.json());
app.use(errorHandler());

app.use("/light", lightRouter(light));
app.use("/program", programRouter(programs));

app.get("/*", (req, res) => {
  res.status(404).json({ 404: "Not Found" });
});

export { app, light, programs };
