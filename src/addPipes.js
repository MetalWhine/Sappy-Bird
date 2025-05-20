import { Container, Sprite } from "pixi.js";
import { detectPipeCollision } from "./addPlayer";
import { addScore } from "./addScoreText";

// #####################################################################
//                          Control Panel
const pipeScale = 0.7; // Size of pipes
const pipeGap = 300; // The vertical gap in between the pipes for the player to fly through
const pipeMoveSpeed = 5; // Speed of pipes travelling right to left
const pipeVariation = 200; // Variation allowed of heights between 2 different pipe sections
const allowedPipeRange = 200; // Range where pipes are allowed vertically in screen
// #####################################################################

// Reference Variables
let pipes;
let topPipe;
let bottomPipe;

// Boolean Checks
let hasScored = false;
let isGameOngoing = false;

let screenMargin; // For pipes to dissapear more seamlessly

// Custom functions
const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

export function addPipes(app) {
  pipes = new Container();

  // Initializing and positioning pipes
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

  // Set screen margin to hide pipe
  // Spawning & despawning
  screenMargin = pipes.width * 0.75;

  pipes.x = app.screen.width + screenMargin;
  pipes.y = app.screen.height / 2;
  randomizePipeHeight(app);

  // Resize pipes
  pipes.scale = pipeScale;

  app.stage.addChild(pipes);
}

export function stopPipes() {
  isGameOngoing = false;
}

export function startPipes() {
  isGameOngoing = true;
}

export function resetGame(app) {
  resetpipes(app);
}

export function updatePipes(app, time) {
  const delta = time.deltaTime;
  if (isGameOngoing) {
    pipes.x -= pipeMoveSpeed * delta;
    pipesReachedLeftHandler(app);
    // Check for collisions & scoring when close to the
    // Middle of the screen, disables before & after
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

// Randomize the vertical placement of the pipes
function randomizePipeHeight(app) {
  pipes.y += getRandomInt(-pipeVariation, pipeVariation);
  pipes.y = clamp(
    pipes.y,
    allowedPipeRange,
    app.screen.height - allowedPipeRange
  );
}

// Moves pipes to the right of the screen
function resetpipes(app) {
  pipes.x = app.screen.width + screenMargin;
  randomizePipeHeight(app);
}

// Detects & performs a reset when pipes reached
// left margin
function pipesReachedLeftHandler(app) {
  if (pipes.x <= -screenMargin) {
    resetpipes(app);
  }
}
