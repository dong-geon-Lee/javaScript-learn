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
const movementsEl = document.querySelector('.banking__recoded-box');
const inEl = document.querySelector('.in__number');
const outEl = document.querySelector('.out__number');
const interestEl = document.querySelector('.interest__number');
const userLoginBtn = document.querySelector('.user__login');
const inputUserEl = document.querySelector('.input__user');
const inputPinEl = document.querySelector('.input__pin');
const transferEl = document.querySelector('.transfer__send');
const transferInput = document.querySelector('.transfer__input');
const transferAmountInput = document.querySelector('.amount__input');
const balanceEl = document.querySelector('.current__balance');
const closeAccountBtn = document.querySelector('.close__send');
const closeInput = document.querySelector('.close__input');
const closePinInput = document.querySelector('.close__input-pin');
const loanAccountBtn = document.querySelector('.request__send');
const loanInput = document.querySelector('.loan__input');
const sortBtn = document.querySelector('.sort__btn');

let userData = '';
let sorted = false;

sortBtn.addEventListener('click', () => {
  sorted = !sorted;
  updateUI(userData?.movements, userData?.interestRate, sorted);
});

const displayMovements = (movs, sorted = false) => {
  movementsEl.innerHTML = '';

  const movList = [...movs];
  const mov = sorted ? movList.sort((a, b) => a - b) : movs;

  mov.forEach((mov, i) => {
    const type = `${mov > 0 ? 'deposit' : 'withdraw'}`;

    const createMovements = `
    <div class="banking__movments">
      <div>
        <label class="${type}">${i + 1} ${type}</label>
        <span class="deposit__time"></span>
      </div>
      <p class="deposit__recode">${mov}€</p>
    </div>`;

    movementsEl.insertAdjacentHTML('afterbegin', createMovements);
  });
};

const displayBalance = movs => {
  const balance = movs?.reduce((acc, cur) => acc + cur, 0);
  document.querySelector('.current__balance').textContent = `${balance}€`;
};

const displayAccountStatus = (movs, rate) => {
  let curIn = 0;
  let curOut = 0;

  movs?.forEach(mov => (mov > 0 ? (curIn += mov) : (curOut += mov)));

  const interestList = movs
    ?.filter(mov => mov > 100)
    .map(list => list * rate * 0.01)
    .reduce((acc, cur) => acc + cur, 0);

  inEl.textContent = `${curIn}€`;
  outEl.textContent = `${curOut}€`;
  interestEl.textContent = `${interestList}€`;
};

const updateUI = (movements, interestRate, sorted) => {
  displayMovements(movements, sorted);
  displayBalance(movements);
  displayAccountStatus(movements, interestRate);
};

accounts.forEach(acc => {
  acc.username = acc.owner
    .split(' ')
    .map(name => name[0])
    .join('')
    .toLowerCase();
});

const checkUserAccount = () => {
  console.log(accounts);

  const userName = inputUserEl.value;
  const userPin = Number(inputPinEl.value);

  const user = accounts.find(
    acc => acc.username === userName && acc.pin === userPin
  );

  user
    ? containerEl.classList.remove('hidden')
    : containerEl.classList.add('hidden');

  inputUserEl.value = '';
  inputPinEl.value = '';

  updateUI(user?.movements, user?.interestRate);
  currentUserData(user);
};

const currentUserData = user => {
  userData = user;
};

console.log(accounts);

userLoginBtn.addEventListener('click', checkUserAccount);

