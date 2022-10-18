'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScorollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScorollTo.addEventListener('click', e => {
  e.preventDefault();
  section1.scrollIntoView({ behavior: 'smooth' });
});

// ! 194강 tap 컴포넌트

// todo 공통의 부모에서 이벤트를 만들어서 위임해라
// html 내부에서 data-tab이라는 속성을 따로 쓴다.
// DOM 에 정보를 저장하는 용도이다.
// parentElement 또는 closest를 사용해서 상위 부모를 검색하는데 사용할 수 있다.
tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // Guard clause
  if (!clicked) return;

  // remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Active tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// ! 195강 이벤트 핸들러에 인수 전달하기
// Menu fade animation
const handleHover = (event, opacity) => {
  if (event.target.classList.contains('nav__link')) {
    const link = event.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    console.log(siblings);

    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });

    logo.style.opacity = opacity;
  }
};

//  mouseover는 버블링 되지않음
nav.addEventListener('mouseover', event => handleHover(event, 0.5));
nav.addEventListener('mouseout', event => handleHover(event, 1));

//! 196강 - Sticky
// Sticky navigation
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords, '? 의미하는바');

// window.addEventListener('scroll', () => {
//   console.log(window.scrollY);

//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// const obsCallbak = (entries, observer) => {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// //! 197강 - IntersectionObserver API
// const observer = new IntersectionObserver(obsCallbak, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = entries => {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//! 198강 - display scrolling element
// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

//! 199강 - lazy loading image
// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');
console.log(imgTargets);

const loadImg = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-480px',
});

imgTargets.forEach(img => imgObserver.observe(img));

//! 200강 - slider
// Slider
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let curSlide = 0;
const maxSlide = slides.length;

slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

