const dice = document.querySelector('.dice');
const rollDice = document.querySelector('#roll--dice');
const cur1ScoreEl = document.querySelector('#current--score--1');
const cur2ScoreEl = document.querySelector('#current--score--2');
const player1Panel = document.querySelector('.player-panel--1');
const player2Panel = document.querySelector('.player-panel--2');
const holdBtn = document.querySelector('#hold');
const displayScore1 = document.querySelector('#display--score--1');
const displayScore2 = document.querySelector('#display--score--2');
const newGame = document.querySelector('#new--game');

let score = 0;
let scores = [0, 0];
let curScore = 0;
let playing = true;

rollDice.addEventListener('click', e => {
  const target = e.target
    .closest('.container')
    .querySelector('.player--active');

  if (target && playing) {
    const random = Math.floor(Math.random() * 6 + 1);

    dice.classList.remove('hidden');
    dice.src = `dice-${random}.png`;
    const activePlayer1 = target.classList.contains('player-panel--1');
    const activePlayer2 = target.classList.contains('player-panel--2');

    console.log(activePlayer1, activePlayer2);

    if (activePlayer1) {
      if (random === 1) {
        cur1ScoreEl.textContent = curScore = 0;
        player1Panel.classList.remove('player--active');
        player2Panel.classList.add('player--active');
        return;
      }

      curScore += random;
      cur1ScoreEl.textContent = curScore;
    } else {
      if (random === 1) {
        cur2ScoreEl.textContent = curScore = 0;
        player1Panel.classList.add('player--active');
        player2Panel.classList.remove('player--active');
        return;
      }

      curScore += random;
      cur2ScoreEl.textContent = curScore;
    }
  }
});

holdBtn.addEventListener('click', e => {
  const target = e.target
    .closest('.container')
    .querySelector('.player--active');

  const activePlayer1 = target.classList.contains('player-panel--1');
  const activePlayer2 = target.classList.contains('player-panel--2');

  console.log(activePlayer1, activePlayer2);

  if (playing) {
    if (activePlayer1) {
      scores[0] += +curScore;
      displayScore1.textContent = scores[0];

      if (scores[0] >= 20) {
        player1Panel.classList.add('player--winner');
        playing = false;
        dice.classList.add('hidden');
        return;
      }
      cur1ScoreEl.textContent = curScore = 0;
      player1Panel.classList.remove('player--active');
      player2Panel.classList.add('player--active');
    } else {
      scores[1] += +curScore;
      displayScore2.textContent = scores[1];

      if (scores[1] >= 20) {
        player2Panel.classList.add('player--winner');
        playing = false;
        dice.classList.add('hidden');
        return;
      }
      cur2ScoreEl.textContent = curScore = 0;
      player1Panel.classList.add('player--active');
      player2Panel.classList.remove('player--active');
    }
  }
});

newGame.addEventListener('click', () => {
  scores[0] = scores[1] = curScore = 0;
  dice.classList.add('hidden');
  displayScore1.textContent = displayScore2.textContent = 0;
  cur1ScoreEl.textContent = cur2ScoreEl.textContent = 0;
  player1Panel.classList.add('player--active');
  player2Panel.classList.remove('player--active');
  player1Panel.classList.remove('player--winner');
  player2Panel.classList.remove('player--winner');
  playing = true;
});
