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

// 1. insertAdjacentHTML이다. insertAdjacentElement이 아니다!
// 2. for of로 렌더랑 가능하다 (단, forEach와 차이점은 index 사용아 불가능하다)
//   for (const mov of movements) {
//     const type = mov > 0 ? 'deposit' : 'withdrawal';

//     const html = `<div class="movements__row">
//         <div class="movements__type movements__type--${type}"> ${type}</div>
//         <div class="movements__date"></div>
//         <div class="movements__value">${mov}€</div>
//     </div>`;

//     containerMovements.insertAdjacentHTML('beforeend', html);
//   }
const displayMovements = (acc, sort = false) => {
  containerMovements.innerHTML = '';

  const mov = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  mov.forEach((mov, index) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
      <div class="movements__date"></div>
      <div class="movements__value">${mov}€</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// 3. balance key 만들기
// 4. 이자율 구하는 공식: (deposit * interestRate) / 100
const calcDisplayBalance = acc => {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = acc => {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = accs => {
  accs.forEach(acc => {
    acc.username = acc.owner
      .split(' ')
      .map(name => name[0])
      .join('')
      .toLowerCase();
  });
};

createUsernames(accounts);

let currentAccount;

const updateUI = acc => {
  displayMovements(acc);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};

btnLogin.addEventListener('click', e => {
  e.preventDefault();

  const checkUser = accounts.find(acc =>
    acc.username === inputLoginUsername.value &&
    acc.pin === Number(inputLoginPin.value)
      ? true
      : false
  );

  currentAccount = checkUser;
  updateUI(currentAccount);

  containerApp.style.opacity = 1;
  inputLoginUsername.value = '';
  inputLoginPin.value = '';
  inputLoginPin.blur();

  console.log(accounts);
  console.log(currentAccount);
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  const checkUser = accounts.find(
    acc => inputTransferTo.value === acc.username
  );

  const checkAmount =
    currentAccount.balance >= inputTransferAmount.value ? true : false;

  console.log(checkUser, checkAmount);

  if (checkUser && checkAmount) {
    checkUser.movements.push(Number(inputTransferAmount.value));
    currentAccount.movements.push(Number(-inputTransferAmount.value));
  }

  updateUI(currentAccount);

  inputTransferTo.value = '';
  inputTransferAmount.value = '';
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();

  console.log(currentAccount, '현');

  currentAccount.movements.push(Number(inputLoanAmount.value));
  updateUI(currentAccount);

  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', e => {
  e.preventDefault();

  const checkUser = accounts.findIndex(
    acc =>
      acc.username === inputCloseUsername.value &&
      acc.pin === Number(inputClosePin.value)
  );

  console.log(checkUser);

  accounts.splice(checkUser, 1);
  containerApp.style.opacity = 0;
  updateUI(currentAccount);

  console.log(accounts);
  inputCloseUsername.value = '';
  inputClosePin.value = '';
});

let sorted = false;

btnSort.addEventListener('click', e => {
  e.preventDefault();

  sorted = !sorted;
  displayMovements(currentAccount, sorted);
});

labelBalance.addEventListener('click', () => {
  //   const movementsUI = Array.from(
  //     document.querySelectorAll('.movements__value'),
  //     el => el.textContent.replace('€', '')
  //   );

  //   console.log(movementsUI);

  const movementUI2 = [...document.querySelectorAll('.movements__value')];
  const result = movementUI2.map(el => el.textContent.replace('€', ''));
  console.log(result);
});
