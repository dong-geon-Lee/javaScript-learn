// 'use strict';

// // 1. Modal
// const modal = document.querySelector('.modal');
// const overlay = document.querySelector('.overlay');
// const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
// const btnCloseModal = document.querySelector('.btn--close-modal');

// btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// btnCloseModal.addEventListener('click', closeModal);
// overlay.addEventListener('click', closeModal);

// document.addEventListener('keydown', e => {
//   e.key === 'Escape' && closeModal();
// });

// function openModal(e) {
//   e.preventDefault();
//   modal.classList.remove('hidden');
//   overlay.classList.remove('hidden');
// }

// function closeModal() {
//   modal.classList.add('hidden');
//   overlay.classList.add('hidden');
// }

// // todo 1-1. Modal test
// //////////////////////////////////////////v///////////////
// /**
// const modal = document.querySelector('.modal');
// const overlay = document.querySelector('.overlay');
// const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
// const btnCloseModal = document.querySelector('.btn--close-modal');

// btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// btnCloseModal.addEventListener('click', closeModal);
// overlay.addEventListener('click', closeModal);

// document.addEventListener('keydown', e => {
//   e.key === 'Escape' && closeModal();
// });

// function openModal(e) {
//   e.preventDefault();
//   modal.classList.remove('hidden');
//   overlay.classList.remove('hidden');
// }

// function closeModal() {
//   modal.classList.add('hidden');
//   overlay.classList.add('hidden');
// }
// */
// //////////////////////////////////////////v///////////////

// // 2. Navbar Hover-effect
// const nav = document.querySelector('.nav');

// nav.addEventListener('mouseover', e => handleHover(e, 0.5));
// nav.addEventListener('mouseout', e => handleHover(e, 1));

// function handleHover(e, opacity) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = opacity;
//     });

//     logo.style.opacity = opacity;
//   }
// }

// // todo 2-2 Navbar Hover-effect test
// //////////////////////////////////////////v///////////////
// /**
// function handleHover(event, opacity) {
//   const link = event.target;

//   if (link.classList.contains('nav__link')) {
//     const activeLink = link.closest('.nav__item').querySelector('.nav__link');
//     const linkProperty = activeLink.getAttribute('href');

//     nav.querySelector('.nav__logo').style.opacity = opacity;
//     nav.querySelectorAll('.nav__link').forEach(links => {
//       if (linkProperty === links.getAttribute('href')) {
//         activeLink.style.opacity = 1;
//       } else {
//         links.style.opacity = opacity;
//       }
//     });
//   }
// }
// */
// //////////////////////////////////////////v///////////////

// // 3. Navbar scroll
// const navLinks = document.querySelector('.nav__links');

// navLinks.addEventListener('click', e => {
//   e.preventDefault();
//   const targetClsss = e.target.classList;

//   if (
//     targetClsss.contains('nav__link') &&
//     !targetClsss.contains('btn--show-modal')
//   ) {
//     const id = e.target.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   }
// });

// // todo 3-3 Navbar scroll test
// //////////////////////////////////////////v///////////////
// /**
//  const navLinks = document.querySelectorAll('.nav__link');

//  navLinks.forEach(link => {
//    link.addEventListener('click', e => {
//      e.preventDefault();

//      if (
//        link.classList.contains('nav__link') &&
//        !link.classList.contains('btn--show-modal')
//      ) {
//        const id = link.getAttribute('href');
//        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//      }
//    });
//  });
//  */
// //////////////////////////////////////////v///////////////

// // 4. button scroll (Learn more)
// const btnScorollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// btnScorollTo.addEventListener('click', e => {
//   section1.scrollIntoView({ behavior: 'smooth' });
// });

// // todo 4-4 button scroll-test (Learn more)
// //////////////////////////////////////////v///////////////
// /**
// const learnBtn = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// learnBtn.addEventListener('click', () => {
//   section1.scrollIntoView({ behavior: 'smooth' });
// });
// */
// //////////////////////////////////////////v///////////////

// // 5. Sticky navbar
// const header = document.querySelector('.header');
// const navHeight = nav.getBoundingClientRect().height;
// const headerObserver = new IntersectionObserver(stickyNav, {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${navHeight}px`,
// });

// headerObserver.observe(header);

// function stickyNav(entries) {
//   const [entry] = entries;

//   if (!entry.isIntersecting) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// }

// // todo 5-5 Sticky navbar-test
// //////////////////////////////////////////v///////////////
// /**
//  const header = document.querySelector('.header');
//  const navs = document.querySelector('.nav').getBoundingClientRect().height;
//  const navbar = document.querySelector('.nav');

