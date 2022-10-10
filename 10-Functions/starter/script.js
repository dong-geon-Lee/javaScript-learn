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
