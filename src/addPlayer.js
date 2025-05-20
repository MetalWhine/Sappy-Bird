import { Sprite } from "pixi.js";
import { Howl } from "howler";
import { gameOver, gameStart, resetGame } from "./addPipes";
import { startBackground, stopBackground } from "./addBackground";
import { resetScore } from "./addScoreText";

// #####################################################################
//                          Control Panel
const playerScale = 0.5; // Size of player
const terminalVelocity = 20; // Determines terminal velocity (max fall speed)
const gravity = 0.5; // Determines the acceleration caused by gravity
const flapStrength = 10; // Determines upwards burst speed when flapping
const maxFlapStrength = 20; // Determines maximum speed when going up
const lookUpAngle = 30; // Determines how much the bird looks up when flapping
const lookDownAngle = 60; // Determines how much the bird looks down when not flapping
const lookDownSpeed = 0.9; // Speed of looking down
// #####################################################################

let player; // Reference variable

// Boolean checks
let isDead = false;
let hasTouchedGround = false;
let isGameOngoing = false;

let delta; // Keeps track of DeltaTime

let jumpSFX; // Sound effects
let dieSFX;
let hurtSFX;

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

// Initialize function
export function addPlayer(app) {
  player = Sprite.from("player");
  player.anchor.set(0.5);
  player.x = app.screen.width / 2;
  resetplayer(app);
  player.scale = playerScale;
  app.stage.addChild(player);

  // Sound effects loading
  jumpSFX = new Howl({ src: ["assets/Jump.mp3"] });
  dieSFX = new Howl({ src: ["assets/Game Over.mp3"] });
  hurtSFX = new Howl({ src: ["assets/Hurt.mp3"] });
}

// Game loop function
export function updatePlayer(app, time) {
  delta = time.deltaTime;

  // Allow players to fall before restarting game when dying
  if (!hasTouchedGround) {
    applyGravity(); // Applies gravity constantly
    detectGround(app); // Checks if the bird's anchor touches the screen border
    player.y += player.currentSpeed * delta; // Move player vertically based on current speed
  }

  // If game has not started, auto-flap
  if (!isGameOngoing && !isDead) {
    if (player.y > app.screen.height * 0.7) {
      flap();
    }
  }
}

// Input handler
export function HandleInput(app) {
  if (!isDead) {
    if (!isGameOngoing) {
      isGameOngoing = true;
      gameStart(app);
      console.log("Game Started");
    }
    flap();
  }
  if (isDead && hasTouchedGround) {
    console.log("Game Resetted");
    resetplayer(app);
    resetScore();
    resetGame(app);
  }
}

function flap() {
  if (player.currentSpeed > 0) {
    player.currentSpeed = 0;
  }
  player.currentSpeed -= flapStrength;
  player.currentSpeed = Math.max(player.currentSpeed, -maxFlapStrength);
  player.angle = -lookUpAngle;
  jumpSFX.play();
  console.log("Sucessful Flap");
}

export function detectPipeCollision(pipe1, pipe2) {
  if (!isDead) {
    if (rectsIntersect(player, pipe1) || rectsIntersect(player, pipe2)) {
      playerDies();
      hurtSFX.play();
    }
  }
}

function rectsIntersect(object1, object2) {
  const bounds1 = object1.getBounds();
  const bounds2 = object2.getBounds();

  return (
    bounds1.x + bounds1.width > bounds2.x &&
    bounds1.x < bounds2.x + bounds2.width &&
    bounds1.y + bounds1.height > bounds2.y &&
    bounds1.y < bounds2.y + bounds2.height
  );
}

function detectGround(app) {
  if (player.y >= app.screen.height) {
    player.y = app.screen.height;
    if (!isDead) {
      playerDies();
    }
    hasTouchedGround = true;
    dieSFX.play();
  }
}

function playerDies() {
  isDead = true;
  isGameOngoing = false;
  stopBackground();
  gameOver();
}

function applyGravity() {
  player.currentSpeed += gravity;
  player.angle += lookDownSpeed;
  player.angle = clamp(player.angle, -lookUpAngle, lookDownAngle);
  player.currentSpeed = Math.min(terminalVelocity, player.currentSpeed);
}

function resetplayer(app) {
  player.y = app.screen.height / 2;
  player.currentSpeed = 0;
  isDead = false;
  hasTouchedGround = false;
  startBackground();
}
