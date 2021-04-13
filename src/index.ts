import UsaProgram from "./lib/UsaProgram";
import WheelProgram from "./lib/WheelProgram";
import { Blynclight, BlynclightFactory } from "./lib/Blynclight";
import { LoggerFactory } from "./lib/Logger";
import ProgramManager from "./lib/ProgramManager";
import server from "./server";

const port = process.env.PORT || 3000;
const logger = LoggerFactory.getLogger("blynclight:main");
const programs: ProgramManager = new ProgramManager();

BlynclightFactory.getLight(Blynclight.VID, Blynclight.PID)
  .then((light) => {
    programs.add(new WheelProgram(light));
    programs.add(new UsaProgram(light));

    programs.start("usa");

    process.on("SIGINT", function () {
      logger.debug("[stopping all programs]");
      programs.stopAll();
      light.off();
      process.exit();
    });

    server(light, programs).listen(port, () => {
      logger.info("Listeing to port: %d", port);
    });
  })
  .catch((err) => {
    console.error(err);
  });
