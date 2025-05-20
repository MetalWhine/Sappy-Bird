import { Container, Sprite } from "pixi.js";
import { detectCollisions } from "./addPlayer";

let Pipes;
let topPipe;
let bottomPipe;

const pipeScale = 0.7;
const pipeGap = 300; // The vertical gap in between the pipes for the player to fly through
const screenMargin = 0;
const pipeMoveSpeed = 5;
const pipeVariation = 200; // Variation of heights between 2 different pipe sections
const allowedPipeRange = 200; // Range where pipes are allowed

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

export function addPipes(app) {
  // Use existing Pipes reference
  Pipes = new Container();

  topPipe = Sprite.from("pipe");
  topPipe.anchor.set(0.5);
  topPipe.angle = 180;
  Pipes.addChild(topPipe);
  topPipe.y = -topPipe.height / 2;
  topPipe.y -= pipeGap / 2;

  bottomPipe = Sprite.from("pipe");
  bottomPipe.anchor.set(0.5);
  Pipes.addChild(bottomPipe);
  bottomPipe.y = bottomPipe.height / 2;
  bottomPipe.y += pipeGap / 2;

  Pipes.x = app.screen.width + screenMargin;
  Pipes.y = app.screen.height / 2;
  randomizePipeLocation(app);

  Pipes.scale = pipeScale;

  app.stage.addChild(Pipes);
}

export function updatePipes(app, time) {
  const delta = time.deltaTime;
  movePipes(delta);
  detectPipesReachingLeft(app);

  if (app.screen.width / 2 + 200 < Pipes.x < app.screen.width / 2 - 200) {
    detectCollisions(topPipe, bottomPipe);
  }
}

function movePipes(delta) {
  Pipes.x -= pipeMoveSpeed * delta;
}

function randomizePipeLocation(app) {
  Pipes.y += getRandomInt(-pipeVariation, pipeVariation);
  Pipes.y = clamp(
    Pipes.y,
    allowedPipeRange,
    app.screen.height - allowedPipeRange
  );
}

function resetPipes(app) {
  Pipes.x = app.screen.width + screenMargin;
  randomizePipeLocation(app);
}

function detectPipesReachingLeft(app) {
  if (Pipes.x <= -screenMargin) {
    resetPipes(app);
  }
}
