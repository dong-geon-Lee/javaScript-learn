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

let scores, score0, score1, cur0Score, cur1Score, activePlayer, playing;

const init = () => {
  scores = [0, 0];
  score0 = 0;
  cur0Score = 0;
  score1 = 0;
  activePlayer = 0;
  cur1Score = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.style.display = `none`;
};

init();

const sumScorePlayer0 = randomNumber => {
  score0 += randomNumber;
  cur0Score = score0;
  current0El.textContent = cur0Score - scores[activePlayer];
};

const sumScorePlayer1 = randomNumber => {
  score1 += randomNumber;
  cur1Score = score1;
  current1El.textContent = cur1Score - scores[activePlayer];
};

const switchPlayer0 = total => {
  score0 = total;
  current0El.textContent = score0 - total;
  player0TurnOff();
};

const switchPlayer1 = total => {
  score1 = total;
  current1El.textContent = score1 - total;
  player1TurnOff();
};

const player0TurnOff = () => {
  activePlayer = 1;
  player0.classList.remove('player--active');
  player1.classList.add('player--active');
};

const player1TurnOff = () => {
  activePlayer = 0;
  player1.classList.remove('player--active');
  player0.classList.add('player--active');
};

const winnerPlayer0Game = () => {
  playing = false;
  diceEl.style.display = `none`;
  player0.classList.add('player--winner');
};

const winnerPlayer1Game = () => {
  playing = false;
  diceEl.style.display = `none`;
  player1.classList.add('player--winner');
};

const displayPlayer0Score = score0 => {
  current0El.textContent = cur0Score = 0;
  score0El.textContent = scores[activePlayer] = score0;
  player0TurnOff();
};

const displayPlayer1Score = score1 => {
  current1El.textContent = cur1Score = 0;
  score1El.textContent = scores[activePlayer] = score1;
  player1TurnOff();
};

const currentPlayer = (element, className) => {
  return element.classList.contains(className);
};

// ! JS값이 변경되면 UI에 해당 값을 element의 textContent에 할당해라!
const resetGame = () => {
  activePlayer = scores[0] = scores[1] = score0 = score1 = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  playing = true;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  diceEl.style.display = `none`;
};

btnNewGame.addEventListener('click', resetGame);

btnRoll.addEventListener('click', () => {
  if (playing) {
    let randomNumber = Math.trunc(Math.random() * 6 + 1);
    diceEl.style.display = `block`;
    diceEl.src = `dice-${randomNumber}.png`;

    // 플레이어 0
    if (currentPlayer(player0, 'player--active')) {
      randomNumber === 1
        ? switchPlayer0(scores[activePlayer])
        : sumScorePlayer0(randomNumber);
    }

    // 플레이어 1
    else if (currentPlayer(player1, 'player--active')) {
      randomNumber === 1
        ? switchPlayer1(scores[activePlayer])
        : sumScorePlayer1(randomNumber);
    }
  } else {
    console.log('게임이 종료되었습니다. 재시작 버튼을 눌러주세요!');
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    // 플레이어 0
    if (currentPlayer(player0, 'player--active')) {
      score0 > 30 && winnerPlayer0Game();
      displayPlayer0Score(score0);
    }

    // 플레이어 1
    else if (currentPlayer(player1, 'player--active')) {
      score1 > 30 && winnerPlayer1Game();
      displayPlayer1Score(score1);
    }
  } else {
    console.log('게임이 종료되었습니다. 재시작 버튼을 눌러주세요!');
  }
});
