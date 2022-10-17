'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2022-10-16T21:31:17.178Z',
    '2022-10-15T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2022-10-13T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2022-10-14T17:01:17.194Z',
    '2022-07-15T23:36:17.929Z',
    '2022-10-16T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
  // locale: 'KO', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions
const formatMovementDate = (date, locale) => {
  const calcDaysPassed = (date1, date2) => {
    return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  };

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();

  // return `${year}/${month}/${day}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = (value, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);
    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    console.log(formattedMov);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = () => {
  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      console.log(timer, '5초 맞니?');
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
      console.log(timer);
    }

    // Decrese 1s
    time--;
  };
  // console.log(timer, '여기는?');

  // Set time to 5 minutes
  let time = 5;

  tick();
  // Call the timer every second
  const timer = setInterval(tick, 1000);
  return timer;

  // return setInterval(tick, 1000);
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;
console.log(timer, '타이머');
// fake always logged in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time
    // API test
    // ? 유용한 날짜변환 ! 이런건 생각도 못했다.
    const nows = new Date();
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      weekday: 'long',
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(nows);

    // 오전 시간:분 을 표시한다
    // labelDate.textContent = new Intl.DateTimeFormat('KO', options).format(nows);
    console.log(new Intl.DateTimeFormat('KO').format(nows));

    // 리팩토링 이전 날짜 수식
    // console.log(new Intl.DateTimeFormat('KO').format(nows));

    // const year = nows.getFullYear();
    // const month = `${nows.getMonth() + 1}`.padStart(2, 0);
    // const day = `${nows.getDate()}`.padStart(2, 0);
    // const hour = `${nows.getHours()}`.padStart(2, 0);
    // const min = `${nows.getMinutes()}`.padStart(2, 0);

    // labelDate.textContent = `${year}/${month}/${day}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(() => {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// ! 170강 - Number
// 가끔 이런 숫자가 있다.
console.log(0.1 + 0.2);

// ? Conversion 형변환
console.log(Number('23'));
console.log(+'23');

// Parsing
// ? 제일 앞에 숫자만 있으면 어떤 문자열이든 무시하고 숫자만 출력한다.
console.log(Number.parseInt('500k'));
console.log(Number.parseInt('500k', 10));
console.log(Number.parseInt('2.5rem'));
console.log(Number.parseFloat('2.5rem'));

// isNaN보다 isFinite를 더 권장함
// console.log(Number.isNaN(20));
// console.log(Number.isNaN('20'));
// console.log(Number.isNaN(+'20X'));
// console.log(Number.isNaN(23 / 0), '무한도 숫자가 아니다.');

// 무한대를 측정하기 위해 사용하기 좋다.
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20X'));
console.log(Number.isFinite(23 / 0), '무한도 숫자가 아니다.');

// console.log(Number.isInteger(23.0));
// console.log(Number.isInteger(23));

// ! 171강 - Math
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2)); // 제곱근
console.log(8 ** (1 / 3)); // 세제곱근
console.log(3 ** 2);

console.log(Math.max(5, 18, 3, 2, 1));
console.log(Math.max(5, 18, 23, 11, 2));
// ? 문자열을 넣어도 제일 큰 숫자로 나오네?
console.log(Math.max(5, 18, '23', 11, 2));
console.log(Math.max(5, 18, '23px', 11, 2));

// 파이함수
console.log(Math.PI * Number.parseFloat('10px') ** 2);
console.log(Math.trunc(Math.random() * 6 + 1));

// ? 최소값에서 최대값 사이에 있는 랜덤 숫자, 이거 좋은데??
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
console.log(randomInt(100, 150));

// Math 함수들은 유형을 강제로 숫자로 바꾼다.
// 단순히 소수점 제거
console.log(Math.trunc(23.3));
console.log(Math.trunc('23.3'));

// 조건부 소숫점 반올림 round
console.log(Math.round(23.51));
console.log(Math.round('23.29'));

// 무조건 소숫점 반올림
console.log(Math.ceil(26.1));
console.log(Math.ceil('23.11'));

