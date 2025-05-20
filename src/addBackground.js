import { TilingSprite, Texture } from "pixi.js";

// #####################################################################
//                          Control Panel
const backgroundScrollSpeed = 0.2;
// #####################################################################

let background; // reference variable

// Boolean checks
let isGameOngoing = true;

export function addBackground(app) {
  const texture = Texture.from("background");
  background = new TilingSprite({
    texture,
    width: app.screen.width * 2,
    height: app.screen.height,
  });
  background.tileScale.set(app.screen.height / 360);
  app.stage.addChild(background);
}

export function animateBackground(app, time) {
  const delta = time.deltaTime;
  if (isGameOngoing) {
    background.x -= backgroundScrollSpeed * delta;
  }
}

export function stopBackground() {
  isGameOngoing = false;
}

export function startBackground() {
  isGameOngoing = true;
}
