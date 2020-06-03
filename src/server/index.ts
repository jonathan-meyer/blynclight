import Color from "color";
import express from "express";
import morgan from "morgan";
import Blynclight from "../lib/Blynclight";
import ColorWheel from "../lib/ColorWheel";
import { LoggerFactory } from "../lib/Logger";

const log = LoggerFactory.getLogger("blynclight:server");
const app = express();

const light = new Blynclight(Blynclight.vid, Blynclight.pid);
const wheel = new ColorWheel();

let t: NodeJS.Timeout;

const startWheel = (interval: number) => {
  t = setInterval(() => {
    light.setColor(wheel.next());
  }, interval);
};

const stopWheel = () => {
  if (t) clearInterval(t);
};

app.use(morgan("common"));

app.get("/", (req, res) => {
  res.json({
    color: light.getColor(),
  });
});

app.get("/on", (req, res) => {
  stopWheel();
  light.on();

  res.sendStatus(200);
});

app.get("/off", (req, res) => {
  stopWheel();
  light.off();

  res.sendStatus(200);
});

app.get("/rgb/:hex([0-9a-fA-F]{6})", (req, res) => {
  const { hex } = req.params;
  const color = Color.rgb(`#${hex}`);

  stopWheel();

  light.setColor(color);
  res.json({ hex, color });
});

app.get("/rgb/:r(\\d+)/:g(\\d+)/:b(\\d+)", (req, res) => {
  const { r, g, b } = req.params;
  const color = Color.rgb(Number(r), Number(g), Number(b));

  stopWheel();
  light.setColor(color);

  res.json({ rgb: [r, g, b], color });
});

app.get("/rgb*", (req, res) => {
  res.json({
    rgb: {
      uris: [
        "/rgb/{dec red value}/{dec green value}/{dec blue value}",
        "/rgb/{hex color value}",
      ],
    },
  });
});

app.get("/color/:name", (req, res) => {
  try {
    const { name } = req.params;
    const color = Color.rgb(name);

    stopWheel();
    light.setColor(color);

    res.json({ name, color });
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

app.get("/color*", (req, res) => {
  res.json({
    color: {
      uris: ["/color/{color name}"],
    },
  });
});

app.get("/wheel/stop", (req, res) => {
  stopWheel();

  res.sendStatus(200);
});

app.get("/wheel/:ms(\\d+)?", (req, res) => {
  const { ms } = req.params;
  const interval = Number(ms || 25);

  stopWheel();
  startWheel(interval);

  res.json({ interval });
});

app.get("*", (req, res) => {
  res.sendStatus(418);
});

process.on("SIGINT", function () {
  stopWheel();
  light.off();
});

export { app, light };
