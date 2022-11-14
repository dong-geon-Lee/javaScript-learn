const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const openModalBtn = document.querySelector('.nav__account-btn');
const closeModalBtn = document.querySelector('.close__modals-btn');
const modals = document.querySelector('.modals');
const overlays = document.querySelector('.overlays');
const imglogo = document.querySelector('.logo__box');
const linkListsEl = document.querySelectorAll('.link__list');
const landPageEl = document.querySelector('.land__page');
const headerHeight = header.getBoundingClientRect().height;
const heroBtn = document.querySelector('.hero__btn');
const featuresEl = document.querySelector('#features__page');
const featContainerEl = document.querySelector('.features__container');
const allSections = document.querySelectorAll('.section');
const tansferBtn = document.querySelector('.transfers');
const loansBtn = document.querySelector('.loans');
const closingBtn = document.querySelector('.closing');
const optionalBtns = document.querySelectorAll('.btn');
const arrowBtns = document.querySelectorAll('.arrow__btn');
const dots = document.querySelectorAll('.dot');

openModalBtn.addEventListener('click', () => modalWorks('remove'));
closeModalBtn.addEventListener('click', () => modalWorks('add'));
overlays.addEventListener('click', () => modalWorks('add'));
header.addEventListener('mouseover', e => navbarEffect(e, 0.5));
header.addEventListener('mouseout', e => navbarEffect(e, 1));
nav.addEventListener('keydown', e => e.key === 'Escape' && modalWorks('add'));

function modalWorks(property) {
  modals.classList[property]('modal__hidden');
  overlays.classList[property]('modal__hidden');
}

function navbarEffect(event, opacity) {
  if (event.target.classList.contains('link__tag')) {
    const link = event.target;
    const linkTags = link.closest('.header').querySelectorAll('.link__tag');

    linkTags.forEach(linkEl => {
      if (linkEl !== link) {
        linkEl.style.opacity = opacity;
      }
    });
  }
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
});

headerObserver.observe(landPageEl);

function stickyNav(entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
}

heroBtn.addEventListener('click', e => {
  e.preventDefault();
  featuresEl.scrollIntoView({ behavior: 'smooth' });
});

const allSectionObserver = new IntersectionObserver(sectionDisplay, {
  root: null,
  rootMargin: '0px',
  threshold: 0.2,
});

allSections.forEach(allSection => {
  allSectionObserver.observe(allSection);
  allSection.classList.add('hidden');
});

function sectionDisplay(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('hidden');
  observer.unobserve(entry.target);
}

const imgListEl = document.querySelectorAll('.feat__img');

const featConObserver = new IntersectionObserver(imageDisplay, {
  root: null,
  rootMargin: '-100px',
  threshold: 1,
});

imgListEl.forEach(img => {
  featConObserver.observe(img);
});

function imageDisplay(entries, observe) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.add('active');
  entry.target.src = `${entry.target.dataset.id}`;
  observe.unobserve(entry.target);
}

optionalBtns.forEach(opBtn => {
  opBtn.addEventListener('click', e => {
    const targetBtns = e.target.closest('.btn__box').querySelectorAll('.btn');
    targetBtns.forEach(btn => targetLocation(btn, opBtn));

    const targetContainers = e.target
      .closest('.optinonal__container')
      .querySelectorAll('.optionals__content');

    targetContainers.forEach(con => targetLocation(con, opBtn));
  });
});

function targetLocation(element, button) {
  if (element.dataset.id === button.dataset.id) {
    element.classList.add('active');
  } else {
    element.classList.remove('active');
  }
}

