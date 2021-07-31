/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const overlay = document.getElementById("overlay");
const btnReset = document.getElementById("btn__reset");
const gameOverMessage = document.getElementById("game-over-message");
const phraseUl = document.querySelector("#phrase ul");
const letters = document.querySelectorAll(".letter");
const heartImages = document.querySelectorAll("#scoreboard ol li img");
const keys = document.querySelectorAll(".key");

// keydown - Event Listener for physical keyboard
document.addEventListener("keydown", (e) => {
  for (let x = 0; x < keys.length; x++) {
    /*checks if key was already pressed
    if so, break terminates the loop*/
    if (keys[x].textContent === e.key && keys[x].classList.contains("wrong")) {
      break;
    }
    if (keys[x].textContent === e.key) {
      game.handleInteraction(keys[x]);
    }
  }
});

// click - Event Listener for onscreen keyboard
keys.forEach((key) => {
  key.addEventListener("click", (e) => {
    let keyValue = e.target;
    game.handleInteraction(keyValue);
  });
});

const game = new Game();

btnReset.addEventListener("click", (e) => {
  game.startGame();
});
