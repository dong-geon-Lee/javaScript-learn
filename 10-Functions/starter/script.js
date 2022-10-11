'use strict';

// ! 128강 - default values
const bookings = [];

// 디폴트 파라미터 자체에 있는 것을 쓰기 위해서
// 매개변수의 순서도 중요하다
const createBooking = (
  flightNum,
  numPassengers = 1,
  price = 100 * numPassengers
) => {
  // ES5 - 옛날 방식이니까 쓰지 마시오! default parameters를 써라.
  // numPassengers = numPassengers || 1;
  // price = price || 100;
  const booking = {
    flightNum,
    numPassengers,
    price,
  };

  console.log(booking);

  bookings.push(booking);
};

createBooking(3, 10, 3000);
createBooking(3, 10);
createBooking(3, undefined, undefined);

// ! 129강 - 함수 인수 전달의 작동 방식(원시값,참조값)
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 2473,
};

const checkIn = (flightNum, passenger) => {
  console.log(flightNum);
  flightNum = 'LH999';
  console.log(flightNum);
  passenger.name = 'Mr. ' + passenger.name;

  console.log(passenger.passport);

  if (passenger.passport === 2473) {
    // alert('Checked in');
    console.log('Checked in');
  } else {
    // alert('Wrong passport!');
    console.log('Wrong passport!');
  }
};

checkIn(flight, jonas);
console.log(flight); // 'LH234'
console.log(jonas); //

// Is the same as doing...
const flightNum = flight;

// 둘다 메모리 Heap에 있는 동일한 객체
const passenger = jonas;

const newPassport = person => {
  person.passport = Math.trunc(Math.random() * 2000 + 1);
};

newPassport(jonas);
checkIn(flight, jonas);
// 함수의 인수로 기본 유형을 전달할 때 함수는 원래 값 의 복사본 을 만들고 그것으로 작동합니다.
// 객체를 함수의 인수로 전달할 때 함수는 객체가 저장된 메모리 위치를 가리키는 참조 복사본을 만듭니다.
// 이 사본은 값 자체이며 참조가 아닙니다. 이 값을 통해 함수 내부에서 원래 객체를 수정할 수 있습니다.

// - 원시 값을 전달할 때 함수는 원래 값의 복사 본인 값으로 작동합니다 .
// - 객체를 전달할 때 함수는 값으로 작동합니다. 이 값은 원래 객체가 메모리에 있는
// 메모리의 지점에 대한 참조 의 복사본 입니다(여전히 참조가 아님).

// 자바스크립트에서는 참조에 의한 전달이 없다. 오직 값으로만 전달된다.
// 객체의 경우 실제로 참조를 전달합니다. 객체의 메모리 주소입니다.
// 그러나 해당 참조 자체는 여전히 값입니다.

// ! 130강 - 일급 및 고차함수
// 이벤트 리스너도 고차함수다. 다른 함수를 입력으로 받기 떄문이다.
// 일급함수와 고차함수는 다르다. 같은 의미가 아니다.
// 일급함수는 값을 의미한다.

// ! 131강
const oneWord = str => {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = str => {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function
const transformer = (str, fn) => {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

const high5 = a => {
  console.log('🍇', a);
};

document.body.addEventListener('click', high5);
['Jonas', 'Martha', 'Adam'].forEach(high5);

// ! 132강 - 함수가 함수를 반환
// ? 클로져와 연관이 깊다.
const greet = greeting => name => console.log(`${greeting} ${name}`);

greet('Hello')('Jonas');

function greet2(greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
}

greet2('Hey')('kay?');

// ! 133강 - call과 apply
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );

    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');
console.log(lufthansa.bookings);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// this 문제 떄문에 book 함수를 직접 호출하면 바로 에러가 걸린다.
// airline 이랑 iataCode 속성이 없기 떄문이다. book은 그냥 일반 함수처럼 동작한다.
// 그러나 call 이용해서 호출하면 this가 enrowings으로 정해지므로 출력이 가능하다.

// Call Method
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');
console.log(swiss);

// Apply Method -> spread operator
// 현대 자바스크립트는 더이상 apply를 쓰지 않아서 스프레드로 대체 할 수 있다.
const flightData = [777, 'George Cooper'];
book.call(swiss, ...flightData);

// ! 134강 - bind
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams');

const bookEW23 = book.bind(eurowings, 23);
console.log(bookEW23);
bookEW23('Martha Cooper');

// With Event Listener
lufthansa.planes = 300;

lufthansa.buyPlane = function () {
  console.log(this, '와우');
  this.planes++;
  console.log(this.planes, '와우2');
};

// lufthansa.buyPlane();

// ! 굉장히 중요하다.
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

//  ! 중요한 case 흔히 볼 수 있는 패턴
// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.1);
console.log(addVAT(200));

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

console.log(addTaxRate(0.1)(200));

const addVAT2 = addTaxRate(0.1);
console.log(addVAT2(200));

// ! 135강 - 코딩 챌린지 #1

// ! 136강 - 즉시실행함수(IIFE)
(function () {
  console.log('This will never run again');
  const isPrivatge = 23;
  console.log(isPrivatge);
})();

(() => console.log('This will never run again'))();

{
  const isPrivate = 23;
  var notPrivate = 46;
}

// console.log(isPrivate); const 지역 변수이므로 값을 에러 발생
console.log(notPrivate); // var는 외부 변수에 접근 가능하다

// ! 137강 - 클로저
// 스코프와 클로저 둘 다 알아야된다. 함수의 실행이 끝났는데 변수에
// 접근 가능 한 이유를 설명해주기 떄문이다.
// ? 모든 함수는 항상 생성된 실행 컨텍스트의 변수 환경에 접근 할 수 있다.
// 함수는 외부 범위에 대한 참조를 유지한다.
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

// booker() 함수는 변수 passengerCount를 읽을 수 있다.
// 따라서 함수 실행이 끝나도 여전히 passengerCount값을 읽을 수 있다.
// 이를 연결을 클로저라고 한다. 클로저는 가변적인 환경이다.
// ! 스코프 체인이 유지되는 방법은 클로저를 통한다.
// 실행 컨텍스트가 종료되도 가변적인 환경(변수값)은 살아있다.
// 함수는 변수에 대한 연결점을 잃어버리지 않는다.
// ? 클로저는 기본적으로 스코프 체인보다 우선한다.
const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);

// ! 138강 - 클로저 예제

let f;

const g = () => {
  const a = 23;
  f = () => {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 7;
  f = () => {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

// Re-assigning f function
h();
f();
console.dir(f);

// example 2
const boardPassengers = (n, wait) => {
  const perGroup = n / 3;

  setTimeout(() => {
    console.log(`Will start boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);
};

setTimeout(() => console.log('TIMER'), 1000);

const perGroup = 1000;
boardPassengers(180, 3);
