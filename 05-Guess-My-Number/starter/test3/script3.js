/**
 //! 정답을 맞췄을 떄 반영되는 사항들 
 1. 배경화면이 녹색으로 변경된다. 
 2. 박스의 ?가 숫자로 대체되고 width가 2.5배 이상 넗어진다. 
 3. input 박스 내부의 배경이 녹색으로 변경된다. 
 4. Start guessing... ===> 🎉 Correct Number 으로 대체된다. 
 5. Score 가 표시된다. 문제가 틀리면 점수가 계속 떨어진다. 
 6. HighScore가 표시된다. 정답을 맞춰도 HighScore는 최고 수준을 유지한다. 
 7. 맞춘 상태에서 버튼을 눌러도 아무런 동작을 하지 않는다. 
 8. 문제를 틀리면 📉 Too low! 또는 📈 Too high! 가 표시된다. 
 9. score가 0이 되는 순간 💥 You lost the game! 텍스트가 나온다. 
 */

const againBtn = document.querySelector('#again');
const checkBtn = document.querySelector('#check');
const input = document.querySelector('#input');
const body = document.querySelector('body');
const box = document.querySelector('.question');
const title = document.querySelector('.start__text');
const questionText = document.querySelector('.question__text');
const scorePoint = document.querySelector('.score__point');
const highscorePoint = document.querySelector('.highscore__point');

let randomNumber = Math.floor(Math.random() * 20 + 1);
let score = 20;
let playing = true;
let highScore = 0;

console.log(randomNumber);

const checkGame = () => {
  const high = randomNumber < +input.value;

  score--;
  scorePoint.textContent = score;
  body.style.backgroundColor = '#222;';
  box.style.width = '12rem';
  title.textContent = high ? '📈 Too high!' : '📉 Too low!';
  questionText.textContent = '?';

  if (score === 0) {
    playing = false;
    title.textContent = '💥 You lost the game!';
  }
};

checkBtn.addEventListener('click', () => {
  if (playing) {
    if (randomNumber === +input.value) {
      playing = false;
      highScore < score ? (highScore = score) : highScore;
      highscorePoint.textContent = highScore;
      body.style.backgroundColor = '#61b348';
      box.style.width = '25rem';
      title.textContent = '🎉 Correct Number';
      questionText.textContent = input.value;
    } else {
      checkGame(score);
    }
  }
});

againBtn.addEventListener('click', () => {
  score = 20;
  scorePoint.textContent = score;
  body.style.backgroundColor = '#222';
  box.style.width = '12rem';
  title.textContent = 'Start guessing...';
  questionText.textContent = '?';
  input.value = '';
  randomNumber = Math.floor(Math.random() * 20 + 1);
  playing = true;
});
