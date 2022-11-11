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
  console.log(img.dataset.id);
  featConObserver.observe(img);
});

function imageDisplay(entries, observe) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.add('active');
  entry.target.src = `${entry.target.dataset.id}`;
  observe.unobserve(entry.target);
}