arrowBtns.forEach(btn => {
  if (btn.dataset.id === 'left') {
    btn.addEventListener('click', e => {
      const targetGroup = e.target.closest('.testimonials__group');
      const group1 = targetGroup.classList.contains('testimonials__group--1');
      const group2 = targetGroup.classList.contains('testimonials__group--2');
      const group3 = targetGroup.classList.contains('testimonials__group--3');

      function calcTransform(groups, x, y, z, dots) {
        let second = group1 ? 2 : 1;
        let throd = group1 ? 3 : group2 ? 3 : 2;

        groups.forEach(group => {
          if (targetGroup === group) {
            targetGroup.style.transform = `translate(${x}%, -50%)`;
          } else {
            if (group.classList.contains(`testimonials__group--${second}`)) {
              group.style.transform = `translate(${y}%, -50%)`;
            }
            if (group.classList.contains(`testimonials__group--${throd}`)) {
              group.style.transform = `translate(${z}%, -50%)`;
            }
          }
        });

        dots.forEach(dot => {
          if (targetGroup.dataset.id.at(-1) === dot.dataset.id.at(-1)) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }

      const groups = e.target
        .closest('.testimonalis__container')
        .querySelectorAll('.testimonials__group');

      const dots = e.target
        .closest('.testimonalis__container')
        .querySelectorAll('.dot');

      group1 && calcTransform(groups, -250, -150, -50, dots);
      group2 && calcTransform(groups, 150, -50, 250, dots);
      group3 && calcTransform(groups, 150, -150, -50, dots);
    });
  }

  if (btn.dataset.id === 'right') {
    btn.addEventListener('click', e => {
      const targetGroup = e.target.closest('.testimonials__group');
      const group1 = targetGroup.classList.contains('testimonials__group--1');
      const group2 = targetGroup.classList.contains('testimonials__group--2');
      const group3 = targetGroup.classList.contains('testimonials__group--3');

      function calcTransform(groups, x, y, z, dots) {
        let second = group1 ? 2 : 1;
        let throd = group1 ? 3 : group2 ? 3 : 2;

        groups.forEach(group => {
          if (targetGroup === group) {
            targetGroup.style.transform = `translate(${x}%, -50%)`;
          } else {
            if (group.classList.contains(`testimonials__group--${second}`)) {
              group.style.transform = `translate(${y}%, -50%)`;
            }
            if (group.classList.contains(`testimonials__group--${throd}`)) {
              group.style.transform = `translate(${z}%, -50%)`;
            }
          }
        });

        dots.forEach(dot => {
          if (targetGroup.dataset.id.at(-1) === dot.dataset.id.at(-1)) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }

      const dots = e.target
        .closest('.testimonalis__container')
        .querySelectorAll('.dot');

      const groups = e.target
        .closest('.testimonalis__container')
        .querySelectorAll('.testimonials__group');

      group1 && calcTransform(groups, -150, -50, 150, dots);
      group2 && calcTransform(groups, -150, -250, -50, dots);
      group3 && calcTransform(groups, 250, -50, 150, dots);
    });
  }
});

// ! 초기위치 세팅
// 1번 transform: translate(-50%, -50%);
// 2번 transform: translate(150%, -50%);
// 3번 transform: translate(250%, -50%);

// ? 왼쪽 기준
// 첫번쨰 콘텐츠 버튼 눌렀을떄
// 1번 transform: translate(-250%, -50%);
// 2번 transform: translate(-150%, -50%);
// 3번 transform: translate(-50%, -50%);

// 세번쨰 콘텐츠 버튼 눌렀을떄
// 1번 transform: translate(-150%, -50%);
// 2번 transform: translate(-50%, -50%);
// 3번 transform: translate(150%, -50%);

// 두번쨰 콘텐츠 버튼 눌렀을떄
// 1번 transform: translate(-50%, -50%);
// 2번 transform: translate(150%, -50%);
// 3번 transform: translate(250%, -50%);

// ? 오른쪽 기준
// 첫번쨰 콘텐츠 버튼 눌렀을떄
// 1번 transform: translate(-150%, -50%);
// 2번 transform: translate(-50%, -50%);
// 3번 transform: translate(150%, -50%);

// 두번쨰 콘텐츠 버튼 눌렀을떄
// 1번 transform: translate(-250%, -50%);
// 2번 transform: translate(-150%, -50%);
// 3번 transform: translate(-50%, -50%);

// 세번쨰 콘텐츠 버튼 눌렀을떄
// 1번 transform: translate(-50%, -50%);
// 2번 transform: translate(150%, -50%);
// 3번 transform: translate(250%, -50%);