//  const stickbar = entries => {
//    const [entry] = entries;
//    console.log(entry.isIntersecting);

//    if (entry.isIntersecting) {
//      navbar.classList.remove('sticky');
//    } else {
//      navbar.classList.add('sticky');
//    }
//  };

//  const observeHeader = new IntersectionObserver(stickbar, {
//    root: null,
//    threshold: 0,
//    rootMargin: `${navs}px`,
//  });

//  observeHeader.observe(header);
//  */
// //////////////////////////////////////////v///////////////

// // 6. section animation
// const allSections = document.querySelectorAll('.section');
// const sectionObserver = new IntersectionObserver(revealSection, {
//   root: null,
//   threshold: 0.15,
// });

// allSections.forEach(section => {
//   sectionObserver.observe(section);
//   section.classList.add('section--hidden');
// });

// function revealSection(entries, observer) {
//   const [entry] = entries;

//   if (!entry.isIntersecting) return;

//   entry.target.classList.remove('section--hidden');
//   observer.unobserve(entry.target);
// }

// // todo 6-6 section animation-test
// //////////////////////////////////////////v///////////////
// /**
//  const allSections = document.querySelectorAll('.section');
//  console.log(allSections, 'ses');

//  const sectionPart = new IntersectionObserver(revealSection, {
//    root: null,
//    threshold: 0.15,
//  });

//  allSections.forEach(section => {
//    section.classList.add('section--hidden');
//    sectionPart.observe(section);
//  });

//  function revealSection(entries, observer) {
//    const [entry] = entries;
//    console.log(entry);

//    if (!entry.isIntersecting) return;
//    entry.target.classList.remove('section--hidden');
//    observer.unobserve(entry.target);
//  }
//  */
// //////////////////////////////////////////v///////////////

// // 7. lazy image loading
// const imgTargets = document.querySelectorAll('img[data-src]');

// const imgObserver = new IntersectionObserver(loadImg, {
//   root: null,
//   threshold: 0,
//   rootMargin: '-324px',
// });

// imgTargets.forEach(img => imgObserver.observe(img));

// function loadImg(entries, observer) {
//   const [entry] = entries;

//   if (!entry.isIntersecting) return;

//   entry.target.src = entry.target.dataset.src;
//   entry.target.addEventListener('load', () => {
//     entry.target.classList.remove('lazy-img');
//   });

//   observer.unobserve(entry.target);
// }

// // todo 7-7 lazy image-loading test
// //////////////////////////////////////////v///////////////
// // const images = document.querySelectorAll('img[data-src]');
// // console.log(images);

// // const imageLoad = new IntersectionObserver(loadImage, {
// //   root: null,
// //   threshold: 0,
// //   rootMargin: '-324px',
// // });

// // images.forEach(img => imageLoad.observe(img));

// // function loadImage(entries) {
// //   const [entry] = entries;
// //   console.log(entry);

// //   if (!entry.isIntersecting) return;

// //   entry.target.src = entry.target.dataset.src;

// //   entry.target.addEventListener('load', () => {
// //     entry.target.classList.remove('lazy-img');
// //   });

// //   imageLoad.unobserve(entry.target);
// // }
// //////////////////////////////////////////v///////////////

// // 8. tab change
// const tabsContainer = document.querySelector('.operations__tab-container');
// const tabs = document.querySelectorAll('.operations__tab');
// const tabsContent = document.querySelectorAll('.operations__content');

// tabsContainer.addEventListener('click', e => {
//   const clicked = e.target.closest('.operations__tab');

//   if (!clicked) return;

//   tabs.forEach(t => t.classList.remove('operations__tab--active'));
//   tabsContent.forEach(c => c.classList.remove('operations__content--active'));

//   clicked.classList.add('operations__tab--active');

//   document
//     .querySelector(`.operations__content--${clicked.dataset.tab}`)
//     .classList.add('operations__content--active');
// });

// // todo 8-8 tab change test
// //////////////////////////////////////////v///////////////
// // const tabContainer = document.querySelector('.operations__tab-container');
// // const tabs = document.querySelectorAll('.operations__tab');
// // const tabContent = document.querySelectorAll('.operations__content');

// // console.log(tabContainer, tabs, tabContent);

// // tabContainer.addEventListener('click', e => {
// //   const clicked = e.target.closest('.operations__tab');
// //   if (!clicked) return;

// //   tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
// //   tabContent.forEach(ct => ct.classList.remove('operations__content--active'));

// //   clicked.classList.add('operations__tab--active');

// //   document
// //     .querySelector(`.operations__content--${clicked.dataset.tab}`)
// //     .classList?.add('operations__content--active');
// // });
// //////////////////////////////////////////v///////////////

