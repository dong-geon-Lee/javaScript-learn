// 'use strict';

// 1. Modal
const modalBtn = document.querySelector('.btn--show-modal');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.btn--close-modal');
const overlay = document.querySelector('.overlay');

modalBtn.addEventListener('click', openModal);
overlay.addEventListener('click', closeModal);
closeModalBtn.addEventListener('click', closeModal);

function openModal() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

// 2. Navbar Hover-effect
const nav = document.querySelector('.nav');

nav.addEventListener('mouseover', event => navlinkHover(event));
nav.addEventListener('mouseout', event => navlinkHover(event));

function navlinkHover(event) {
  if (event.target.classList.contains('nav__link')) {
    const type = event.type === 'mouseover' ? 0.5 : 1;
    const target = className => event.target.closest(className);
    const linkList = target('.nav__links').querySelectorAll('.nav__link');
    const logoImg = target('.nav').querySelector('.nav__logo');

    linkList.forEach(link => (link.style.opacity = type));
    logoImg.style.opacity = type;
    event.target.style.opacity = 1;
  }
}

// 3. Navbar navigation event
const navlinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('.section');

navlinks.forEach(navlink => {
  navlink.addEventListener('click', e => {
    e.preventDefault();

    if (!e.target.classList.contains('btn--show-modal')) {
      const id = !modal || e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// 4. button scroll (Learn more)
const moveLearnBtn = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

moveLearnBtn.addEventListener('click', () => {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// 5. Sticky navbar
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const sectionInter = new IntersectionObserver(stickybar, {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`,
});

sectionInter.observe(header);

function stickybar(entries) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    nav.classList.remove('sticky');
  } else {
    nav.classList.add('sticky');
  }
}

// 6. section animation
// 첫번쨰
const allSections = document.querySelectorAll('.section');

// 세번쨰
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

// 두번쨰
allSections.forEach(section => {
  sectionObserver.observe(section);
  console.log('관측되어 hidden이 추가');
  section.classList.add('section--hidden');
});

// 네번쨰
function revealSection(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  console.log(entry.target, '제거됨');
  observer.unobserve(entry.target);
  console.log('관측 중단');
}

// 7. lazy image loading
const images = document.querySelectorAll('img[data-src]');
console.log(images);

const showImg = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: -324 + 'px',
});

images.forEach(image => {
  showImg.observe(image);
});

function loadImg(entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('lazy-img');
  entry.target.addEventListener('load', () => {
    entry.target.src = entry.target.dataset.src;
  });
}

// 8. tab change
const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const content = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', e => {
  if (e.target.classList.contains('operations__tab')) {
    tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
    content.forEach(cnt => cnt.classList.remove('operations__content--active'));

    e.target.classList.add('operations__tab--active');

    document
      .querySelector(`.operations__content--${e.target.dataset.tab}`)
      .classList.add('operations__content--active');
  }
});

// 9. slider