const goToSlide = slide => {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

goToSlide(0);

// Next slide
const nextSlide = () => {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
};

// Prev slide
const prevSlide = () => {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
///////////////////////////////////////
// ! 192강 이벤트 위임

//  page Navigation (이벤트 위임 전 코드)
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();

// const id = this.getAttribute('href');
// console.log(id);
// document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// ! 1. 공통 부모 요소에 이벤트 리스너를 추가해라 (이벤트 위임!)
// 비효율적인 코드를 계선하기 위함이다.
// ! 2. 어떤 요소가 이벤트를 일으켰는지 정의해라
// ! 3. 매칭 전략 (떄떄로 많이 이용한다)
document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);
  e.preventDefault();

  if (
    e.target.classList.contains('nav__link') &&
    !e.target.classList.contains('btn--show-modal')
  ) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// ! 193강 DOM 순회
const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

// ! 매우 중요한 스킬
// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// nav랑 가장 가까운 부모요소의 style을 바꿔라

// nav.closest('.header').style.background = '#fff';

// 자기 자신
// h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// h1의 부모의 자식 element를 얻는다.
console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(el => {
//   if (el !== h1) {
//     el.style.transform = `scale(1)`;
//   }
// });

// ///////////////////
/**
  자바스크립트 객체는 Node로 나타낸다. Node는 DOM보다 상위유형에 속한다. 
  Node는 textContent, childNodes, parentNode, cloneNode가 나뉜다.  
  DOM은 4가지 타입으로 나뉜다. Element, Text, Comment(주석), Document
  Elment에는 먼저 익숙한 것부터 나열하자면 다음과 같다. 
  innerHTML, classList, remove(), insertAdjacentHTML(), querySelector()
  보통인 것은 parentElement, append(), closest(), setAttribute()
  생소한 것은 children, matches(), scrollIntoView() 이다. 
  ! DOM의 모든 단일 유형의 노드에는 EventTarget과 window 객체를 상속받기 떄문에 
  ? addEventListener(), removeEventListener()를 호출 할 수 있다. 또,
  window에서 가지고 있는 많이 프로퍼티와 메서드에 접근 할 수 있다. 
  ! 따라서 DOM API는 기본적으로 상속에 의해서 작동한다고 볼 수 있다. 
  DOM은 DOM 트리와 상호 작용하는 많은 메서드와 속성을 포함하는 매우 복잡한 API입니다.

  DOM (문서 개체 모델 )은 API (응용 프로그래밍 인터페이스 )입니다. 
  DOM 트리는 DOM API로 표현되는 HTML 문서의 구조입니다. 
  언급한 바와 같이 이 API는 트리를 조작하는 데 사용할 수 있는 많은 메서드와
  속성을 제공하므로 더 나아가 문서를 조작할 수 있습니다.
 */
// const DOM = document.querySelector('body');
/** 새로 고침 시 스크롤이 위로 올라가는 문제점이 있다.
 * a태그의 href 속성값 "#" 에서 발생하는 페이지 새로고침 문제가
 * 원인인데, preventDefault() 함수를 사용해서 작동을 금지시킨다.
 */
// ! Selecting elements
// 전체 html을 가리킨다.
// console.log(document.documentElement);

// html의 body
// console.log(document.body);

// console.log(document.head);
// console.log(document.querySelector('.header'));

// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// id 요소에 접근 할 떄, 사용된다. (#생략됨)
// console.log(document.getElementById('section--1'));

// html에서 전체 button 태그 리스트를 반환한다.
// console.log(document.getElementsByTagName('button'));

// ? 전체 button에 스타일을 변경 할 수 있다.
// const btnList = [...document.getElementsByTagName('button')];
// btnList.forEach(btn => {
//   btn.style.backgroundColor = 'aqua';
// });

// html 태그에 사용된 모든 해당 클래스를 찾는다.
// console.log(document.getElementsByClassName('highlight'));

// Creating and inserting elements
// const header = document.querySelector('.header');

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = 'We use cookied for improved functionality and analytics.';
// message.innerHTML = `We use cookied for improved functionality and analytics.
//   <button class="btn btn--close-cookie">Got it!</button>`;

// prepend(): 해당 element의 첫 번째 자식으로 삽입한다.
// append() : 해당 element의 마지막 자식으로 삽입한다.
// header.prepend(message);
// ? DOM 요소들을 항상 한 번에 한 장소에만 존재할 수 있다.
// 따라서 둘 다 동시에 같은 요소에 메서드를 적용 시킬 수 없다.
// header.prepend(message);
// header.append(message);

// 단, cloneNode(true)를 사용하면 복사본을 만들수 있다.
// header.append(message.cloneNode(true));

// 다른 대안도 존재한다. 바로 before()과 after() 메서드다.
// 이 메서드는 해당 element의 형제 위치에 요소들 위치시킨다.
// 즉, header 라는 부모가 아닌 형제라고 보면 된다 .
// header.before(message);
// header.after(message);

// 그냥 insertAdjacentHTML() 가장 많이 사용되는 메서드 사용하는게 편하겠다.

// Delete elements
// document.querySelector('.btn--close-cookie').addEventListener('click', () => {
//   message.remove();
//    구식 제거 방법
//    message.parentElement.removeChild(message);
// });

// ! 187강 - styles, property, class
// Styles - 인라인 스타일
// style이 html태그의 class에 적용되어야 콘솔로 조회가능하다.
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';
// console.log(message.style.height);
// console.log(message.style.backgroundColor);

// getComputedStyle을 이용해서 앱의 width와 height 아는건 유용할듯
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).width);
// console.log(getComputedStyle(message).height);

// 이게 중요한건지? 잘 모르겠네...
// message.style.height = parseInt(getComputedStyle(message).height) + 'px';
// console.log(message.style.height);

// 앱에 지정된 특정 클래스 전부를 바꿀 수 있는 매력적인 기능이다.
// 상황에 따라서 굉장히 편리할 가능성이 높다.
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.src);
// console.log(logo.alt);
// console.log(logo.className);

// Non-standard : 해당 element의 표준 속성이 아니면 undefined가 출력된다.
// 수동으로 값을 추가해주면 조회된다.
// logo.designer = 'lee';
// console.log(logo.designer);

