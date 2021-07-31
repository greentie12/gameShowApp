/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
  constructor() {
    this.missed = 0;
    this.phrases = this.createPhrases();
    this.activePhrase = null;
  }
  /**
   * Begins game by selecting a random phrase and displaying it to user
   */
  startGame() {
    phraseUl.innerHTML = "";

    keys.forEach((key) => {
      key.disabled = false;
      key.classList.remove("chosen");
      key.classList.remove("wrong");
      this.missed = 0;
    });

    heartImages.forEach((heartImg) => {
      heartImg.src = "../images/liveHeart.png";
    });

    overlay.classList.remove("win");
    overlay.classList.remove("lose");

    this.activePhrase = game.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
    overlay.style.display = "none";
  }

  /**
   * Creates phrases for use in game
   * @return {array} An array of phrases that could be used in the game
   */
  createPhrases() {
    let phraseArray = [
      new Phrase("seize the day"),
      new Phrase("just do it"),
      new Phrase("once again"),
      new Phrase("it is what it is"),
      new Phrase("never a dull moment"),
    ];

    return phraseArray;
  }
  /**
   * Selects random phrase from phrases property
   * @return {Object} Phrase object chosen to be used
   */
  getRandomPhrase() {
    let randomIndex = Math.floor(Math.random() * this.phrases.length);
    return this.phrases[randomIndex];
  }

  /**
   * delays gameOver() call to allow
   * the final animation to finish
   */
  gameOverDelay() {
    setTimeout(
      function () {
        this.gameOver(true);
      }.bind(this),
      1000
    );
  }

  /**
   * Handles onscreen keyboard button clicks
   * @param (HTMLButtonElement) button - The clicked button element
   */
  handleInteraction(pressedKey) {
    pressedKey.disabled = true;
    let letter = pressedKey.textContent;

    if (this.activePhrase.phrase.includes(letter)) {
      pressedKey.classList.add("chosen");
      game.activePhrase.showMatchedLetter(letter);
      if (this.checkForWin()) {
        //delayed gameOver() call
        this.gameOverDelay();
      }
    } else {
      pressedKey.classList.add("wrong");
      this.removeLife();
    }
  }
  /**
   * Increases the value of the missed property
   * Removes a life from the scoreboard
   * Checks if player has remaining lives and ends
   * game if player is out
   */
  removeLife() {
    heartImages[this.missed].src = "../images/lostHeart.png";
    this.missed++;
    if (this.missed === 5) {
      this.gameOver(true);
    }
  }

  /**
   * Checks for winning move
   * @return {boolean} True if game has been won,
   * false if game wasn't won
   */
  checkForWin() {
    const phraseLi = document.querySelectorAll("#phrase ul li");
    let hidden = 0;
    for (let x = 0; x < phraseLi.length; x++) {
      if (phraseLi[x].classList.contains("hide")) {
        hidden++;
      }
    }
    if (hidden === 0) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Displays game over message
   * @param {boolean} gameWon - Whether or not the user won the game
   */
  gameOver(boolVal) {
    if (boolVal === true) {
      overlay.classList.remove("start");
      if (this.missed === 5) {
        overlay.classList.add("lose");
        gameOverMessage.innerHTML = "Sorry, better luck next time!";
        overlay.style.display = "flex";
      } else {
        overlay.classList.add("win");
        gameOverMessage.innerHTML = "Great job!";
        overlay.style.display = "flex";
      }
      document.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.startGame();
        }
      });
    }
  }
}