transferEl.addEventListener('click', () => {
  console.log(accounts);
  console.log(userData);

  // 로그인 시, 현재 유저
  const currentUser = userData;

  // 자기 자신에게 돈을 보내는지 검사하기 (중복체크)
  const checkUser = currentUser.username !== transferInput.value;

  // 돈을 보낼 유저가 존재하는지 검사하기
  const sendToUser = accounts.find(acc => acc.username === transferInput.value);

  console.log(checkUser);
  console.log(sendToUser);

  // 현재 유저의 계좌 총액
  const curUserBalance = balanceEl.textContent;
  const totalBalance = Number(curUserBalance.split('€')[0]);

  // 보내는 돈이 계좌보다 적은지 검사하기
  const transferAmount = Number(transferAmountInput.value);
  const amountCheck = totalBalance >= transferAmount;

  if (currentUser && checkUser && sendToUser && amountCheck) {
    currentUser.movements.push(-transferAmount);
    sendToUser.movements.push(transferAmount);
    updateUI(currentUser.movements);
  } else {
    console.log('조건 불일치');
  }

  // 초기화
  transferInput.value = '';
  transferAmountInput.value = '';
});

loanAccountBtn.addEventListener('click', () => {
  const loanAmout = Number(loanInput.value);
  console.log(loanAmout, 'request');

  console.log(userData, '현재 유저');
  userData.movements.push(loanAmout);
  updateUI(userData?.movements, userData?.interestRate);
  loanInput.value = '';
});

closeAccountBtn.addEventListener('click', () => {
  console.log('클릭', accounts);

  let removeUser = closeInput.value;
  let userPin = Number(closePinInput.value);

  console.log(removeUser, userPin);

  const targetAccount = accounts.findIndex(
    acc => acc.username === removeUser && acc.pin === userPin
  );

  if (accounts[targetAccount].username === removeUser) {
    containerEl.classList.add('hidden');
    accounts.splice(targetAccount, 1);
  } else {
    accounts.splice(targetAccount, 1);
  }

  closeInput.value = '';
  closePinInput.value = '';
});

/** 내가 생각하는 요구조건
 * 1. 위 데이터를 이용해서 account의 Deposit과 Withdrawal을 렌더링 하세요.
 * 2. 우측에 있는 account1 데이터의 계좌 총액을 표시하세요.
 * 3. 렌더링된 account1의 결과값을 하단 IN OUT INTEREST에 표시하세요.
 * 4. 로그인 정보를 만드세요. user와 PIN 번호가 일치 할 때, 화면이 표시되도록 만드세요.
 * 5. 전체 accounts 기준으로 재배치 하세요. 로그인 마다 다른 데이터값들이 렌더링 되어야 됩니다.
 * 6. transfer money 패널에서 다른 유저에게 돈을 보내세요. 이떄, 상태변경 된 사항이 화면에 반영이 잘되어야됩니다.
     - 돈을 보낼 대상인 유저 이름이 존재하는가?
     - 자기 자신에게 돈을 보내고 있는지(중복체크)?
     - 현재 로그인 된 유저는 계좌에 있는 돈이 보낼 돈보다 충분한가?
     - 보낸 돈 만큼 현재 계좌에서 금액이 차감되었는가?
     - 보낸 돈 만큼 movements 리스트가 반영되었는가? (withdrawal 보낸 금액)
     - 보낸 유저로 로그인 해서 결과값이 제대로 반영되었는가? (deposit 받은 금액)
 * 7. request loan 패널에서 대출을 받아서 계좌를 증가시키는 로직을 구현하세요. (대출 받은 금액의 1%를 INTEREST에 합해주기 )
 * 8. close account 패널에서 계정 삭제 로직을 구현하세요.
 * 9. SORT 버튼을 누르면 내림차순으로 데이터가 정렬되게 구현하세요.
 */

// let myName = 'lee';
// let age = 31;

// /**
//  * @type {string | number}
//  * @params {string} `myName` 사람 이름
//  * @params {number} `age` 나이
//  * @return 두개 합쳐서 문자로 반환함
//  * @example testFn() === 'lee31'
//  * @todo 내일까지 생성 기능 마저  구현하기 `하이 라이팅 !!! `
//  */
// const testFn = (myName, age) => {
//   return myName + age;
// };

// console.log(testFn(myName, age));
// testFn(myName, age);// Data
