import { createCanvas, loadImage } from "canvas";
import { writeFile } from "fs";
const canvas = createCanvas(1155, 550);
const ctx = canvas.getContext("2d");

const card1 = await loadImage("src/assets/hayoung.png");
const card2 = await loadImage("src/assets/hyunjin.png");
const card3 = await loadImage("src/assets/yena.png");

ctx.drawImage(card1, 385 * 0, 0, 770 / 2, 1100 / 2);
ctx.drawImage(card2, 385 * 1, 0, 770 / 2, 1100 / 2);
ctx.drawImage(card3, 385 * 2, 0, 770 / 2, 1100 / 2);

const buffer = canvas.toBuffer();
console.log("Done");
writeFile("output.png", buffer, () => {});
