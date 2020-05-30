import Blynclight from "./Blynclight";

const light = new Blynclight(Blynclight.vid, Blynclight.pid);

const wheel = (WheelPos: number) => {
  WheelPos = 255 - WheelPos;

  if (WheelPos < 85) {
    return { red: 255 - WheelPos * 3, green: 0, blue: WheelPos * 3 };
  }

  if (WheelPos < 170) {
    WheelPos -= 85;
    return { red: 0, green: WheelPos * 3, blue: 255 - WheelPos * 3 };
  }

  WheelPos -= 170;
  return { red: WheelPos * 3, green: 255 - WheelPos * 3, blue: 0 };
};

let pos = 0;

setInterval(() => {
  light.set(wheel(pos++));
  if (pos > 255) pos = 0;
}, 20);

process.on("SIGINT", function () {
  light.off();
  process.exit(0);
});
