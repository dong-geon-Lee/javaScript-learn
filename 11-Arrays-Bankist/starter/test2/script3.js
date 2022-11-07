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
    console.log('hey');
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

function authUser() {
  const checkUser = inputUser.value;
  const checkPin = +inputPin.value;
  const correctAcc = accounts.find(
    account => account.owner === checkUser && account.pin === checkPin
  );

  return correctAcc;
}

function renderRecoded(correctAcc) {
  correctAcc.movements.forEach((movement, idx) => {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="recoded__box">
      <label class="recoded__label ${type}">${idx + 1} ${type}</label>
      <span class="recoded__time"></span>
      <span class="recoded__cash">${movement}€</span>
    </div>
  `;

    recodedAreaEl.insertAdjacentHTML('afterbegin', html);
  });
}

function calcBalance(correctAcc) {
  const totalBalance = correctAcc.movements.reduce((acc, cur) => acc + cur, 0);
  currentBalanceEl.textContent = `${totalBalance}€`;
}

function calcDeposits(correctAcc) {
  const deposits = correctAcc.movements.filter(movement => movement > 0);
  const calcDeposits = deposits.reduce((acc, cur) => acc + cur, 0);
  displayInEl.textContent = `${calcDeposits}€`;
}

function calcWithdrawal(correctAcc) {
  const withdrawal = correctAcc.movements.filter(movement => movement < 0);
  const calcOut = withdrawal.reduce((acc, cur) => acc - cur, 0);
  displayOutEl.textContent = `${calcOut}€`;
}

function calcInterest(correctAcc) {
  const { movements, interestRate } = correctAcc;
  const filteredList = movements.filter(x => x > 100);
  const calcMovements = filteredList.reduce((acc, cur) => acc + cur, 0);
  const totalInterest = (calcMovements * interestRate) / 100;
  displayInterestEl.textContent = `${totalInterest}€`;
}

function updateDisplay(correctAcc) {
  calcBalance(correctAcc);
  calcDeposits(correctAcc);
  calcWithdrawal(correctAcc);
  calcInterest(correctAcc);
}

init();
