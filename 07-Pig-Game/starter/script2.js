const _doc = message => document.querySelector(message);

const score0El = _doc('#score--0');
const score1El = _doc('#score--1');
const diceEl = _doc('.dice');
const btnRoll = _doc('.btn--roll');
const btnHold = _doc('.btn--hold');
const btnNewGame = _doc('.btn--new');
const current0El = _doc('#current--0');
const current1El = _doc('#current--1');
const player0 = _doc('.player--0');
const player1 = _doc('.player--1');

// 0번,1번 플레이어 변경
let scores = [0, 0];

// 저장 될 점수
let score0 = 0;
let score1 = 0;

// 진행 중인 현재 플레이어
let activePlayer = 0;

// 0번 현재점수
let cur0Score = 0;

// 1번 현재점수
let cur1Score = 0;

let playing = true;

// 더미 데이터 초기화
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.style.display = `none`;

btnRoll.addEventListener('click', () => {
  let randomNumber = Math.trunc(Math.random() * 6 + 1);

  if (playing) {
    diceEl.style.display = `block`;
    diceEl.src = `dice-${randomNumber}.png`;

    if (player0.classList.contains('player--active')) {
      if (randomNumber === 1) {
        cur0Score = score0 = scores[activePlayer];
        current0El.textContent = cur0Score - scores[activePlayer];

        activePlayer = 1;
        player0.classList.remove('player--active');
        player1.classList.add('player--active');
      } else {
        score0 += randomNumber;
        cur0Score = score0;
        current0El.textContent = cur0Score - scores[activePlayer];
      }
    } else if (player1.classList.contains('player--active')) {
      if (randomNumber === 1) {
        cur1Score = score1 = scores[activePlayer];
        current1El.textContent = cur1Score - scores[activePlayer];

        activePlayer = 0;
        player1.classList.remove('player--active');
        player0.classList.add('player--active');
      } else {
        score1 += randomNumber;
        cur1Score = score1;
        current1El.textContent = cur1Score - scores[activePlayer];
      }
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    if (player0.classList.contains('player--active')) {
      if (score0 > 20) {
        playing = false;
        diceEl.style.display = `none`;
        player0.classList.add('player--winner');
      }
      current0El.textContent = cur0Score = 0;
      score0El.textContent = scores[activePlayer] = score0;
      activePlayer = 1;
      player0.classList.remove('player--active');
      player1.classList.add('player--active');
    } else if (player1.classList.contains('player--active')) {
      if (score1 > 20) {
        playing = false;
        diceEl.style.display = `none`;
        player1.classList.add('player--winner');
      }

      current1El.textContent = cur1Score = 0;
      score1El.textContent = scores[activePlayer] = score1;
      activePlayer = 0;
      player1.classList.remove('player--active');
      player0.classList.add('player--active');
    }
  }
});

btnNewGame.addEventListener('click', () => {
  cur0Score = cur1Score = score0 = score1 = 0;
  activePlayer = scores[0] = scores[1] = 0;
  current0El.textContent = cur0Score;
  current1El.textContent = cur1Score;
  score0El.textContent = score0;
  score1El.textContent = score1;

  playing = true;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  diceEl.style.display = `none`;
});
