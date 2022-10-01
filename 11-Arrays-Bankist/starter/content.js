//todo [142강] - 간단한 배열 방법
let arr = ['a', 'b', 'c', 'd', 'e'];

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

//! [1] slice
//? slice는 원본을 변경하지않는다.
//  index에서 시작해서 index 사이의 요소들을 새로운 배열로 반환한다.
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));

// 얕은 복사
// slice를 사용하는 경우는 여러 개의 함수를 결합해서 사용 할 떄,
console.log(arr.slice());
console.log([...arr]);

//! [2] splice
//? splice는 원본을 변경한다.
//  index로 판단하며 첫번째 인수:삭제 위치, 두번쨰 인수: 삭제 개수, 세번째 인수: 삭제된 위치에 요소 넣기
console.log(arr.splice(2));
arr.splice(-1);
arr.splice(1, 2);
console.log(arr.splice(1, 1, '야', '수'));
console.log(arr);

//! [3] reverse
//? reverse는 원본을 변경한다.
//  요소를 역순으로 새로운 배열을 반환한다.
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

//! [4] concat
//? concat는 원본을 변경하지않는다.
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

//! [5] join
//? join는 원본을 변경하지않는다.
//  join() 메서드는 배열의 모든 요소를 연결해 하나의 문자열로 만듭니다.
console.log(letters.join());
console.log(letters.join(''));
console.log(letters.join('-'));

console.log(letters);

//! [6] push
//? push는 원본을 변경한다.
//  push() 메서드는 배열의 끝에 하나 이상의 요소를 추가하고, 배열의 새로운 길이를 반환합니다.
console.log(arr);
const result = arr.push(arr2);
console.log(result);
console.log(arr);

//! [7] shift
//? shift는 원본을 변경한다.
//  shift는 제일 앞에 있는 요소를 제거한다.
arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr);
// 'a'가 반환된다.
console.log(arr.shift());
console.log(arr);

//! [8] unshift
//? unshift는 원본을 변경한다.
//  unshift는 제일 앞에 요소를 추가한다.
arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr);
// arr의 length 값이 반환된다.
console.log(arr.unshift('front-end developer'));
console.log(arr.unshift('learn, js'));
console.log(arr);

//todo [143강] - 메소드의 새로운 기능
arr = [23, 11, 64];

//! [1] at
//? at는 원본을 변경하지않는다.
// 마지막에 있는 배열 요소 얻기
// at메서드가 여기에서 유용하다.
// at 메서드는 문자열에서도 작동합니다!
console.log(arr[0]);
console.log(arr.at(0));
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));
console.log('dong'.at(0));
console.log('dong'.at(-1));
console.log(arr);

//todo [144강] - 루프 배열 forEach()

let movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);

// forEach 메서드는 요소의 개수만큼 배열 내부를 반복하는 것이다.
//! forEach는 항상 전체 배열을 반복한다.
//? continue와 break문은 forEach에서 작동하지 않는다.
movements.forEach((movement, index, array) => {
  // console.log(array);
  if (movement > 0) {
    console.log(`You deposited ${(movement, index)}`);
  } else {
    console.log(`You withdrew ${(Math.abs(movement), index)}`);
  }
});

// for of - forEach와 동일한 결과를 얻는다.
for (const movement of movements) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
}

// forEach가 훨씬 간결하게 사용가능하다.
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

// 0: function(200)
// 1: function(450)
// 2: function(400)

//todo [145강] - 지도와 집합이 있는 forEach()
//? 생각보다 별로 안중요하다고 느낀다. Map, Set
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach((value, key, array) => {
  console.log(`${key}: ${value}`);
});

console.log(currencies);

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
currenciesUnique.forEach((value, _, map) => {
  console.log(`${value}: ${value}`);
});

// todo [149강] - 데이터 변환: map,filter,reduce
// map은 조건이 적용된 새로운 배열을 반환한다.
// filter는 조건에 따른 새로운 배열을 반환한다.
// reduce는 acc 누산기가 있으며 결과값만 반환한다.

// todo [150강] - map methord
//! map 함수는 원본을 변경하지않고 새로운 배열을 반환해준다.
movements = account1.movements;
const eurToUsd = 1.1;
const movementsUSD = movements.map(mov => Math.round(mov * eurToUsd));

console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) {
  movementsUSDfor.push(Math.round(mov * eurToUsd));
}

console.log(movementsUSDfor);

// 조건에 따른 결과값을 반영하여 새 배열을 변수에 할당한다.
const movementsDescriptions = movements.map((mov, i) =>
  mov > 0
    ? `Movement ${i + 1}: You deposited ${mov}`
    : `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`
);

console.log(movementsDescriptions);

// ? map과 forEach에서 console.log로는 똑같은 결과를 출력하지만
// ! map은 결과값을 반환해서 변수에 저장 할 수 있지만 forEach는 그렇게 되지 않는다.
movements.forEach((mov, i) => {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});

// ! filter
// ? 원본배열을 변형 하거나 그러지 않는다.
// 조건에 맞는 새로운 배열을 반환한다.
const deposits = movements.filter(mov => mov > 0);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) {
  if (mov > 0) depositsFor.push(mov);
}

