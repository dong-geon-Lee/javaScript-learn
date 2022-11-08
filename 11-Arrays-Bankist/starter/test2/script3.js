const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
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
  currency: 'KRW',
  locale: 'ko-KR',
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
  currency: 'KRW',
  locale: 'ko-KR',
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

let sorted = false;
let timerID;

const accounts = [account1, account2, account3, account4];
const containerEl = document.querySelector('.container');
const recodedAreaEl = document.querySelector('.recoded__area');

const loginBtnEl = document.querySelector('.login__btn');
const transferBtnEl = document.querySelector('.transfer__btn');
const requestBtnEl = document.querySelector('.request__btn');
const closeBtnEl = document.querySelector('.close__btn');
const sortBtnEl = document.querySelector('.sort');

const currentBalanceEl = document.querySelector('.current__balance');
const displayInEl = document.querySelector('.display__in');
const displayOutEl = document.querySelector('.display__out');
const displayInterestEl = document.querySelector('.display__interest');

const transferInput = document.querySelector('.transfer__input-name');
const transferAmountInput = document.querySelector('.transfer__input-amount');
const requestAmountInput = document.querySelector('.request__input-amount');
const closeInputUser = document.querySelector('.close__input-user');
const closeInputPin = document.querySelector('.close__input-pin');

const inputUser = document.querySelector('.user__input');
const inputPin = document.querySelector('.pin__input');
const timeoutEl = document.querySelector('.timeout');

function init() {
  loginBtnEl.addEventListener('click', e => {
    e.preventDefault();

    const correctAcc = authUser();

    if (!correctAcc) {
      containerEl.style.opacity = 0;
      return;
    }

    containerEl.style.opacity = 1;
    recodedAreaEl.innerHTML = '';

    correctAcc && renderRecoded(correctAcc);
    updateDisplay(correctAcc);

    if (timerID) clearInterval(timerID);
    timerID = loginTimer();
  });

  transferBtnEl.addEventListener('click', e => {
    e.preventDefault();

    const currentUser = authUser();
    const checkAcc = transferInput.value;
    const checkAmount = +transferAmountInput.value;
    const existAccount = accounts.find(account => account.owner === checkAcc);

    if (currentUser && checkAcc && checkAmount && existAccount) {
      currentUser.movements.push(-checkAmount);
      existAccount.movements.push(checkAmount);
      renderRecoded(currentUser);
      updateDisplay(currentUser);
    }
  });

  requestBtnEl.addEventListener('click', e => {
    e.preventDefault();

    const currentUser = authUser();
    const checkLoan = +requestAmountInput.value;

    if (currentUser && checkLoan) {
      currentUser.movements.push(checkLoan);
      renderRecoded(currentUser);
      updateDisplay(currentUser);
    }
  });

  closeBtnEl.addEventListener('click', e => {
    e.preventDefault();

    const currentUser = authUser();
    const checkUser = closeInputUser.value;
    const checkPin = +closeInputPin.value;
    const existAccount = accounts.find(
      account => account.owner === checkUser && account.pin === checkPin
    );

    if (currentUser && existAccount) {
      const index = accounts.findIndex(
        account => account.owner === existAccount.owner
      );

      if (currentUser === existAccount) {
        containerEl.style.opacity = 0;
      }

      accounts.splice(index, 1);
    }
  });

  sortBtnEl.addEventListener('click', () => {
    const currentUser = authUser();
    sorted = !sorted;
    renderRecoded(currentUser, sorted);
  });

  changeAccOwner();
}

function changeAccOwner() {
  accounts.forEach(account => {
    account.owner = account.owner
      .split(' ')
      .map(word => word[0].toLowerCase())
      .join('');
  });

  console.log(accounts);
}

function loginTimer() {
  let time = 600;

  const intervalID = setInterval(() => {
    timeoutEl.textContent = `${time}초`;

    if (time === 0) {
      clearInterval(timerID);
      containerEl.style.opacity = 0;
    }

    time--;
  }, 1000);

  return intervalID;
}

function authUser() {
  const checkUser = inputUser.value;
  const checkPin = +inputPin.value;
  const correctAcc = accounts.find(
    account => account.owner === checkUser && account.pin === checkPin
  );

  return correctAcc;
}

// 특별히 매력없음
// ? new Intl.NumberFormat()

// 특별히 매력없음
// ? new Intl.DateTimeFormat()

// 현재 날짜
// ? new Date()

// 날짜 구분자 -변형이 조금 성가시긴 하다.
// ? new Date(년,월,일).toISOString()

// 이게 제일 좋은 방법이다.
// ? new Date(년,월,일).toLocaleDateString()

function renderRecoded(correctAcc, sorted) {
  recodedAreaEl.innerHTML = '';

  const movDates = correctAcc.movementsDates.map(movDate => {
    return { date: movDate };
  });

  const copyMovDates = movDates.slice();
  const sortedMovDates = copyMovDates.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const copyMovements = correctAcc.movements.slice().sort((a, b) => a - b);
  const selectMovement = sorted ? copyMovements : correctAcc.movements;

  selectMovement.forEach((movement, idx) => {
    const applyDate = sorted
      ? [sortedMovDates[idx].date].map(movDate => movDate.split('T')[0])
      : [movDates[idx].date].map(movDate => movDate.split('T')[0]);

    const formattedDate = applyDate.map(date => date.split('-').join('/'));

    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="recoded__box">
      <label class="recoded__label ${type}">${idx + 1} ${type}</label>
      <span class="recoded__time">${formattedDate}</span>
      <span class="recoded__cash">${currencyFormatted(movement)}원</span>
    </div>
  `;

    recodedAreaEl.insertAdjacentHTML('afterbegin', html);
  });
}

function currencyFormatted(number) {
  const options = { style: 'currency', currency: 'KRW' };
  return new Intl.NumberFormat('ko-KR', options).format(number);
}

function calcBalance(correctAcc) {
  const totalBalance = correctAcc.movements.reduce((acc, cur) => acc + cur, 0);
  currentBalanceEl.textContent = `${currencyFormatted(totalBalance)}원`;
}

function calcDeposits(correctAcc) {
  const deposits = correctAcc.movements.filter(movement => movement > 0);
  const calcDeposits = deposits.reduce((acc, cur) => acc + cur, 0);
  displayInEl.textContent = `${currencyFormatted(calcDeposits)}원`;
}

function calcWithdrawal(correctAcc) {
  const withdrawal = correctAcc.movements.filter(movement => movement < 0);
  const calcOut = withdrawal.reduce((acc, cur) => acc - cur, 0);
  displayOutEl.textContent = `${currencyFormatted(calcOut)}원`;
}

function calcInterest(correctAcc) {
  const { movements, interestRate } = correctAcc;
  const filteredList = movements.filter(x => x > 100);
  const calcMovements = filteredList.reduce((acc, cur) => acc + cur, 0);
  const totalInterest = (calcMovements * interestRate) / 100;
  displayInterestEl.textContent = `${currencyFormatted(totalInterest)}원`;
}

function updateDisplay(correctAcc) {
  calcBalance(correctAcc);
  calcDeposits(correctAcc);
  calcWithdrawal(correctAcc);
  calcInterest(correctAcc);
}

init();
