import { Container, Sprite } from "pixi.js";
import { detectPipeCollision } from "./addPlayer";
import { addScore } from "./addScoreText";

let pipes;
let topPipe;
let bottomPipe;

const pipeScale = 0.7;
const pipeGap = 300; // The vertical gap in between the pipes for the player to fly through
const pipeMoveSpeed = 5;
const pipeVariation = 200; // Variation of heights between 2 different pipe sections
const allowedPipeRange = 200; // Range where pipes are allowed

let screenMargin;

let hasScored = false;

let gameOngoing = false;

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

export function addPipes(app) {
  // Use existing pipes reference
  pipes = new Container();

  topPipe = Sprite.from("pipe");
  topPipe.anchor.set(0.5);
  topPipe.angle = 180;
  pipes.addChild(topPipe);
  topPipe.y = -topPipe.height / 2;
  topPipe.y -= pipeGap / 2;

  bottomPipe = Sprite.from("pipe");
  bottomPipe.anchor.set(0.5);
  pipes.addChild(bottomPipe);
  bottomPipe.y = bottomPipe.height / 2;
  bottomPipe.y += pipeGap / 2;

  screenMargin = pipes.width * 0.75;

  pipes.x = app.screen.width + screenMargin;
  pipes.y = app.screen.height / 2;
  randomizePipeLocation(app);

  pipes.scale = pipeScale;

  app.stage.addChild(pipes);
}

export function gameOver() {
  gameOngoing = false;
}

export function resetGame(app) {
  resetpipes(app);
}

export function gameStart() {
  gameOngoing = true;
}

export function updatePipes(app, time) {
  const delta = time.deltaTime;
  if (gameOngoing) {
    movepipes(delta);
    detectpipesReachingLeft(app);
    if (
      app.screen.width / 2 - 100 < pipes.x &&
      pipes.x < app.screen.width / 2 + 100
    ) {
      detectPipeCollision(topPipe, bottomPipe);
      if (
        app.screen.width / 2 - 10 < pipes.x &&
        pipes.x < app.screen.width / 2 + 10
      ) {
        if (!hasScored) {
          addScore();
          hasScored = true;
        }
      } else if (hasScored) {
        hasScored = false;
      }
    }
  }
}

function movepipes(delta) {
  pipes.x -= pipeMoveSpeed * delta;
}

function randomizePipeLocation(app) {
  pipes.y += getRandomInt(-pipeVariation, pipeVariation);
  pipes.y = clamp(
    pipes.y,
    allowedPipeRange,
    app.screen.height - allowedPipeRange
  );
}

function resetpipes(app) {
  pipes.x = app.screen.width + screenMargin;
  randomizePipeLocation(app);
}

function detectpipesReachingLeft(app) {
  if (pipes.x <= -screenMargin) {
    resetpipes(app);
  }
}
