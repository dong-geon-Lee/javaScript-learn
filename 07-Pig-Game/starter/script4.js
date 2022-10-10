'use strict';

// Selecting elements
const _doc = className => document.querySelector(className);

const player0El = _doc('.player--0');
const player1El = _doc('.player--1');
const score0El = _doc('#score--0');
const score1El = _doc('#score--1');
const current0El = _doc('#current--0');
const current1El = _doc('#current--1');
const diceEl = _doc('.dice');
const btnNew = _doc('.btn--new');
const btnRoll = _doc('.btn--roll');
const btnHold = _doc('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};

init();

const switchPlayer = () => {
  _doc(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnNew.addEventListener('click', init);

btnRoll.addEventListener('click', () => {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1);

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      _doc(`#current--${activePlayer}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    _doc(`#score--${activePlayer}`).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 25) {
      playing = false;
      diceEl.classList.add('hidden');

      _doc(`.player--${activePlayer}`).classList.add('player--winner');
      _doc(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// 'use strict';

// // todo Test setting
// let scores, currentScore, activePlayer, playing;

// const init = () => {
//   //
// };

// init();

// const switchPlayer = () => {
//   //
// };

// btnNew.addEventListener('click', init);

// btnRoll.addEventListener('click', () => {
//   //
// });

// btnHold.addEventListener('click', () => {
//   //
// });
