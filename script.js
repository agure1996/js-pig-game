'use strict';

/*instantiating variables for elements we will be manipulating */

let scores, currentScore, currentPlayer, activePlayer, playing;

//score for player one
const score0Element = document.querySelector('#score--0');
//current element for p1
const current0 = document.getElementById('current--0');

//score element for player 2
const score1Element = document.querySelector('#score--1');
//current element for p2
const current1 = document.getElementById('current--1');

//panel for player one
const panel0 = document.querySelector('.player--0');

//panel for player two
const panel1 = document.querySelector('.player--1');

//the button elements
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//dice element
const diceElement = document.querySelector('.dice');

//hide the dice for now
diceElement.classList.add('hidden');

//set elements to 0
score0Element.textContent = 0;
score1Element.textContent = 0;

const initializeGame = () => {
  //storing scores in an array
  scores = [0, 0];

  //start with player 1: both values are 0 because we will be using ternary operator to switch between player 1 and 2
  currentPlayer = 0;
  activePlayer = 0;

  //used to keep track of playable state of game
  playing = true;

  //need current score
  currentScore = 0;

  /* resetting the game values and variables */

  //scores back to 0
  score0Element.textContent = 0;
  score1Element.textContent = 0;

  //set current scores back to 0
  current0.textContent = 0;
  current0.value = 0;
  current1.textContent = 0;
  current1.value = 0;

  //Buttons are accessible
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');

  //Remove winner
  panel0.classList.remove('player--winner');
  panel1.classList.remove('player--winner');
  panel0.classList.add('player--active');
  panel1.classList.remove('player--active');
};

initializeGame();

//display the dice and roll a number
btnRoll.addEventListener('click', () => {
  //if we are playing
  if (playing) {
    //rolling a number from 1-6
    let diceRoll = Math.trunc(Math.random() * 6) + 1;

    //display dice image relative to number rolled
    diceElement.src = `dice-${diceRoll}.png`;
    //display the dice
    diceElement.classList.remove('hidden');

    /**The rule is that if the individual rolls a '1' , it becomes the next players turn
     * if they roll more than one they add the number to their current number and can roll again
     *
     */

    //check to see if dice rolled one
    if (diceRoll != 1) {
      //add dice to current score
      currentScore += diceRoll;

      //select score element dynamically relative to player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player

      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  //if we are playing
  if (playing) {
    //add current score to active players score
    scores[activePlayer] += currentScore;
    //reference: scores[1] = scores[1] + currentScore

    //check if currentscore is >= 100
    //if so finish the game

    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      //   document.getElementById(`name--${activePlayer}`).textContent = ` Winner!`;

      //since we have a winner we stop playing
      playing = false;
      //prevent further interactions
      stopInteractions();
    } else {
      //otherwise upon holding add accrued points to current score
      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];

      //and switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', initializeGame);

const switchPlayer = () => {
  //set current player text content back to 0 before the switch
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  //reset current score also to 0 before we do the switch
  currentScore = 0;

  //assigning the next active player, and checking if the previous player was 0 or 1. allowing us to switch players
  activePlayer = activePlayer === 0 ? 1 : 0;
  panel0.classList.toggle('player--active');
  panel1.classList.toggle('player--active');
};
//stop interacting with game since we have a winner
const stopInteractions = () => {
  //hide interactive features except the new game button
  btnRoll.classList.add('hidden');
  btnHold.classList.add('hidden');
  diceElement.classList.add('hidden');
};
