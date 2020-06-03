import Blynclight from "./lib/Blynclight";
import Color from "./lib/Color";
import { Logger, LoggerFactory } from "./lib/Logger";
import app from "./server";

const port = process.env.PORT || 3000;
const log: Logger = LoggerFactory.getLogger("blynclight:main");
const light = new Blynclight(Blynclight.vid, Blynclight.pid);

const wheel = (WheelPos: number): Color => {
  WheelPos = 255 - WheelPos;

  if (WheelPos < 85) {
    return new Color(255 - WheelPos * 3, 0, WheelPos * 3);
  }

  if (WheelPos < 170) {
    WheelPos -= 85;
    return new Color(0, WheelPos * 3, 255 - WheelPos * 3);
  }

  WheelPos -= 170;
  return new Color(WheelPos * 3, 255 - WheelPos * 3, 0);
};

let pos = 0;

log.debug("[turn on]");
light.on();

log.debug("[sarting color wheel]");
const t = setInterval(() => {
  light.set(wheel(pos++));
  if (pos > 255) pos = 0;
}, 25);

process.on("SIGINT", function () {
  clearInterval(t);

  log.debug("[turn off]");
  light.off();

  process.exit(0);
});

app.listen(port, () => {
  log.info("Listeing to port: %d", port);
});
