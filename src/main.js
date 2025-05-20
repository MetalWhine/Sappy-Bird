// To do:
// 1. Make character
// 1.1. Make character fall
// 1.2. Make character jump (with spacebar/mouseclick)
// 2. Make pipes
// 2.1. Make pipes appear
// 2.2. Make pipes move from right to left (simulate movement)
// 2.3. Make pipes appear continuously and despawn on the left
// 2.4. Make pipes randomly placed with consistent spacing
// 2.5. Make pipes be able to collide with player and kill them
// 3. Game polish
// 3.1. Make it so that player dies and is able to restart the level by pressing spacebar/mouseclick
// 3.2. Make a simple score system
// 3.3. Game UI & Graphics
// 3.4. Add SFX
// 4. IF POSSIBLE
// 4.1. Leaderboard system
// 4.2. Title screen with the bird constantly flapping at a determined height
// 4.3. Animation of the bird going up and down

import { Application } from "pixi.js";

(async () => {
  const app = new Application();
  await app.init();
  document.body.appendChild(app.canvas);
})();
