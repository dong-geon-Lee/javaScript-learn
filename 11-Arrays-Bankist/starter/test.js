// ! 블로그 써야 되는 부분 9 / 28

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

console.log('test 시작 라인');

// todo1 - 모든 계좌의 총액 구하기
// flat과 map의 축약
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, cur) => acc + cur, 0);

// ? 기존 방법
// const bankDepositSum = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .filter(mov => mov > 0)
//   .reduce((acc, cur) => acc + cur, 0);

console.log(bankDepositSum);

// todo2 - 모든 계좌의 총액 구하기
// reduce의 삼항연산자 패턴
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, cur) => (cur >= 1000 ? ++acc : acc), 0);

// ? 기존 방법
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

console.log(numDeposits1000);

// reduce의 객체 패턴
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (acc, cur) => {
      // cur > 0 ? (acc.deposits += cur) : (acc.withdrawals += cur);
      acc[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return acc;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(deposits, withdrawals);

// todo3 - 첫번쨰 문자열 대문자로 바꾸기
// 고차함수 내부에 메서드 쓰기 및 리팩토링
const convertTitleCase = title => {
  const capitalize = str => {
    return str[0].toUpperCase() + str.slice(1);
  };

  const exceptions = ['a', 'an', 'the', 'is'];
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');

  return titleCase;
};

console.log(convertTitleCase('this is a NICE title'));
