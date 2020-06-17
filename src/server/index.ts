import bodyParser from "body-parser";
import errorHandler from "errorhandler";
import express from "express";
import morgan from "morgan";
import Blynclight from "../lib/Blynclight";
import ProgramManager from "../lib/ProgramManager";
import UsaProgram from "../lib/UsaProgram";
import WheelProgram from "../lib/WheelProgram";
import lightRouter from "./light";
import programRouter from "./program";

const app = express();

const light = new Blynclight(Blynclight.vid, Blynclight.pid);
const programs: ProgramManager = new ProgramManager();

app.use(morgan("common"));
app.use(bodyParser.json());
app.use(errorHandler());

programs.add(new WheelProgram(light));
programs.add(new UsaProgram(light));

app.use("/light", lightRouter(light));
app.use("/program", programRouter(programs));

app.get("*", (req, res) => {
  res.status(404).json({ routes: ["/light", "/program"] });
});

export { app, light, programs };
