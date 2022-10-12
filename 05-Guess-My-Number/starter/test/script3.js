const _doc = className => document.querySelector(className);

const resetBtnEl = _doc('.again');
const numberInputEl = _doc('.number--input');
const messageEl = _doc('.status--text');
const scoreEl = _doc('.score--text');
const highScoreEl = _doc('.higscore--text');
const checkBtn = _doc('.check-btn');
const body = _doc('body');
const questionEl = _doc('.question--box');

let score = 10;
let highScore = 0;
let randomNumber = Math.trunc(Math.random() * 10 + 1);

resetBtnEl.addEventListener('click', () => {
  numberInputEl.value = '';
  highScoreEl.textContent = 0;
  scoreEl.textContent = score = 10;
  body.style.background = '#222';
  questionEl.style.width = '11.4rem';
  questionEl.textContent = '?';
  messageEl.textContent = 'Start guessing...';
});

const correctAnswer = inputValue => {
  if (score > highScore) {
    highScore = score;
    highScoreEl.textContent = score;
  }

  body.style.background = '#61b348';
  questionEl.style.width = '22rem';
  questionEl.textContent = inputValue;
  numberInputEl.textContent = inputValue;
  highScoreEl.textContent = highScore;
  messageEl.textContent = '🎉 Correct Number!';
};

const wrongAnswer = (message, value) => {
  const checkValue = value === 0 && '⛔️ No number!';

  score--;
  scoreEl.textContent = score;
  highScoreEl.textContent = highScore;
  body.style.background = '#222';
  questionEl.style.width = '11.4rem';
  questionEl.textContent = '?';

  if (score < 1) {
    messageEl.textContent = '💥 You lost the game!';
    score = 0;
    scoreEl.textContent = score;
  } else if (!checkValue) {
    messageEl.textContent = message;
  } else {
    messageEl.textContent = checkValue;
  }
};

checkBtn.addEventListener('click', () => {
  let inputValue = Number(numberInputEl.value);

  console.log(inputValue, randomNumber);

  if (inputValue === randomNumber) {
    correctAnswer(inputValue);
    randomNumber = Math.trunc(Math.random() * 10 + 1);
  } else if (inputValue < randomNumber) {
    wrongAnswer('📉 Too low!', inputValue);
  } else if (inputValue > randomNumber) {
    wrongAnswer('📈 Too high!', inputValue);
  }
});
