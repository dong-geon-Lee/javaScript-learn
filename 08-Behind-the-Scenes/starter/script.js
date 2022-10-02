'use strict';

// 89 ~ 91강
// 전역 실행 컨텍스트 - global execution context (for top-level code)
// 전역실행컨텍스트는 오직 단 하나만 존재하며 최상위 코드가 실행된다.

// 내부 실행 컨텍스트
// 1. variable Environment - var, let, const, functions, arguments object
// 2. Scope chain
// 3. this keyword
// 1~3가지는 js 실행 직전에 생성된다.
// ! 화살표 함수는 this keyword와 arguments 인자를 얻을 수 없습니다

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

// 93강
const calcAge = birthYear => {
  const age = 2037 - birthYear;
  // ? 글로벌 범위기 떄문에 firstName이 출력된다.
  // ! 이것은 스코프 체인으로 값을 찾은 것이다.
  // console.log(firstName);

  const printAge = () => {
    // 스코프 체인을 이용해서 age와 birthYear 값을
    // 상위 스코프인 calcAge 함수 스코프에서 찾았다.
    // firstName 또한 같은 원리로 글로벌 스코프에서 값을 찾는다.
    const output = `${firstName} You are ${age}, born in ${birthYear}`;
    console.log(output);

    //
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
