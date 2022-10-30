'use strict';
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// ///////////////////////////////////////

// const getCountryData = country => {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   console.log(request.responseText);

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//     <article class="country">
//     <img class="country__img" src="${data.flags.png}" />
//     <div class="country__data">
//       <h3 class="country__name">${data.name.common}</h3>
//       <h4 class="country__region">${data.region}</h4>
//       <p class="country__row"><span>👫</span>${(
//         +data.population / 1000000
//       ).toFixed(1)} people</p>
//       <p class="country__row"><span>🗣️</span>${data.cca3}</p>
//       <p class="country__row"><span>💰</span>${data.region}</p>
//     </div>
//   </article>
//   `;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('portugal');
// getCountryData('usa');

// const getCountryNeighbour = country => {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // Render country 1
//     renderCountry(data);

//     // Get neighbour country (2)
//     const neighbour = data.borders?.[0];

//     if (!neighbour) return;

//     // AJAX call country 2
//     const request2 = new XMLHttpRequest();

//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);
//       console.log(data2);

//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryNeighbour('usa');

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 second passed');
//   }, 1000);
// }, 1000);

// Promise는 객체다. 비동기적으로 전달 된 컨테이너와 같다. 미래의 값
// ! fetch()메서드는 promise를 return 한다.
// ! fetch에 return 을 붙치는 것을 잊지마라.
// ? then의 2번쨰 인자는 error를 처리하는 빌트인 callback함수다.
// ! 하지만 더 좋은 방법은 then 말단에 catch를 사용하는 것이다!
// console.error(), console.table()
// ! throw new Error() 명시적으로 에러메시지를 즉각 표현하고 싶을떄.

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span>${data.cca3}</p>
    <p class="country__row"><span>💰</span>${data.region}</p>
  </div>
</article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = msg => {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = (url, errorMsg = 'Something went wrong') => {
  return fetch(url).then(res => {
    if (!res.ok) throw new Error(`${errorMsg} ${res.status}`);
    return res.json();
  });
};

const getCountryData = country => {
  getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    'Country not found'
  ).then(data => {
    renderCountry(data[0]);
    const neighbour = data[0].borders?.[0];

    if (!neighbour) throw new Error('No neighbour found!');

    return getJSON(
      `https://restcountries.com/v3.1/alpha/${neighbour}`,
      'Country not found'
    )
      .then(data => renderCountry(data[0], 'neighbour'))
      .catch(err => {
        console.error(`${err} 💥`);
        renderError(`Something went wrong 💥💥 ${err.message}`);
      })
      .finally(() => {
        console.log('무조건 호출된다 실패하든 성공하든!');
      });
  });
};

const getCountryData2 = async country => {
  const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  const data = await res.json();

  renderCountry(data[0]);
};

// btn.addEventListener('click', () => {
//   getCountryData('portugal');
// });

// getCountryData2('portugal');

// 257강 작동원리
/**
 자바스크립트 엔진 
 Heap: 객체 메모리가 저장되는 장소 
 CallStack: 코드가 실행되는 장소
 스레드 : 싱글 스레드(멀티태스킹 x)로 한번에 한개만 처리가능 
 Web APIs : 자바스크립트에서 제공하는 API (DOM, Timers, Fetch API)
 event-loop: 콜스텍이 비어 있을 떄마다 이벤트 루프는 콜백 대기열에서 콜백을 가져온다.
 실행할 수 있도록 호출 스텍에 넣어둔다. (비동기 동작을 가능하게 한다) - 비차단 동시성
 //! Web APIs는 비동기 동작을 하는데, DOM addEventListener()는 비동기 함수다. 
//? 자바스크립트에서 이미지는 비동기 형태로 출력된다. 
//! addEventListener()의 콜백 함수는 Web APIs에 등록된다. 이벤트가 발생할 떄가지 대기한다. (비동기 동작 처리중)
//! addEventListener() 콜백 함수는 기본적으로 비동기식 코드다. 
다음 코드가 콜스텍에 들어가는 와중에 fetch() 함수가 호출되면 역시 Web APIs에서 함수가 등록된다. 2개의 함수가 
Web APIs 에 등록되어 있으므로 그만큼 지연이 발생한다. 이어서 then도 똑같이 Web APIs에 등록된다.  (promise)
콜스텍 내부에서 모든 실행이 끝나버리면 Web APIs에서 대기하고 있는 함수(2개)는 CallBack Queue로 이동하는데, 콜백큐는 
콜백 대기열이라고 부른다. 이 콜백 대기열은 기본적으로 순서가 지정된 목록이다. (일종의 할 일 목록)
// ? 이벤트 루프는 콜스텍(callstack)이 비어있는 것을 확인하면(글로벌 실행 컨텍스트 제외) 콜백대기열(callback queue)에
// ? 있는 비동기 함수를 콜스텍(callstack)으로 가져와서 실행시킨다. 이를 event-loop-tick 이라고 한다. 
// ? 이벤트 루프가 콜백을 받을 떄마다 콜백 대기열에서 이벤트 루프 틱이 발생한다. 
// ? 모든 비동기 동작을 관리하는 것은 런타임이다. 자바스크립트는 시간 감각이 없다. 
// ? 실행할 코드 순서를 결정하는 것은 이벤트 루프다. 
// ! 비동기 promise로 작동하는 콜백함수는 micro-tasks-queue에 보관되며 기본적으로 콜백 대기열보다 우선시 된다!
 */

// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// console.log('Test end');

// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 100; i++) {
//     console.log(res);
//   }
// });

const lotteryPromise = new Promise((resolve, reject) => {
  console.log('로또 당첨');
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('당신의 시간이 투자되었다');
    } else {
      reject(new Error('You lost time'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
const wait = seconds => {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
  .then(() => {
    console.log('난 2초 기다렸다');
    return wait(3);
  })
  .then(() => console.log('3초 대기함'));

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));

const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async () => {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();

    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting location data2');
    const data = await res.json();

    renderCountry(data[0]);
    return data;
  } catch (error) {
    console.error(error.message);
    renderError('Something went wrong');

    // Reject promise returned from async function
    throw err;
  }
};

console.log('1: will get location');
// whereAmI()
//   .then(city => console.log(city))
//   .catch(err => console.error(`2: ${err.message}`));
// console.log('2: Finished getting location');

(async function () {
  try {
    const city = await whereAmI();
    console.log(city, '시티');
  } catch (error) {
    console.error(`2: ${error.message}`);
  }
})();

const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

    // console.log([...data1.capital, ...data2.capital, ...data3.capital]);

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data.flat().map(d => console.log(d.capital[0])));
  } catch (error) {
    console.error(error);
  }
};

get3Countries('portugal', 'canada', 'tanzania');
