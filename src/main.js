/*
To do:
1. Make character
1.1. Make character fall [DONE]
1.2. Make character jump (with mouseclick) [DONE]
2. Make pipes
2.1. Make pipes appear [DONE]
2.2. Make pipes move from right to left (simulate movement) [DONE]
2.3. Make pipes appear continuously and despawn on the left (randomly move pipes up and down, but in a certain allowed range) [DONE]
2.4. Make pipes randomly placed with consistent spacing
2.5. Make pipes be able to collide with player and kill them [DONE]
3. Game polish
3.1. Make it so that player dies and is able to restart the level by pressing mouseclick
3.2. Make a simple score system
3.3. Game UI & Graphics
3.4. Add SFX
3.5. REFACTOR
4. IF POSSIBLE
4.1. Leaderboard system
4.2. Title screen with the bird constantly flapping at a determined height
4.3. Animation of the bird going up and down
4.4. Scrolling background
*/

import { Application, Assets } from "pixi.js";
import { HandleInput, addPlayer, updatePlayer } from "./addPlayer";
import { addPipes, updatePipes } from "./addPipes";

// Create a new PixiJS application
const app = new Application();

// Asynchronous IIFE (Main in Unity)
(async () => {
  // Initilization functions, uses await to fulfill promises
  await setup();
  await preload();

  // Initializing player
  addPlayer(app);
  addPipes(app);

  // Adding inputs to the window itself
  window.addEventListener("click", function () {
    HandleInput();
  });

  // Update function
  app.ticker.add((time) => {
    updatePlayer(app, time);
    updatePipes(app, time);
  });
})();

// Initializes and adds the gameworld
async function setup() {
  await app.init({ resizeTo: window });
  app.canvas.style.position = "absolute";
  document.body.appendChild(app.canvas);
}

// Preloads sprites to be used later
async function preload() {
  const assets = [
    { alias: "player", src: "assets/Sappy Bird.png" },
    { alias: "pipe", src: "assets/Pipe.png" },
  ];
  await Assets.load(assets);
}
