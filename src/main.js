/***********************************************************************************
   
                                        To do:

1. Make character [DONE]
1.1. Make character fall [DONE]
1.2. Make character jump (with mouseclick) [DONE]
2. Make pipes [DONE]
2.1. Make pipes appear [DONE]
2.2. Make pipes move from right to left (simulate movement) [DONE]
2.3. Make pipes appear continuously and despawn on the left (randomly move pipes up and down, but in a certain allowed range) [DONE]
2.4. Make pipes randomly placed with consistent spacing [KIND OF DONE]
2.5. Make pipes be able to collide with player and kill them [DONE]
3. Game polish
3.1. Make it so that player dies and is able to restart the level by pressing mouseclick [DONE]
3.2. Make a simple score system [DONE]
3.3. Game UI & Graphics [DONE]
3.4. Add SFX [DONE]
3.5. REFACTOR [KIND OF DONE]
4. IF POSSIBLE
4.1. Leaderboard system [HIGHSCORE SYSTEM UTILIZED]
4.2. Title screen with the bird constantly flapping at a determined height [DONE]
4.3. Animation of the bird going up and down [DONE]
4.4. Scrolling background [DONE]
***********************************************************************************/

import { Application, Assets } from "pixi.js";
import { HandleInput, addPlayer, updatePlayer } from "./addPlayer";
import { addPipes, updatePipes } from "./addPipes";
import { addBackground, animateBackground } from "./addBackground";
import { addScoreText } from "./addScoreText";

// #####################################################################
//                          Control Panel
// set minimum & maximum FPS for better performance, set setMaxFPS = 0 for uncapped FPS
const setMaxFPS = 60;
const setMinFPS = 30;
// #####################################################################

// Create a new PixiJS application
const app = new Application();

// Asynchronous IIFE
(async () => {
  // Game initialization functions
  await setup();
  await preload();

  // !! PixiJS renders from back to front, so ensure that initializing code is sorted accordingly !!

  // Add game elements
  addBackground(app);
  addPipes(app);
  addPlayer(app);
  addScoreText(app);

  // Adding input to the entire window
  window.addEventListener("click", function () {
    HandleInput(app);
  });

  // Update function
  app.ticker.add((time) => {
    updatePlayer(app, time);
    updatePipes(app, time);
    animateBackground(app, time);
  });
})();

// Initializes the canvas
async function setup() {
  await app.init({ resizeTo: window });

  // Removing scroll bars that most web-browsers have
  app.canvas.style.position = "absolute";
  app.ticker.maxFPS = setMaxFPS;
  app.ticker.minFPS = setMinFPS;
  document.body.appendChild(app.canvas);
}

// Preloads sprites to be used later
async function preload() {
  const assets = [
    { alias: "player", src: "assets/Sappy Bird.png" },
    { alias: "pipe", src: "assets/Pipe.png" },
    { alias: "background", src: "assets/Background.png" },
  ];
  await Assets.load(assets);
}
