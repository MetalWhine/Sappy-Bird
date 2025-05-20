import { Text, TextStyle, Container } from "pixi.js";
import { Howl } from "howler";

// #####################################################################
//                          Control Panel
const lineSpacing = 100; // Space between score header and the actual score
// #####################################################################

// Text references
let textContainer;
let highscoreText;
let currentScoreText;

// Integers
let currentScore = 0;
let highScore = 0;

let pointSFX;

export function addScoreText(app) {
  // Define universal style
  const style = new TextStyle({
    fontSize: 72,
    fill: 0xf8e4f8,
  });

  // Initialize score header text
  const additionalText = new Text({
    text: "HIGHSCORE    CURRENT",
    style,
  });

  textContainer = new Container();

  // Initialize score text
  highscoreText = new Text({
    text: highScore,
    style,
  });

  currentScoreText = new Text({
    text: currentScore,
    style,
  });

  // Positioning text
  textContainer.addChild(additionalText);
  additionalText.anchor.set(0.5);
  additionalText.x = 0;

  textContainer.addChild(currentScoreText);
  currentScoreText.anchor.set(0.5);
  currentScoreText.y += lineSpacing;
  currentScoreText.x += 270;

  textContainer.addChild(highscoreText);
  highscoreText.anchor.set(0.5);
  highscoreText.y += lineSpacing;
  highscoreText.x -= 220;

  textContainer.x = app.screen.width / 2;
  textContainer.y = app.screen.width / 24;

  app.stage.addChild(textContainer);

  // Add sound effects for going through pipes
  pointSFX = new Howl({ src: ["assets/Get Point.mp3"] });
}

export function addScore() {
  currentScore++;
  if (highScore < currentScore) {
    highScore = currentScore;
  }
  updateScoreText();
  pointSFX.play();
}

export function resetScore() {
  currentScore = 0;
  updateScoreText();
}

function updateScoreText() {
  highscoreText.text = highScore;
  currentScoreText.text = currentScore;
}
