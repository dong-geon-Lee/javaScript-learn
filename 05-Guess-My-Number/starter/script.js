'use strict';

let secretNumber = Math.trunc(Math.random() * 10 + 1);
let score = 20;
let highscore = 0;

const displayStyle = (classes, property, value) => {
  document.querySelector(classes).style[property] = value;
};

const displayTextContent = (classes, value) => {
  document.querySelector(classes).textContent = value;
};

const displayValue = (classes, value) => {
  document.querySelector(classes).value = value;
};

const checkBtn = document.querySelector('.check');

checkBtn.addEventListener('click', e => {
  e.preventDefault();

  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    displayMessage('💄 No number!');
  } else if (guess === secretNumber) {
    displayTextContent('.message', '🎉 Correct Number');
    displayTextContent('.number', guess);
    displayStyle('.number', 'width', '30rem');
    displayStyle('body', 'backgroundColor', '#60b347');

    if (score > highscore) {
      highscore = score;
      displayTextContent('.highscore', highscore);
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayStyle('body', 'backgroundColor', '#222');
      displayTextContent(
        '.message',
        guess > secretNumber ? '📈 Too high!' : '📉 Too low!'
      );
      score--;
      displayTextContent('.score', score);
    } else {
      displayTextContent('.message', '💥 You lost the game!');
      displayTextContent('.score', 0);
    }
  }
});

const againBtn = document.querySelector('.again');

againBtn.addEventListener('click', e => {
  e.preventDefault();

  displayTextContent('.score', (score = 20));
  displayTextContent('.message', 'Start guessing...');
  displayTextContent('.number', '?');
  displayStyle('.number', 'width', '15rem');
  displayStyle('body', 'backgroundColor', '#222');
  displayValue('input', '');
  secretNumber = Math.trunc(Math.random() * 10 + 1);
});
