'use strict';

// 89 ~ 91강
// 전역 실행 컨텍스트 - global execution context (for top-level code)
// 전역실행컨텍스트는 오직 단 하나만 존재하며 최상위 코드가 실행된다.

// 내부 실행 컨텍스트
// 1. variable Environment - var, let, const, functions, arguments object
// 2. Scope chain
// 3. this keyword
// 1~3가지는 js 실행 직전에 생성된다.
// 화살표 함수는 this keyword와 arguments 인자를 얻을 수 없습니다

// callstack - 실행컨텍스트가 있는 곳이고 우리의 프로그램 실행부터 어느 위치에 있는지
// 알수 있다. 제일 위에 있는 스텍이 현재 실행 중인 스텍이라고 보면 된다.
// 마지막 실행 컨텍스트를 제일 먼저 처리하고 그 이전에 쌓인 실행 컨텍스트를 처리하는 순서로
// 작업을 처리한다.
// 함수는 자체 실행컨텍스트를 만들고 callstack으로 실행컨텍스트가 옮겨진다.
// 여기서 얻은 함수 실행컨텍스트들은 자바스크립트의 실행 순서가 되어서 하나하나 값을
// 반환하여 return 처리와 함께 해당 함수의 실행컨텍스트가 callstack에서 제거된다.
// callstack이 비워 질 떄까지 이 실행 순서는 계속 유지되고 마침네 Global 컨텍스트
// 만 남았을 떄는 브라우저를 닫지 않는 이상 계속 callstack에 global 실행컨텍스트를 유지함.

// 92강
// Scope chain
// - Scoping
// - Lexical scoping
// - Scope
// - Scope of a variable

// Global Scope
// - top level code 를 의미한다. 변수나 함수나 상관없다.
// - 모든 범위에서 접근 할 수 있다.
// - 함수 또는 블록 외부에 있는 최상위코드를 의미한다.

// Function Scope
// - 함수 내부에서만 접근 할 수 있는 범위다.
// - 로컬 스코프라고 부른다.
// - 전역 스코프에서 함수 내부 변수에 접근 할 수 없다.

// Block Scope (ES6)
// - if문이나 for 루프에서 사용하는 중괄호 범위를 의미한다.
// - 해당 블록 내부에서만 변수에 접근이 가능하다.
// - 오직 let과 const로 만든 블록으로만 적용된다.
// - var를 사용하지 않는다. var는 함수 범위다.

// scope chain
// 전역범위와 함수범위에서 체인을 설명 할 떄, 함수에 중첩되는 스코프가 존재하는 경우
// 가장 안쪽에 존재하는 함수에 글로벌 스코프 변수와 함수 스코프(부모 함수)의 상수 또는
// 변수값을 사용 할 수 있다. 상위 스코프에서 선언된 변수 또는 상수는 하위스코프에 쓸 수 있다.
// 자바스크립트 엔진이 상위 스코프에서 글로벌 스코프까지 거슬러 올라가서 필요한 값을 가져온다.
// 단, 그 반대의 경우는 불가능하다. 하위스코프에서 선언된 변수들은 상위 스코프에서 읽을 수도
// 접근 할 수도 없다는 의미다.
// 하나의 상위 스코프에서 동일한 형제 위치의 스코프가 2개 이상 존재한다면 그 형제 스코프는
// 서로 각각의 스코프를 가지고 있기 때문에 서로 가지고 있는 값들이 접근 할 수 없다.
// ? 함수의 호출 순서는 소코프 체인과 전혀 관련이 없다

