'use strict';

// 104강
// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const weekday = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

console.log(openingHours);

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours,

  order(starterIndex, mainIndex) {
    console.log(this);
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1} ${ing2} ${ing3}`);
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});

const arr = [2, 3, 4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

// 구조분해는 원래 배열을 변형하지 않는다.
// 배열의 요소에 접근한다.
const [x, y, z] = arr;
console.log(x, y, z);
console.log(arr);

// ! key에 접근 할 때는 문자열을 써줘야 된다!
// ! 다른 방법은 .(도트 연산자로 key와 연결해라)
// 불필요한 요소는 ,(쉼표)를 추가해서 건너 뛸 수 있다
// const [first, second] = restaurant['categories'];
let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// ? 1.배열 요소의 위치를 바꾸는 방법
[main, secondary] = [secondary, main];
console.log(main, secondary);

// ? 2.이거 실제 앱에서도 쓸 수있는 트릭인데?
// 함수를 이용해서 배열 요소를 구조분해 할 때,
console.log(restaurant.order(2, 0));
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// console.log(categories, starterMenu);
// Nested destructuring
// ? 3.유용한 트릭
const nested = [2, 4, [5, 6]];

// const [i, ,j] = nested;
// console.log(i,j)
const [i, , [j, k]] = nested;
console.log(i, j, k);
console.log(nested.flat());
console.log(nested);

//  Default values
const [p, q, r] = [8, 9];
console.log(p, q, r);

const [a = 1, b = 1, c = 1] = [8, 9];
console.log(a, b, c);

// 104강 - 객체 구조분해
// ? 트릭 4 구조분해 및 이름 바꾸기
const {
  name: restaurantName,
  openingHours: openingHour,
  categories,
} = restaurant;
console.log(restaurantName, openingHour, categories);

// restaruant에 존재하지 않는 key를 default value로 정의 할 수 있으며
// 이미 있는 starterMenu도 배열을 기본값으로 줄 수 있다.
// ? Default values 트릭 5
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating variables
let s = 111;
let d = 999;
const obj = { s: 23, d: 7, n: 14 };
({ s, d } = obj);
console.log(s, d);
console.log(obj);

// Nested objects
const {
  fri: { open: ocn, close: ccn },
} = openingHours;
console.log(ocn, ccn);

// 105강 spread operator
const arrList = [7, 8, 9];
const newArr = [1, 2, ...arrList];

console.log(arrList);
console.log(newArr);
console.log(...newArr);
console.log(1, 2, 7, 8, 9);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

// Join 2 arrays
const menuList = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menuList);

// iterables  arrays, strings, map, sets. NOT objects(객체는 아니다)
// ! 자주 잊어먹는다. 배열 뿐만 아니라 문자열도 spread 사용이 가능하다.
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters);
console.log(...str);
console.log(...str.split(''));
console.log('J o n a s');
// console.log(`${...str}`);

const ingredients = [
  // prompt("Let's make pasta! Ingredient 1?"),
  // prompt('Ingredient 2?'),
  // prompt('Ingredient 3?'),
];

console.log(ingredients);

// restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
restaurant.orderPasta(...ingredients);

// Objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);

// 106강 - Destructuring
// 스프레드 오른쪽에
const arrList2 = [1, 2, ...[3, 4]];
console.log(arrList2);

// 래스트, 왼쪽에
const [h, w, ...others] = [1, 2, 3, 4, 5];
console.log(h, w, others);

const [Pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];

console.log(Pizza, risotto, otherFood);

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat, weekdays);

// 2) Functions
const add = function (...numbers) {
  console.log(numbers);

  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
    console.log(sum);
  }
};

// let numberList = [8, 2, 5, 3, 2, 1, 4];
add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x1 = [23, 5, 7];
add(...x1);

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');

//  107강
// 모든 데이터 타입 사용가능, 모든 데이터 타입 반환
// short-circuiting
console.log('---- OR ----');

console.log(3 || 'Jonas');
console.log('' || 'Jonas');
console.log(true || 0);
// 둘다 false 값이고 마지막 false값을 반환한다.
console.log(undefined || null);

console.log(undefined || 0 || '' || 'Hello' || 23 || null);

restaurant.numGuests = 31;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log('---- AND ----');
// 첫 번쨰 값이 거짓인 경우 그 값을 즉시 반환한다.
// 두 번쨰 피연산자를 평가하지 않는다.
console.log(0 && 'Jonas');
console.log(0 && 1);
// true가 나오면 평가를 계속 진행하여 마지막 값을 반환한다.
console.log(7 && 'Jonas');
// null은 false가 나왔으므로 문자열 jonas 단락 된다.
console.log('Hello' && 23 && null && 'jonas');

// if (restaurant.orderPizza) {
//   restaurant.orderPizza('mushrooms', 'spinach');
// }

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

// 108 nullish 병합연산자(??)
// or연산자 || 와 비슷하게 작동한다.
// Nullish: null and undefiend (NOT 0 or '')
// 숫자 0과 빈 문자열 ''을 true로 인지한다.
restaurant.numGuests = 0;
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

//  109강 논리연산자
const rest1 = {
  name: 'Capri',
  numGuests: 20,
  // numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// OR assignment operator
rest1.numGuests = rest1.numGuests || 10;
// rest1.numGuests ||= 10;

rest2.numGuests = rest2.numGuests || 10;
// rest2.numGuests ||= 10;

console.log(rest1);
console.log(rest2);

// Nullish operator - null병합 연산자는 null or undefined만 잡아낸다
rest1.numGuests = rest1.numGuests ?? 10;
// rest1.numGuests ??= 10;

rest2.numGuests = rest2.numGuests ?? 10;
// rest2.numGuests ??= 10;

console.log(rest1);
console.log(rest2);

// AND assignment operator
// 첫번쨰 값이 false알떄 그 즉시 반환되고 뒤는 단락된다.
rest1.owner = rest1.owner && '<ANONYMOUS>';
// rest1.owner &&= '<ANONYMOUS>';

// owner가 true고 뒤 문자열로 true이므로 마지막 문자열을 반환한다.
rest2.owner = rest2.owner && '<ANONYMOUS>';
// rest2.owner &&= '<ANONYMOUS>';

console.log(rest1);
console.log(rest2);

// 110강 - 코딩챌린지 #1
//  처리

// 111강 - for of
// break와 continue문을 사용할 수없다.
const menus = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menus);

for (const item of menus) {
  console.log(item);
}

// 구조 분해 사용
for (const [i, item] of menus.entries()) {
  console.log(`${i + 1}: ${item}`);
}

for (const item of menus.entries()) {
  console.log(item);
}

// 112강 - 객체 리터럴
// ES6 enhanced object literals
// 객체의 key와 value의 명칭이 같으면 축약형태로 작성 가능
// ? restaurant 객체에서 예시 확인하기
// obj: obj => obj,
// 함수 메서드를 간단하게 작성하기

// 113강 - 옵셔널 체이닝 (?.)
if (restaurant.openingHours && restaurant.openingHours.mon) {
  console.log(restaurant.openingHours.mon);
}

// 에러 발생 -> mon에서 undefined인데 undefined.open으로 읽으려하니 에러가 걸린다.
console.log(restaurant.openingHours.mon?.open);

// 속성이 읽히지 않으면 즉시 undefined 반환
// 속성이 null이 아니어야 합니다.
// 0이나 빈 문자열이면 여전히 존재
let bomo = {
  money: '',
  cake: 0,
};

console.log(restaurant.openingHours.mon?.open);
console.log(bomo.cake ?? 'empty');

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

console.log(openingHours);

// ! 유용한 예제, 옵셔널 체이닝은 병합 연산자와 함께 사용해야된다.
// ! 결과값을 얻지 못하는 상태에서 우측 연산자에 정의한 기본값을 받으려면
// ! 옵셔널 체이닝으로 undefined 값을 얻어내서 에러를 막아야 병합연산자까지
// ! 로직 처리가 이어지기 때문이다.
for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

// Methods
console.log(restaurant.order(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// Array
const users = [{ name: { he: { she: null } } }];
// const users = [];

// 일반 옵셔널 체이닝을 사용하여 없는 속성이 계속 연결돼도
// undefined가 반환되고 병합 연산자까지 평가되어 우측의 value를 얻는다
console.log(users.length);
console.log(users[0].name.he?.she ?? 'User array empty');
console.log(users[0].name.he.she);
// console.log(users[0]?.name ?? users.push(1, 2, 3));

// if (users.length > 0) {
//   console.log(users[0].name);
// } else {
//   console.log('user array empty');
// }

// 114강 - 객체 반복 Object.key, Object.value, Object.entires
console.log(openingHours);

// Property names
const properties = Object.keys(openingHour);
console.log(properties, 'Object.key');

let openStr = `we are open on ${properties.length} days: `;

for (const day of properties) {
  openStr += `${day}, `;
}

console.log(openStr);

let openStr2 = `we are open on ${properties.length} days: `;

for (const [i, el] of properties.entries()) {
  let arrLen = properties.length - 1;
  arrLen === i ? (openStr2 += `${el}`) : (openStr2 += `${el}, `);
}

for (const item of properties.entries()) {
  console.log(item);
}

console.log(openStr2);

// Property Values
const values = Object.values(openingHours);
console.log(values, 'Object.values');

// Property keys
const keys = Object.keys(openingHours);
console.log(keys, 'Object.keys');

// Entire object
const entries = Object.entries(openingHours);
console.log(entries, 'Object.entries');

// ! 훌륭한 예제
for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
}

// 115강 - 코딩 챌린지 #2

// 116강 - new Set()
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);

console.log(ordersSet);
console.log(new Set('Jonas'));
// size는 배열의 길이와 유사하다. 그러나 배열의 길이는 아니다.
console.log(ordersSet.size);
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Bread'));

ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
ordersSet.delete('Risotto');
console.log(ordersSet.size);
ordersSet.clear();
console.log(ordersSet);
// Set으로 iterable 배열을 만들고 fof of로 순회 시,
// ! 중복된 요소들이 제외되고 출력되었다.

for (const order of ordersSet) {
  console.log(order);
}

// ! 가장 핵심인 부분
// 중복을 제거하고 실제 배열로 만든다
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
console.log(staffUnique.length);

// 고유한 배열의 길이
console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
);

// 고유한 문자열의 길이
console.log(new Set('jonasschmedtmann').size);

// 117강 - new Map()
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');

console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 21;

console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

console.log(rest.has('categories'));
rest.delete(2);
// rest.clear();
const arr11 = [1, 2];
rest.set(arr11, 'Test');
rest.set(document.querySelector('h1'), 'Heading');

console.log(rest);
console.log(rest.size);
console.log(rest.get(arr11));

// 118강 - iterable new Map()
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);

console.log(question);
console.log(question.get(1));

// Convery object to map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap.get('thu'));
console.log(hoursMap.delete('fri'));
console.log(hoursMap);

const newHours = [...hoursMap];
console.log(newHours);

// Quiz app
for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`Answer ${key}: ${value}`);
  }
}

// const answer = Number(prompt('Your answer'));
const answer = 3;
console.log(answer);

console.log(question.get(answer));
console.log(question.get('correct') === answer);
console.log(question.get(question.get('correct') === answer));

// Convert map to array
console.log([...question]);
console.log([...question.keys()]);
console.log([...question.values()]);

// 119강 데이터 구조 사용
// 1. 간단한 리스트 - Arrays or Sets
// 2. key/value pairs - Objects or Maps

// 120강 코딩테스트

// 121강 문자열과 함께 작동
const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);

console.log(airline.length);
console.log('B737'.length);

// 기본적으로 문자열은 원시값이기 떄문에 변경할 수 없으며
// 다른값에 저장하여 새로원 문자열로 반환한다.
// ! indexOf lastIndexOf
console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.lastIndexOf('portugal'));

// ! slice
console.log(airline.slice(4));
console.log(airline.slice(4, 7));

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = seat => {
  const s = seat.slice(-1);

  if (s === 'B' || s === 'E') {
    console.log('You got the middle seat 🌞');
  } else {
    console.log('You got lucky 🌝');
  }
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

console.log(new String('jonas'));
console.log(typeof new String('jonas'));
console.log(typeof new String('jonas').slice(1));

// 122강 - 문자열 작업
// ! toLowerCase toUpperCase
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix capitalization in name
const passenger = 'jOnAS';
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);

console.log(passengerCorrect);

// Comparing email
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();
// console.log(trimmedEmail);

// ! trim
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// replacing - 원본을 변형하지 않는다.
// ! replace replaceAll
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';

console.log(announcement.replace('door', 'gate'));
console.log(announcement.replace(/door/g, 'gate'));
console.log(announcement.replaceAll('door', 'gate'));

// Booleans
// ! includes startsWith endsWith
const planes = 'Airbus A320neo';
console.log(planes.includes('A320'));
console.log(planes.includes('Boeing'));
console.log(planes.startsWith('Air'));

if (planes.startsWith('Airbus') && planes.endsWith('neo')) {
  console.log('Part of the NEW ARirbus family');
}

// Practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();

  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard!');
  }
};

checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');

// 123강 문자열 작동 3
// ! split join
console.log('a+very+nice+string'.split('+'));
console.log('Jonas Schmedtmann'.split(' '));

const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');
console.log(firstName, lastName);

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = name => {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }

  console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann');

// Padding
// ! padStart padEnd
const message = 'Go to gate 23!';
console.log(message.padStart(20, '+').padEnd(30, '+'));
console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));

const maskCreditCard = number => {
  const str = number + '';
  // const last = str.slice(4);
  const last = str.slice(-4);

  // return last.padEnd(str.length, '*');
  return last.padStart(str.length, '*');
};

console.log(maskCreditCard(43125553));
console.log(maskCreditCard(4312555312323412));
console.log(maskCreditCard('4312555312323412245'));

// Repeat
// ! repeat
const message2 = 'Bad waether...';
console.log(message2.repeat(3));

const planesInLine = n => {
  console.log(`There are ${n} planes in line ${'🛩'.repeat(n)}`);
};

planesInLine(3);
