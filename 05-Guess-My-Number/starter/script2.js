const _doc = className => document.querySelector(className);
const checkbtn = _doc('.check');
const againBtn = _doc('.again');
const guess = _doc('.guess');
const message = _doc('.message');
const score = _doc('.score');
const highscore = _doc('.highscore');
const number = _doc('.number');
const app = _doc('body');

let scores = 20;
let highscores = 0;
let secretNumber = Math.trunc(Math.random() * 10 + 1);

const displayTextContent = (domEl, value) => {
  domEl.textContent = value;
};

const displayStyle = (domEl, property, value) => {
  domEl.style[property] = value;
};

const displayCorrectGuess = guessNumber => {
  displayTextContent(message, '🎉 Correct Number');
  displayTextContent(number, guessNumber);
  displayTextContent(highscore, highscores);
  displayStyle(number, 'width', '30rem');
  displayStyle(app, 'backgroundColor', '#61b347');
  secretNumber = Math.trunc(Math.random() * 10 + 1);
};

const displayWrongGuess = text => {
  displayStyle(app, 'backgroundColor', '#222');
  displayStyle(number, 'width', '15rem');
  displayTextContent(message, text);
  displayTextContent(number, '?');
  scores--;
  displayTextContent(score, scores);
};

const displayResultGame = (text, message, score) => {
  if (scores > 1) {
    displayWrongGuess(text);
  } else {
    displayTextContent(message, '💥 You lost the game!');
    displayTextContent(score, (scores = 0));
  }
};

checkbtn.addEventListener('click', () => {
  let guessNumber = Number(guess.value);

  console.log(guessNumber, secretNumber);

  if (guessNumber === secretNumber) {
    highscores < scores ? (highscores = scores) : highscores;
    displayCorrectGuess(guessNumber);
  } else if (guessNumber > secretNumber) {
    displayResultGame('📈 Too high!', message, score);
  } else if (guessNumber < secretNumber) {
    displayResultGame('📉 Too low!', message, score);
  }
});

againBtn.addEventListener('click', () => {
  displayStyle(app, 'backgroundColor', '#222');
  displayTextContent(number, '?');
  displayStyle(number, 'width', '15rem');
  displayTextContent(message, 'Start guessing...');
  displayTextContent(score, '20');
  displayTextContent(highscore, '0');
  guess.value = '';
});

// 1. check button (이벤트가 일어나는 버튼)
// 버튼이 클릭되면 기대 할 수 있는 것
// - check 버튼의 input value값을 정한다.
// - 랜덤 숫자와 정답이 일치하면 일어나는 변화
// - 첫번째, 우측 start guessing... -> 🎉 Correct Number
// - 두번쨰, 우측 Highscore -> 남은 score의 가장 높은 점수가 기록됨
// - 세번쨰, 배경화면이 검은색에서 녹색으로 변한다.
// - 네번쨰, 가운데 guess 숫자가 check의 input value와 동일한 숫자로 기록되며
// - width는 30rem으로 증가한다.
// ! guessNumber을 이벤트 내에 선언
// ! scores 값 정하기

// 2. againg button (이벤트가 일어나는 버튼)
// againg button을 클릭 하면 원하는 작동을 적자
// ? 1. 배경화면
// ? 2. ?와 박스 크기
// ? 3. check input 초기화
// ? 4. 우측 start guess 초기화
// ? 5. score 초기화
// ? 6. highscore 초기화