// 무조건 소숫점 내림
console.log(Math.floor(25.9));
console.log(Math.floor('25.99'));

// Rounding decimals
//? 문자열을 반환 하는것을 주의한다
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log((2.345).toFixed(2));
console.log(+(2.345).toFixed(2));

// ! 172강 -reminder operator
console.log(5 % 2);
console.log(5 / 2);

console.log(8 % 3);
console.log(8 / 3); // 8 = 2 * 3 + 2

console.log(6 % 2);
console.log(6 / 2);

console.log(7 % 2);
console.log(7 / 2);

const isEven = n => n % 2 === 0;
console.log(isEven(6));

const isOdd = n => n % 2 === 1;
console.log(isOdd(isOdd(5)));

// ? 흥미롭다. 이렇게 바꾸는 테크릭이 있다니!!!
labelBalance.addEventListener('click', () => {
  const movs = [...document.querySelectorAll('.movements__row')];
  movs.forEach((row, i) => {
    if ((i + 1) % 2 === 0) row.style.backgroundColor = 'orangered';
    if ((i + 1) % 2 === 1) row.style.backgroundColor = 'aqua';
    if ((i + 1) % 3 === 0) row.style.backgroundColor = 'blue';
  });
});

// ! 173강 - 숫자 구분 기호
// ? underscore를 읽지 못하는 특징을 이용해서 쉼표만들 수 있겠다.
const diameter = '28_000_000';
console.log(diameter.split('_').join(','));

const priceCents = 345_99;
console.log(priceCents);

// ! 174강 - BigInt
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1);
console.log(BigInt(2 ** 55));

// ! 175강 - date & time
const now = new Date();
console.log(now);
console.log(now.getFullYear());
console.log(now.getMonth());
console.log(now.getDate());
console.log(now.getDay());
console.log(now.getHours());
console.log(now.getMinutes());
console.log(now.getSeconds());
console.log(now.toISOString());
console.log(Date.now());

// ! 176강 - bankist 날짜 추가 작업

// ! 177강 - 날짜 연산
// +연산자로 표현해서 시간을 숫자로 변환한게 신선하다
const future = new Date(2037, 10, 19, 15, 23);
console.log(+future);

// 1000을 나누는 이유는 밀리초를 초로 바꾸기 위해서다
// 초 -> 분
// 분 -> 시간
// 시간 -> 일
const calcDaysPassed2 = (date1, date2) => {
  return Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
};

const days1 = calcDaysPassed2(new Date(2037, 3, 4), new Date(2037, 3, 14));
console.log(days1);

// ! 178강 - 날짜 국제화
// bankist app 적용

// ! 179강 - 국제화 API 예시
// 굉장히 유용한 활용 예시다!
const num = 38294798;
const options = {
  style: 'currency',
  // style: 'unit',
  // unit: 'mile-per-hour',
  // unit: 'celsius',
  currency: 'USD',
};

// DateTimeFormat 외에 NumberFormat도 있다.
console.log('K ', new Intl.NumberFormat().format(num));
console.log('US ', new Intl.NumberFormat('en-US', options).format(num));
console.log(
  new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(
    num
  )
);
// ! 180강 - 타이머 함수 API
// setTimeout() - 백그라운드에서 이 콜백 함수를 등록하고 해당 시간이 지나면 호출된다. (비동기)
// ? setTimeout 함수가 인자를 가질 수 있고 인자를 직접 등록해서 사용 할 수 있구나!
const ingredients = ['olives', 'spinach'];

const pizzaTimer = setTimeout(
  (ing1, ing2) => {
    console.log(`Here is your pizza with ${ing1} and ${ing2} 🦂`);
  },
  3000,
  ...ingredients
);

console.log('Waiting...');

//  clearTimeout() - setTimeout의 작동을 중지시킨다.
if (ingredients.includes('spinach')) {
  clearTimeout(pizzaTimer);
}

// setInterval() - 특정 시간마다 콜백함수를 실행시킨다.
// setInterval(() => {
//   const now = new Date();
//   console.log(now);
// }, 3000);

// ! 181강 - 카운트 다운 타이머
