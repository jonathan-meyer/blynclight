import { LoggerFactory } from "./lib/Logger";
import { app, light, startWheel } from "./server";

const port = process.env.PORT || 3000;
const log = LoggerFactory.getLogger("blynclight:main");

light.on();

app.listen(port, () => {
  log.info("Listeing to port: %d", port);
});

startWheel();