console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

const withdrawalsFor = [];
for (const mov of movements) {
  if (mov < 0) withdrawalsFor.push(mov);
}

console.log(withdrawalsFor);

console.log(movements);

// ! reduce
const balance = movements.reduce((acc, cur, i, arr) => {
  console.log(`Iteration ${i}: ${acc}`);
  return acc + cur;
}, 0);

console.log(balance);

//  for of 사용해서 루프를 돌 떄는 외부변수를 필요로 한다.
// 그러나 고차함수를 사용하면 외부변수 없이도 결과를 확인 할 수 있다.
// 변수가 필요한 상황이 많아지면 번거로워진다는 것이다.
let balance2 = 0;
for (const mov of movements) {
  balance2 += mov;
}
console.log(balance2);

//? reduce로 최대값 구하기
// 내 방식
let maxNum = 0;
movements.reduce((_, cur) => (cur > maxNum ? (maxNum = cur) : maxNum), 0);

// 강의 방식
// 크기를 비교 할 떄는, 배열의 첫번쨰 요소를 넣어라. 0을 넣지말고
const max = movements.reduce(
  (acc, cur) => (acc > cur ? acc : cur),
  movements[0]
);

console.log(maxNum);
console.log(max);

console.log('시작 ');
//? 22/9/19 ! 여기부터 노션 작성 시작 하기

//todo1 고차함수의 파이프 라인 구축
const eurToUsd1 = 1.1;
const totalDepositsUSD = account1.movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd1)
  .reduce((acc, mov) => Math.round(acc + mov), 0);

console.log(totalDepositsUSD);

console.log(account1.movements);
// find 메서드는 실제로 새 배열을 반환하지 않는다.
// 첫 번쨰 요소만 반환한다. filter와 유사한 점이 있다.
// ! 필터는 모든 요소를 반환하지만 find는 한 개의 요소만 반환한다.
const firstWithdrawal = account1.movements.find(mov => mov > 0);
console.log(firstWithdrawal);

// ! 굉장히 유용하고 강력한 방법이다. 조건에 일치하는 객체 그룹을 반환한다.
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

//
//
// ! 22/9/21 시작하기
console.log(movements);

// todo include(Equality)
console.log(movements.includes(-130));

// todo some(Condition)
console.log(movements.some(mov => mov === -130));

const anyDepsits = movements.some(mov => mov > 0);
console.log(anyDepsits);

// todo every
console.log(account4.movements.every(mov => mov > 0));

// todo Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

// todo flat
// 배열을 평탄화 하는 작업을 한다.
const arrList = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arrList.flat());

// flat 디폴트 값은 1이다. 숫자는 배열의 중첩 level 평탄화 시키는 기준을 의미한다.
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

// const accountMovements = accounts.map(acc => acc.movements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance);

// ! 파이프라인으로 아름답게 값 구성
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, cur) => acc + cur, 0);

console.log(overalBalance, '결과');

// todo flatMap
// flat + map === flatMap, 코드가 더 간결해지고 쓰기가 쉬워졋다
// ? 평탄화 level은 1레벨까지만 허용된다. 그 이상은 flat()을 사용해야 된다.
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, cur) => acc + cur, 0);

console.log(overalBalance2, '결과2');

// todo sort
// ! 원래 배열을 반환한다!
// String
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());

// Numbers
console.log(movements);

// return < 0, A,B (keep order)
// return > 0, B,A (switch order)
// ! 매개변수의 위치가 오름차순 및 내림차순을 결정한다.
// ? 첫번쨰 매개변수 a가 b보다 앞에 위치하면 오름차순이다. return < 0
// ? 두번쨰 매개변수 b가 a보다 앞에 위치하면 내림차순이다. return > 0

// 오름차순, 작은 숫자에서 큰 숫자로 정렬
movements.sort((a, b) => a - b);

console.log(movements, '오름');

// 내림차순 ,큰 숫자에서 작은 숫자로 정렬
movements.sort((a, b) => b - a);

console.log(movements, '내림');

// todo fill
console.log([1, 2, 3, 4, 5, 6, 7]);
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

const x = new Array(7);
console.log(x);
// ! fill은 원본 배열을 바꾼다.
x.fill(1, 3, 5);
x.fill(1);
console.log(x);

// ! 9 / 28
// todo Array.from
// 위의 new Array보다 더 선호되는 형태이다.
const y = Array.from({ length: 3 }, () => 3);
console.log(y, 'create');

// map과 유사한 면이 있다.
const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

// split의 "" 와 비슷하게 작동한다. 문자열 => 배열
console.log(Array.from('dog')); // ['d', 'o', 'g']
console.log(Array.from('3910')); // ['3', '9', '1', '0']

// 1~100까지 무작위 숫자를 랜덤으로 출력
const one = Array.from({ length: 100 }, (_, i) =>
  Math.round(Math.random(i + 1) * 100)
);

console.log(one);

// todo replace
// mdn 참고해서 작성하기

// todo 연산자
let a = 10;
let b = 10;
console.log(++a);
console.log(b++);
