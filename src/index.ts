import { LoggerFactory } from "./lib/Logger";
import { app, light, programs } from "./server";

const port = process.env.PORT || 3000;
const logger = LoggerFactory.getLogger("blynclight:main");

light.on();
programs.start("wheel");

process.on("SIGINT", function () {
  logger.debug("[stopping all programs]");
  programs.stopAll();
});

app.listen(port, () => {
  logger.info("Listeing to port: %d", port);
});
