'use strict';

// 104강
// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
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
  },

  order: function (starterIndex, mainIndex) {
    console.log(this);
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
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

//  Default values
const [p, q, r] = [8, 9];
console.log(p, q, r);

const [a = 1, b = 1, c = 1] = [8, 9];
console.log(a, b, c);

// 104강 - 객체 구조분해
// ? 트릭 4 구조분해 및 이름 바꾸기
const { name: restaurantName, openingHours, categories } = restaurant;
console.log(restaurantName, openingHours, categories);

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

// Join 2 arrays
const menuList = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menuList);

// iterables  arrays, strings, maos, sets. NOT objects(객체는 아니다)
// ! 자주 잊어먹는다. 배열 뿐만 아니라 문자열도 spread 사용이 가능하다.
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters);
console.log(...str);
// console.log(`${...str}`);

const ingredients = [
  // prompt("Let's make pasta! Ingredient 1?"),
  // prompt('Ingredient 2?'),
  // prompt('Ingredient 3?'),
];

console.log(ingredients);

restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
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
