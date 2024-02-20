import express from "express";
import { spawn } from "child_process";

const app = express();
const port = 7272;

const canvasTimes = [];
const ffmpegTimes = [];

app.get("/canvas", async (_, res) => {
  const start = performance.now();

  const child = spawn("node", ["./src/canvas_child.js"]);

  child.once("close", () => {
    canvasTimes.push(performance.now() - start);
    res.status(204).send();
  });
});

app.get("/ffmpeg", async (_, res) => {
  const start = performance.now();

  const child = spawn("ffmpeg", [
    "-loglevel",
    "error",
    "-hide_banner",
    "-i",
    "./src/assets/hayoung.png",
    "-i",
    "./src/assets/hyunjin.png",
    "-i",
    "./src/assets/yena.png",
    "-filter_complex",
    "[0][1][2]hstack=inputs=3",
    "-f",
    "image2",
    "-codec",
    "png",
    "pipe:1",
  ]);

  child.once("close", () => {
    ffmpegTimes.push(performance.now() - start);
    res.status(204).send();
  });
});

app.listen(port, () => {
  console.log("Listening");
});

process.on("SIGINT", () => {
  console.log(
    `Average Canvas generation time: ${
      canvasTimes.reduce((a, b) => a + b, 0) / canvasTimes.length
    } (median ${canvasTimes[Math.ceil(canvasTimes.length / 2)]})`
  );
  console.log(
    `Average FFmpeg generation time: ${
      ffmpegTimes.reduce((a, b) => a + b, 0) / ffmpegTimes.length
    } (median ${ffmpegTimes[Math.ceil(ffmpegTimes.length / 2)]})`
  );

  process.exit(2);
});