// // 9. slider
// // const slider = () => {
// //   const slides = document.querySelectorAll('.slide');
// //   const btnLeft = document.querySelector('.slider__btn--left');
// //   const btnRight = document.querySelector('.slider__btn--right');
// //   const dotContainer = document.querySelector('.dots');

// //   let curSlide = 0;
// //   let maxslide = slides.length;

// //   const init = () => {
// //     goToSlide(0);
// //     createDots();
// //     activateDot(0);
// //   };

// //   init();

// //   btnLeft.addEventListener('click', prevSlide);
// //   btnRight.addEventListener('click', nextSlide);
// //   dotContainer.addEventListener('click', e => {
// //     if (e.target.classList.contains('dots__dot')) {
// //       curSlide = +e.target.dataset.slide;
// //       goToSlide(curSlide);
// //       activateDot(curSlide);
// //     }
// //   });

// //   function prevSlide() {
// //     if (curSlide === 0) {
// //       curSlide = maxslide - 1;
// //     } else {
// //       curSlide--;
// //     }

// //     goToSlide(curSlide);
// //     activateDot(curSlide);
// //   }

// //   function nextSlide() {
// //     if (curSlide === maxslide - 1) {
// //       curSlide = 0;
// //     } else {
// //       curSlide++;
// //     }

// //     goToSlide(curSlide);
// //     activateDot(curSlide);
// //   }

// //   function goToSlide(slide) {
// //     slides.forEach(
// //       (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
// //     );
// //   }

// //   function createDots() {
// //     slides.forEach((_, i) => {
// //       dotContainer.insertAdjacentHTML(
// //         'beforeend',
// //         `<button class='dots__dot' data-slide='${i}'></button>`
// //       );
// //     });
// //   }

// //   function activateDot(slide) {
// //     document
// //       .querySelectorAll('.dots__dot')
// //       .forEach(dot => dot.classList.remove('dots__dot--active'));

// //     document
// //       .querySelector(`.dots__dot[data-slide='${slide}']`)
// //       .classList.add('dots__dot--active');
// //   }

// //   // slides.forEach((s, i) => {
// //   //   s.style.transform = `translateX(${100 * i}%)`;
// //   // });
// // };

// // slider();

// // todo 9. slider test
// //////////////////////////////////////////v///////////////
// const slider = () => {
//   const slides = document.querySelectorAll('.slide');
//   const btnLeft = document.querySelector('.slider__btn--left');
//   const btnRight = document.querySelector('.slider__btn--right');
//   const dotContainer = document.querySelector('.dots');

//   let curSlide = 0;
//   let maxslide = slides.length;

//   const init = () => {
//     goToSlide(0);
//     createDots();
//     activateDot(0);
//   };

//   init();

//   btnLeft.addEventListener('click', prevSlide);
//   btnRight.addEventListener('click', nextSlide);

//   dotContainer.addEventListener('click', e => {
//     if (!e.target.classList.contains('dots__dot')) return;

//     const dots = document.querySelectorAll('.dots__dot');

//     dots.forEach((dot, i) => {
//       dot.classList.remove('dots__dot--active');

//       if (+e.target.dataset.slide === i) {
//         activateDot(+e.target.dataset.slide);
//       }
//     });
//   });

//   function activateDot(slide) {
//     const dots = document.querySelectorAll('.dots__dot');

//     dots.forEach(dot => {
//       dot.classList.remove('dots__dot--active');

//       if (+dot.getAttribute('data-slide') === slide) {
//         dot.classList.add('dots__dot--active');
//       }
//     });

//     curSlide = slide;
//     goToSlide(curSlide);
//   }

//   function prevSlide() {
//     if (curSlide === 0) {
//       curSlide = maxslide - 1;
//       goToSlide(curSlide);
//       activateDot(curSlide);
//     } else {
//       curSlide--;
//       goToSlide(curSlide);
//       activateDot(curSlide);
//     }
//   }

//   function nextSlide() {
//     if (curSlide === maxslide - 1) {
//       curSlide = 0;
//       goToSlide(curSlide);
//       activateDot(curSlide);
//     } else {
//       curSlide++;
//       goToSlide(curSlide);
//       activateDot(curSlide);
//     }
//   }

//   function goToSlide(slide) {
//     slides.forEach(
//       (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
//     );
//   }

//   function createDots() {
//     slides.forEach((_, i) => {
//       dotContainer.insertAdjacentHTML(
//         'beforeend',
//         `<button class='dots__dot' data-slide='${i}'></button>`
//       );
//     });
//   }
// };

// slider();
// //////////////////////////////////////////v///////////////