// setAttribute도 element의 key와 value를 직접 추가해줄 수 있다.
// 속성의 값을 가져오는 속성은 getAttribute를 사용한다.
// logo.setAttribute('company', 'Bankist');
// console.log(logo.getAttribute('company'));
// console.log(logo.getAttribute('src'));

// 값을 가져오는 차이점이 있다.
// const link = document.querySelector('.nav__link--btn');
// console.log(link);

// 절대 경로 URL 반환
// console.log(link.href);

// HTML Tag 내부에서 href 속성의 값 반환 -> '#'
// console.log(link.getAttribute('href'));

// Data attributes
// HTML에서 data- 로 지정된 예약어 js에서 dataset으로 쓴다 (카멜케이스)
// console.log(logo.dataset.versionNumber);

// Classes
// logo.classList.add('c');
// logo.classList.remove('c');
// logo.classList.toggle('c');
// logo.classList.contains('c');
// logo.classList.closest('c');
// Modal window

//! 188강 - 스크롤
// const btnScorollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// // getBoundingClientRect(), window.pageXOffset, window.pageYOffset
// // document.documentElement.clientWidth, document.documentElement.clientHeight
// // window.scrollTo()
// btnScorollTo.addEventListener('click', e => {
//   const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords);
//   console.log(e.target.getBoundingClientRect());
//   console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
//   console.log(
//     'height/width viewPort',
//     document.documentElement.clientHeight,
//     document.documentElement.clientWidth
//   );

//   // old pattern 1
//   // Scrolling
//   // window.scrollTo(
//   //   s1coords.left + window.pageXOffset,
//   //   s1coords.top + window.pageYOffset
//   // );

//   // old pattern 2
//   // window.scrollTo({
//   //   left: s1coords.left + window.pageXOffset,
//   //   top: s1coords.top + window.pageYOffset,
//   //   behavior: 'smooth',
//   // });

//   section1.scrollIntoView({ behavior: 'smooth' });
// });

//! 189강 - 이벤트
// const h1 = document.querySelector('h1');

// const alertH1 = e => {
//   alert('addEventListener: Great! You are reading the heading :D');

//   // h1.removeEventListener('mouseenter', alertH1);
// };

// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => {
//   h1.removeEventListener('mouseenter', alertH1);
// }, 3000);

//! 190강 - 이벤트 단계
// 1. Capturing phase (캡쳐 단계) - 이벤트가 하위 요소로 전파되는 단계
// a 태그에 click 이벤트를 추가하고 실제로 클릭하면
// 이벤트가 a태그가 아닌 Document에서 Click event가 만들어진다. 이어서 캡쳐 단계가 아래에서 진행된다.
// Document > html(Element) > body(Element) > section(Element) > p(Element) > a(Element)
// Document에서 이벤트 발생지인 a 태그까지 내려온다. (이벤트 수신)

// 2. Target Phase (타겟 단계) - 이벤트가 실제 타깃 요소에 전달되는 단계
// Click event가 목적지인 a 태그에 도착하는 즉시, 목표 단계가 시작된다.
// 이벤트가 대상에서 바로 처리될 수 있는 곳이다. .addEventListener()
// 따라서 addEventListener()는 1단계인 캡쳐 단계가 종료 될 떄까지
// Click event를 기다리고 있는 것이다. 이벤트가 도착하면 첨부된 콜백함수를 실행한다.

// 3. Bubbling phase(버블링 단계) - 이벤트가 상위 요소로 전파되는 단계
// 함수가 실행되면 다시 최하위 a태그 element부터 최상위 Document 까지 Click event를 전달한다.
// (형제 요소가 아닌 부모 요소를 거쳐서 통과한다) 실제 이벤트의 처리는 3단계에서 진행된다.
// 대부분의 이벤트는 캡쳐 & 버블링 과정을 거친다.

//! 191강 - 이벤트 전파 예시
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// console.log(randomInt(1, 3));
// console.log(randomColor());
// document.body.style.backgroundColor = randomColor();

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', e.target, e.currentTarget);
// });