// 93강 - 스코프 체인
const calcAge = birthYear => {
  const age = 2037 - birthYear;
  // ? 글로벌 범위기 떄문에 firstName이 출력된다.
  // ! 이것은 스코프 체인으로 값을 찾은 것이다.
  // console.log(firstName);

  const printAge = () => {
    // 스코프 체인을 이용해서 age와 birthYear 값을
    // 상위 스코프인 calcAge 함수 스코프에서 찾았다.
    // firstName 또한 같은 원리로 글로벌 스코프에서 값을 찾는다.
    // ! 하위 스코프에서 동일한 상수 firstName이 있지만
    // ! 스코프는 오직 상위스코프가 있는 방향으로 값을 찾는다
    // ? firstName 이 같은 상수명을 가져도 스코프가 다르기 떄문에 전혀 문제가 없다
    let output = `${firstName} You are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      // var 변수 선언 (함수 스코프)
      var millenial = true;

      // if문 블록 스코프와 글로벌 스코프에 동일한 상수가 있다면
      // ! 스코프는 가장 가까운 스코프의 값을 선택햇 읽어낸다
      const firstName = 'Steven';

      // ? let과 const 사용은 그 자체로 block 스코프를 형성한다.
      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      // ! 상위 스코프의 변수를 재할당하게 되면 상위 스코프 변수의 값을 바꿀 수 있다.
      output = 'NEW OUTPUT!';

      // 상수가 선언되면 값이 상위 스코프 값에 전혀 영향을 미치지 않는다.
      // const output = 'NEW OUTPUT!';

      function add(a, b) {
        return a + b;
      }
    }

    // ! strict 모드에서는 에러가 걸리지만 없으면 호출이 된다!
    // console.log(add(2, 3));

    // millenial은 함수 스코프이기 떄문에 var변수라도 값을 읽어낼 수 있다
    console.log(millenial);

    // ? if 블록 스코프에 의해 변수가 재할당 되었으므로 값이 변경되었다
    console.log(output);

    // ! 따라서 if 문 밖을 벗어나면 str은 레퍼런스 에러가 반드시 발생한다.
    // console.log(str);
  };

  printAge();
  return age;
};

const firstName = 'Jonas';
calcAge(1991);

// age는 조회가 불가능 하다! 스코프 체인은 일방통행이다!
// ! 따라서 오직 내부에서만 외부 범위의 변수에 접근 할 수 있다.
// console.log(age);

// ? 같은 이유로 함수 또한 호출 할 수 없다!
// printAge();

// 94강 - 가변 환경(variable environment)
// 호이스팅
// 1.function 선언 - 호이스팅 되고 함수 스코프인데 엄격모드에서는 블록 스코프다
// 2.var 선언 - 호이스팅 되고 함수 스코프를 가진다.
// 3.let & const 선언
// - 호이스팅 안됨. Block 스코프를 가진다.
// - TDZ란 간단하게 말해서 변수나 상수 선언보다 위에서 데이터에 접근하는 영역을 의미한다.
// 4.function 표현식 및 화살표 함수 - let, const, var 사용에 달려있다.

// 95강
console.log(me); // undefined
// console.log(job); // acess error
// console.log(year); // acess error

// variable 선언
var me = 'Jonas';
let job = 'teacher';
const year = 1991;

// Functions
console.log(addDecl(2, 3));
// console.log(addExpr(2, 3));
// console.log(addArrow(2, 3));

// 호이스팅 작동
function addDecl(a, b) {
  return a + b;
}

// 호이스팅 x, let이나 var로 써도 마찬가지
const addExpr = function (a, b) {
  return a + b;
};

// 호이스팅 x, let이나 var로 써도 마찬가지
const addArrow = (a, b) => a + b;

// Example

// undefined로 인지된다.
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products deleted!');
}

var x = 1;
let y = 2;
const z = 3;

// true
console.log(x === window.x);

// undefined
console.log(window.y);

// undefined
console.log(window.z);

// 96강 - this keyword
// this가 호출되는 경로
// Method - this는 해당 부모 객체다.
// function - undefined
// Arrow function this = this of surrounding function (lexical this)
// Event listener - this = 핸들러 함수가 연결된 DOM 요소다.
// new,call,apply,bind...
// ! this는 함수 자체를 가리키는게 아니다. 또한 변수 환경을 가리키는 것도 아니다.

// 97강 - this
// 글로벌 스코프에서 this는 window 객체(전역)를 얻는다.
console.log(this);

// 일반 함수
// 함수는 자체 this 키워드를 가져온다
function calcAgeFn(birthYear) {
  console.log(2037 - birthYear);
  console.log(this); // undefined
}

calcAgeFn(1991);

// 함수 표현식
// 함수는 자체 this 키워드를 가져온다
const calcAgeEx = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this); // undefined
};

calcAgeEx(1991);

// 화살표 함수
// 화살표 함수는 자체 this 키워드를 가져오지 않는다
// ! 렉시컬 this 키워드를 사용한다. 상위 함수나 상위 범위에서 가져온다.
// ? 화살표 함수의 this는 실제 calcAgeExp의 this 키워드가 아닙니다!
// 여기서는 상위 스코프인 글로벌 스코프의 window 객체를 가져왔다.
const calcAgeExp = birthYear => {
  console.log(2037 - birthYear);
  console.log(this); // window 객체 얻음
};

calcAgeExp(1991);

// jonas라는 객체에 key와 함수 메서드가 있다.
// calcAge 메서드에서 this는 jonas 객체 그룹을 가리키고
// this.year는 year key의 1991을 가리킨다.
const jonas = {
  year: 1991,
  calcAge: function () {
    // 단순히 calcAge의 부모 객체가 jonas여서 jonas가
    // this인 것이 아니고 jonas 객체에서 이 메서드를
    // 호출 했기 떄문에 this가 객체 jonas가 된것이디.
    console.log(this);
    console.log(2037 - this.year);
  },
};

jonas.calcAge();

const matilda = {
  year: 2017,
};

// jonas 객체의 메서드를 matilda로 복사하고 호출한다.
// 이제 this는 jonas가 아니라 matilda고 year도 다르게 계산된다.
matilda.calcAge = jonas.calcAge;
matilda.calcAge();

// f는 객체가 아닌 상수이고 year가 없기 떄문에 에러가 발생한다.
// f는 year의 this를 찾을 수 없다.
// const f = jonas.calcAge;
// f();

// 98강 - this function (일반, 화살표)
const jonasT = {
  firstName: 'JonasT',
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);

    // Solution 1
    // const self = this; // self or that
    // const isMillenial = function () {
    //   console.log(self);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };

    // Solution 2
    // 화살표 함수다. 여기서는 자체 this 키워드 x
    // 이 함수의 상위 스코프는 calcAge 메서드이고 이 메서드의
    // this의 키워드는 jonasT 객체다. 따라서 this 사용이 가능하다
    const isMillenial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };

    isMillenial();
  },

  // 화살표 함수로 작성돤 메서드는 자체 this 키워드를 가져오지않는다
  // 상위 스코프의 this를 가져온다.
  // ! 참고로 객체의 중괄호는 코드 블록이 아니다!
  // ? 스코프를 만들지 않는다! 그저 객체 리터럴이다
  greet: () => {
    console.log(this); // window 객체
    console.log(`Hey ${this.firstName}`); // Hey undefined
  },
};

jonasT.greet();
jonasT.calcAge();

// arguments keyword
// ? arguments는 함수 인수보다 더 많은 인수를 받을 수 있다
const addExprAg = function (a, b) {
  console.log(arguments);
  return a + b;
};

addExprAg(2, 5);
addExprAg(2, 5, 8, 12);

// ! 화살표 함수는 arguments를 쓸수없다.
// ? 일반 함수에서는 이 키워드를 쓸 수 있다.
// const addArrowAg = (a, b) => {
//   console.log(arguments);
//   return a + b;
// };

// addArrowAg(2, 5, 8);

// 99강 - 원시타입 vs 객체타입
let age = 30;
// oldAge는 age가 가리키는 똑같은 메모리 주소를 가리키고 있다.
// 그래서 oldAge는 age의 Address와 같은 value 30을 가진다.
let oldAge = age;

// 변수 재할당으로 age의 Address가 변경되었다.
// 이 변수의 Address의 value는 31이다.
age = 31;
console.log(age); // 31

// oldAge은 age가 재할당 이전의 Address가 가리키는 value값을 그대로 유지한다
// 따라서 value를 30으로 유지한다.
console.log(oldAge); // 30

const mess = {
  name: 'Jonas',
  age: 30,
};

// ! 객체를 복사해서 원본객체(mess)의 key(age)값이 변경되는 것을 막는다.
// ? 얕은 복사 (Shallow Copy)
// const copyMess = { ...mess };
// console.log(copyMess);

// ? 깊은 복사 (Deep Copy)
// const original = {profile: {name:'철수', age:12}, grade: 'A'};
// const clone = JSON.parse(JSON.stringify(original));

// ! structuredClone(깊은 복사 메서드)
// ? 이 메서드는 최근에 생긴 복사를 수행하는 빌트인 함수다.
// 얕은 복사로 리덕스나 리코일 등 상태관리에 있어서 유용해질 전망이다!
// const friend = structuredClone(mess);

// ! friend는 객체 mess와 동알한 메모리 주소를 공유한다!
// ? 주소가 같으므로 friend를 변경하면 mess도 value값이 변경된다!
// ! const에 재할당은 불가능하다! 그러나! 그것은 원시값에만 해당되고 객체는 예외다!
const friend = mess;
friend.age = 27;

// ! 메모리 Heap에서 정확히 동일한 객체를 가리킨 결과
// friend와 mess는 같은 key(age)를 얻는다
console.log('Friend:', friend);
console.log('Me', mess);

// Primitives Types
// Number
// String
// Boolean
// Undefined
// Null
// Symbol
// BigInt

// Reference Types
// Object literal
// Arrays
// Functions
// Many more...

// JS Engine
// - Call Stack : Primitives Types이 Call Stack에 저장된다. (호출된 실행컨텍스트)
// - Heap : Reference Types이 메모리 Heap에 저장된다.

// ! 프리미티브 타입의 변수값(value)은 실제로 메모리 주소(address)를 보유한다.
// ! 객체 타입의 변수값은 CallStack의 Value값을 Heap의 Address에 객체를 저장한다.
// 결론적으로 Heap의 Value는 객체값이 된다. {...}
// 객체를 callStack에 저장하기에는 객체가 너무 커서 Heap에 저장이 매우 유용하다.
// callstack은 객체의 참조를 유지한다. 객체가 실제로 힙에 저장된 위치에 대해서.

// ? 나중에 이어질 부분
// Prototypal Inheritance - OOP with JS
// Event Loop - Async/Await and AJAX
// How the DOM Really Works - Advanced DOM and Events

// 100강 - 원시타입 vs 객체타입
// Primitive types
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName);

// Reference types
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

// 새로운 객체를 생성한 것 처럼 보이지만 사실은 Heap의 새로운 객체가 아니다.
// marriedJessica는 callstack의 또 다른 변수이다. 원래 객체에 대한 참조를 가진다.
// jessica와 marriedJessica는 Heap의 동일한 메모리 주소(Address)를 가리킨다.
// 둘 다 동일한 메모리 주소 참조를 보유한다.
const marriedJessica = jessica;

// 상수 const marriedJessica에서 변경되는 유일한 것은 객체이다.
// Heap에 객체가 저장된다. 이것은 const나 let과 관련이 없다.
// 원시값이 아니므로 재할당이 아니다. 스텍의 값이 변경된 것이 재할당이다.
marriedJessica.lastName = 'Davis';
console.log('Before marriage:', jessica);
console.log('After marriage: ', marriedJessica);

// 이 의미는 메모리의 주소가 달라진다는 뜻이다.
// Heap메모리의 다른 위치에 저장된다.
// 따라서 기존의 메모리의 해당 위치에 대한 참조를 바꾸는 것이므로
// 변수를 바꿔여 되기 떄문에 marriedJessica는 작동하지않는다.
// 즉, 새로운 메모리 주소로 변경할 수 없다.
// ! 단, let marriedJessica = jessica 형태라면 아래와 같은 재할당이 가능하다.
// marriedJessica = {};
// console.log(marriedJessica);

// Copying objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
  lee: {
    job: '개발자',
    age: 31,
  },
};

// ? 얕은 복사
// const jessicaCopy = Object.assign({}, jessica2);
// const jessicaCopy = { ...jessica2 };

// ? 깊은 복사
// const jessicaCopy = JSON.parse(JSON.stringify(jessica2));
const jessicaCopy = structuredClone(jessica2);

jessicaCopy.lastName = 'Davis';
jessicaCopy.age = 30;

// 얕은 복사는 객체의 key와 value을 복사하지만
// family 처럼 내부에 또 깊이(배열)가 존재하면 복사가 되지않는다.
// ! 깊은 복사를 사용하면 원본괴 복사본의 값의 차이가 명확하게 반영된다.
jessicaCopy.lee.job = '수학자';
jessicaCopy.lee.age = 28;
jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

console.log('Before marriage:', jessica2);
console.log('After marriage: ', jessicaCopy);
