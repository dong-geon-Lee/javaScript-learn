console.log('시작');

const closeBtn = document.querySelector('#close--btn');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const modalBtn = document.querySelectorAll('.modal--btn');

console.log(modalBtn);

modalBtn.forEach(btn =>
  btn.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
  })
);

closeBtn.addEventListener('click', () => {
  overlay.classList.add('hidden');
  modal.classList.add('hidden');
});

overlay.addEventListener('click', () => {
  overlay.classList.add('hidden');
  modal.classList.add('hidden');
});
