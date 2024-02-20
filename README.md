# canvas-ffmpeg-bench

This repository serves as a benchmark for the same basic operation in both [`node-canvas`](https://github.com/Automattic/node-canvas) and [FFmpeg](https://ffmpeg.org/). You will need to install FFmpeg to run these benchmarks.

### Installation

Install [pnpm](https://pnpm.io/), then run `pnpm install` and `pnpm start`.

### Load testing

It is recommended to load test the endpoints with [Siege](https://github.com/JoeDog/siege) and test with the following commands. Siege will show the response time stats after the siege is complete.

`siege 'http://localhost:7272/canvas' -v -r 5 -c<# concurrency> -b -d1`

`siege 'http://localhost:7272/ffmpeg' -v -r 5 -c<# concurrency> -b -d1`
