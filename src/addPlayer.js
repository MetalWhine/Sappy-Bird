import { Sprite } from "pixi.js";

let Player;

const maxGravity = 20;
const gravityAcceleration = 0.2;
const flapStrength = 10;
const maxFlapStrength = 50;
const playerScale = 0.5;

let playerDied = false;
let playerTouchedGround = false;

export function addPlayer(app) {
  Player = Sprite.from("player");
  Player.anchor.set(0.5);
  Player.x = app.screen.width / 2;
  Player.y = app.screen.height / 2;
  Player.currentSpeed = 0;
  Player.scale = playerScale;
  app.stage.addChild(Player);
}

export function updatePlayer(app, time) {
  const delta = time.deltaTime;

  if (!playerTouchedGround) {
    applyGravity();
    detectGround(app);
    movePlayer(delta);
  }

  //   AUTO FLAP TEMPORARY CODE
  //   if (Player.y >= app.screen.height - 300) {
  //     flap();
  //   }
}

function movePlayer(delta) {
  Player.y += Player.currentSpeed * delta;
}

function applyGravity() {
  Player.currentSpeed += gravityAcceleration;
  Player.currentSpeed = Math.min(maxGravity, Player.currentSpeed);
}

export function detectCollisions(pipe1, pipe2) {
  if (!playerDied) {
    if (rectsIntersect(Player, pipe1) || rectsIntersect(Player, pipe2)) {
      playerDied = true;
      console.log("Player collided with pipes!");
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
  if (Player.y >= app.screen.height) {
    Player.y = app.screen.height;
    playerDied = true;
    playerTouchedGround = true;
  }
}

function flap() {
  if (Player.currentSpeed > 0) {
    Player.currentSpeed = 0;
  }
  Player.currentSpeed -= flapStrength;
  Player.currentSpeed = Math.max(Player.currentSpeed, -maxFlapStrength);
}

export function HandleInput() {
  if (!playerDied) {
    flap();
  }
}
