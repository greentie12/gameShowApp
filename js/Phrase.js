/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }
  /**
   * Display phrase on game board
   */
  addPhraseToDisplay() {
    let li = "";
    for (let i = 0; i < this.phrase.length; i++) {
      if (this.phrase[i] === " ") {
        li += `<li class="space"> </li>`;
      } else {
        li += `
          <li class="hide letter ${this.phrase[i]}">${this.phrase[i]}</li>
        `;
      }
    }
    phraseUl.innerHTML = li;
  }
  /**
   * Checks if passed letter is in phrase
   * @param (string) letter - Letter to check
   */
  checkLetter(letter) {
    if (this.phrase.includes(letter)) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * Displays passed letter on screen after a match is found
   * @param (string) letter - Letter to display
   */
  showMatchedLetter(letter) {
    const matchedLetter = document.querySelectorAll(`.${letter}`);

    matchedLetter.forEach((letter) => {
      letter.classList.remove("hide");
      letter.classList.add("show");
    });
  }
}
