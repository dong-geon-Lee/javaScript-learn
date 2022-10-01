'use strict';
//70강
// console.log(document.querySelector('.message').textContent);

// 71강
// DOM: document object model
// - 기본적으로 HTML 문서의 구조화된 표현이다.
// - DOM을 사용하면 자바스크립트를 사용하여 html요소 및 style에 접근 할 수 있다.
// - DOM은 HTML 문서와 JavaScript의 연결점이다.
// - DOM은 tree 구조고 특별한 객체이다.
// - DOM은 JS와 다르다! (DOM !== JS) DOM은 web API다. JS와 연결할 수 있더다.

// 72강
// document.querySelector('.message').textContent = '🎉 Correct Number';
// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 10;
// document.querySelector('.guess').value = 23;

// 73강 ~ 75강
// dom 요소로 접근해서 연산하는 것보다 변수 하나 만드는게 편리하다.
//   console.log(guess);
//   console.log(typeof guess);
// 문자열 숫자와 숫자를 뺴면 연산이 작동돤다.
// "17" - 1 = 16
// + 연산은 작동되지 않고 옆에 붙는다
// "17" + 1 = 171

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

// 76강 ~ 78강(test)
// ! 1. again 버튼을 누르면 secretNumber와 score를 초기화 시킨다.
// ! 2. message도 초기화 시킨다.
// ! 3. 초기화가 진행되면 배경화면을 #222로 바꿔라

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
