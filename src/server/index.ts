import express = require("express");
import morgan = require("morgan");

const app = express();

app.use(morgan("common"));

app.get("/", (req, res) => {
  res.json("hello world");
});

export default app;
