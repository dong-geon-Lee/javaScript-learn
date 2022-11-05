const _doc = className => document.querySelector(className);
const rollBtnEl = _doc('.roll-dice');
const holdBtnEl = _doc('.hold');
const resetBtnEl = _doc('.new-game');
const player0El = _doc('.content__player-0');
const player1El = _doc('.content__player-1');
const diceEl = _doc('.dice--img');
const score0El = _doc('.score__text--0');
const score1El = _doc('.score__text--1');
const curScore0El = _doc('.current__score--0');
const curScore1El = _doc('.current__score--1');
const playerBox = _doc('.content__box');

let curScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;

const switchPlayer = () => {
  if (scores[activePlayer] >= 20) {
    endGame();
  }

  _doc(`.current__score--${activePlayer}`).textContent = curScore = 0;
  _doc(`.content__player-${activePlayer}`).classList.remove('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  _doc(`.current__score--${activePlayer}`).textContent = curScore = 0;
  _doc(`.content__player-${activePlayer}`).classList.add('player--active');
};

const endGame = () => {
  _doc(`.content__player-${activePlayer}`).classList.add('player--winner');
  _doc(`.content__player-${activePlayer}`).classList.remove('player--active');

  playing = false;
  rollBtnEl.disabled = true;
  holdBtnEl.disabled = true;
};

rollBtnEl.addEventListener('click', () => {
  let diceNumber = Math.trunc(Math.random() * 6 + 1);
  diceEl.src = `dice-${diceNumber}.png`;
  diceEl.classList.remove('hidden');

  if (diceNumber !== 1) {
    curScore += diceNumber;
    _doc(`.current__score--${activePlayer}`).textContent = curScore;
  } else {
    switchPlayer();
  }
});

holdBtnEl.addEventListener('click', () => {
  scores[activePlayer] += curScore;
  _doc(`.score__text--${activePlayer}`).textContent = scores[activePlayer];
  switchPlayer();
});

resetBtnEl.addEventListener('click', () => {
  curScore = scores[0] = scores[1] = activePlayer = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  curScore0El.textContent = 0;
  curScore1El.textContent = 0;
  playing = true;
  rollBtnEl.disabled = false;
  holdBtnEl.disabled = false;
  diceEl.classList.add('hidden');
  _doc('.content__player-0').classList.add('player--active');
  _doc('.content__player-0').classList.remove('player--winner');
  _doc('.content__player-1').classList.remove('player--active');
  _doc('.content__player-1').classList.remove('player--winner');
});
