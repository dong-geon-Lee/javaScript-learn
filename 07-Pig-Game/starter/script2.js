const _doc = message => document.querySelector(message);

const score0El = _doc('#score--0');
const score1El = _doc('#score--1');
const diceEl = _doc('.dice');
const btnRoll = _doc('.btn--roll');
const btnHold = _doc('.btn--hold');
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

// 더미 데이터 초기화
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.style.display = `none`;

// 주사위 굴리기
// ! Hold는 누적값 계산
// ! 주사위 1은 cur0Score 초기화
// 버튼이 클릭 할 떄마다 랜덤숫자가 변수에 할당된다.
btnRoll.addEventListener('click', () => {
  let randomNumber = Math.trunc(Math.random() * 6 + 1);

  diceEl.style.display = `block`;
  diceEl.src = `dice-${randomNumber}.png`;

  if (player0.classList.contains('player--active')) {
    if (randomNumber === 1) {
      console.log(cur0Score);
      current0El.textContent = cur0Score = 0;
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
      current1El.textContent = cur1Score = 0;
      activePlayer = 0;
      player1.classList.remove('player--active');
      player0.classList.add('player--active');
    } else {
      score1 += randomNumber;
      cur1Score = score1;
      current1El.textContent = cur1Score - scores[activePlayer];
    }
  }
});

btnHold.addEventListener('click', () => {
  if (player0.classList.contains('player--active')) {
    current0El.textContent = cur0Score = 0;
    score0El.textContent = scores[activePlayer] = score0;
    activePlayer = 1;
    player0.classList.remove('player--active');
    player1.classList.add('player--active');
  } else if (player1.classList.contains('player--active')) {
    current1El.textContent = cur1Score = 0;
    score1El.textContent = scores[activePlayer] = score1;
    activePlayer = 0;
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
  }
});

// // 주사위 굴리기
// btnRoll.addEventListener('click', () => {
//   // 버튼이 클릭 할 떄마다 랜덤숫자가 변수에 할당된다.
//   let randomNumber = Math.trunc(Math.random() * 6 + 1);

//   diceEl.style.display = `block`;
//   diceEl.src = `dice-${randomNumber}.png`;

//   // 버튼 클릭 시, active 클래스가 0번 player에 있을 떄
//   // ! Hold는 누적값 계산
//   // ! 주사위 1은 cur0Score 초기화
//   if (player0.classList.contains('player--active')) {
//     if (randomNumber === 1) {
//       scores[activePlayer] = cur0Score = 0;
//       current0El.textContent = scores[activePlayer];

//       activePlayer = 1;
//       player0.classList.remove('player--active');
//       player1.classList.add('player--active');
//     } else {
//       cur0Score += randomNumber;
//       current0El.textContent = cur0Score;
//       scores[activePlayer] = cur0Score;
//     }
//   } else if (player1.classList.contains('player--active')) {
//     if (randomNumber === 1) {
//       scores[activePlayer] = cur1Score = 0;
//       current1El.textContent = scores[activePlayer];

//       activePlayer = 0;
//       player1.classList.remove('player--active');
//       player0.classList.add('player--active');
//     } else {
//       cur1Score += randomNumber;
//       current1El.textContent = cur1Score;
//       scores[activePlayer] = cur1Score;
//     }
//   }
// });

// btnHold.addEventListener('click', () => {
//   if (player0.classList.contains('player--active')) {
//     if (cur0Score > 0) {
//       scores[activePlayer] += cur0Score;
//     }
//     current0El.textContent = cur0Score = 0;
//     score0El.textContent = scores[activePlayer];

//     activePlayer = 1;
//     player0.classList.remove('player--active');
//     player1.classList.add('player--active');
//   } else if (player1.classList.contains('player--active')) {
//     current1El.textContent = cur1Score = 0;
//     score1El.textContent = scores[activePlayer];

//     activePlayer = 0;
//     player1.classList.remove('player--active');
//     player0.classList.add('player--active');
//   }
// });
