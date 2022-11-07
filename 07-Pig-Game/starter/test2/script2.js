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

function activePlayer(curEl, removeActivePlayer, addActivePlayer) {
  curEl.textContent = curScore = 0;
  removeActivePlayer.classList.remove('player--active');
  addActivePlayer.classList.add('player--active');
}

function winnerPlayer(playerPanelEl, isPlaying, diceEl) {
  playing = isPlaying;
  playerPanelEl.classList.add('player--winner');
  diceEl.classList.add('hidden');
}

rollDice.addEventListener('click', e => {
  const target = e.target
    .closest('.container')
    .querySelector('.player--active');
  const random = Math.floor(Math.random() * 6 + 1);
  const activePlayer1 = target.classList.contains('player-panel--1');
  const activePlayer2 = target.classList.contains('player-panel--2');

  if (target && playing) {
    dice.classList.remove('hidden');
    dice.src = `dice-${random}.png`;

    if (activePlayer1) {
      if (random === 1) {
        activePlayer(cur1ScoreEl, player1Panel, player2Panel);
        return;
      }

      curScore += random;
      cur1ScoreEl.textContent = curScore;
    }

    if (activePlayer2) {
      if (random === 1) {
        activePlayer(cur2ScoreEl, player2Panel, player1Panel);
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

  if (playing) {
    if (activePlayer1) {
      scores[0] += +curScore;
      displayScore1.textContent = scores[0];

      scores[0] >= 20
        ? winnerPlayer(player1Panel, false, dice)
        : activePlayer(cur1ScoreEl, player1Panel, player2Panel);
    }

    if (activePlayer2) {
      scores[1] += +curScore;
      displayScore2.textContent = scores[1];

      scores[1] >= 20
        ? winnerPlayer(player2Panel, false, dice)
        : activePlayer(cur2ScoreEl, player2Panel, player1Panel);
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
