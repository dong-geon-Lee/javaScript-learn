// Data
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

let myName = 'lee';
let age = 31;

/**
 * @type {string | number}
 * @params {string} `myName` 사람 이름
 * @params {number} `age` 나이
 * @return 두개 합쳐서 문자로 반환함
 * @example testFn() === 'lee31'
 * @todo 내일까지 생성 기능 마저  구현하기 `하이 라이팅 !!! `
 */
const testFn = (myName, age) => {
  return myName + age;
};

console.log(testFn(myName, age));
testFn(myName, age);
