'use strict';

// ! 206 강 - OOP
// OOP란 무엇인가?
// OOP에서 객체는 자체 포함된 코드 조각이다.
// 함수형 프로그래밍으로 만들어진 프로젝트와 OOP로 만들어진 프로젝트
// OOP의 4가지 패턴 추상화,캡슐화,상속,다형성

// ! 207 강 - OOP in JS
// 각 객체는 프로토타입을 가지고 있다. OOP in JS: 프로토타입
// 모든 객체는 프로토타입의 속성과 메서드를 사용할 수 있다.
// 이를 프로토타입 상속이라고 한다. 따라서 기본적으로 객체는 메서드와
// 속성을 상속받는다.
// ? 클래스의 상속과는 다르다 클래스는 인스턴스를 만든다.(blueprint)
// 클래스는 인스턴스에 복사된 메서드를 건내주지만 객체는 자신의 메서드를
// 프로토타입에 위임한다. 예를 들어 map 함수를 쓸 수 있는건 프로토타입
// 상속 때문이다. 정확히 Array.prototype.map()에 명시 되어있다.
// ? Array.prototype은 객체다. 프로토타입에서 메서드들이 정의되는데
// map,concat,length ... 확인 할 수 있다.
// todo num은 배열은 Array.prototype에 연결되어 있음을 의미한다.
// 즉 상수 num은 map 메소드를 상속받는다. 그래서 사용가능하다.
const num = [1, 2, 3];
console.log(num.map(v => v * 2));
// 3 ways of implementing prototypal inheritance in javascript
// 1. constructor functions
// 2. ES6 Classes
// 3. Object.create()

// ! 208 강 - 생성자 함수 및 new 연산자
// 생성자 함수는 실제로 자바스크립트의 기능이 아니다.
// 생성자 함수의 첫문자는 대문자로 시작된다.
// ? new 키워드는 함수를 호출하는 역할을 한다.
// 1. New 키워드는 빈 객체 {} 를 생성한다.
// 2. New 키워드는 함수를 호출한다. (여기서 this 키워드가 설정된다)
// this 키워드는 방금 만들어진 빈 객체 {} 와 같다.
// 3. 이 새로 생성된 객체가 프로토타입에 연결된다.
// 4. 생성자 함수가 자동적으로 빈 객체 {} 로 반환된다.
// todo 작동과정 정리하기
// todo 1) new 키워드를 이용해서 생성자 함수 Person을 호출합니다.
// todo 2) 빈 객체(===this)가 생성되고 생성자 함수가 호출됩니다.
// todo 3) 객체 내부에서 this를 이용해서 속성을 만듭니다. (관습은 속성명과 매개변수명을 일치시킴)
// todo 4) new Person의 결과로 2개의 객체를 지닌 생성자 함수가 반환됩니다.
// todo 5) 생성자 함수의 인스턴스 객체를 만들 수 있습니다. (클래스에서 생성된 객체를 인스턴스라고 합니다)
const Person = function (firstName, birthYear) {
  console.log(this); // 생성자함수 이름과 함께 빈 객체 {}가 조회된다.
  // 인스턴스 속성이라 불린다.
  this.firstName = firstName;
  this.birthYear = birthYear;

  // !생성자 함수 내부에서 this로 메서드를 만들지 마시오!!!
  // 코드 유지보수 측면에서 인스턴스가 1000개가 있다면 이 메소드도
  // 1000개가 만들어져서 복사되기 떄문이다.
  // this.calcAge = function() {
  //   console.log(2037 - this.birthYear);
  // }
};

const jonas = new Person('jonas', 1991);
console.log(jonas);
console.log(jonas.firstName);
console.log(jonas.birthYear);
console.log(jonas instanceof Person);

const matilda = new Person('Matilda', 2017);
console.log(matilda);
console.log(matilda instanceof Person);

const jay = 'house';
console.log(jay instanceof Person);

// ! 209 강 - 프로토타입
// 1. Every function in JS will automatically have an property called prototype, which includes constructor function

// Note1: Function in JS is essentially an object, so that it can have property

// Note2: Constructor functions have NO difference with other regular functions until we invoke a constructor function with new keyword

// 2. prorotype is a property on function which contains all the useful properties that will be inherited by it's instance

// 3. Every object created by a constructor function will be able to get access to all the methods and properties that set on the prototype of the constructor function

// 4. By this way, we don't need to set the method on every object. Instead, we only set the method once on the prototype of constructor function. Then all the object created by this constructor function will have access to that method

// __proto__

// 1. Every object in JS have a property called __proto__

// 2. The __proto__ property of object is essentially the prototype property of the constructor function that create the object

// 3. In other words, __proto__ of object is as same as prototype of function which creates that object

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// Prototype
console.log(Person.prototype);

jonas.calcAge();
matilda.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(matilda));
console.log(Person.prototype.isPrototypeOf(Person));

Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species);

console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('birthYear'));
console.log(jonas.hasOwnProperty('species'));

// ! 210 강 - 프로토타입 상속과 체인
// 1. 생성자 함수를 만든다 [Person()]
// 2. 생성자 함수의 프로토타입에 calcAge() 메서드를 추가한다.
// 2-1. protoType.constructor와 같이 메서드가 추가된다.
// 3. new 연산자는 빈 객체를 만들고 생성자 함수 호출시 this 키워드가 빈 객체에 적용된다.
// 4. 새로운 객체는 생성자 함수의 프로토타입 속성__proto__ 에 연결된다.
// 자바스크립트의 객체에서 해당 메서드가 없으면 생성자 함수의 프로토타입을 조사합니다.
// 위의 jonas 객체는 calcAge 메서드를 프로토타입으로부터 상속받았다.
// ! 가장 중요한 것은 모든 객체 자체에 직접 만들 필요없이 calcAge()
// ! 메소드를 호출 할 수 있다는 것이다. 코드 성능에 필수적이다.
// ? 이 특성이 프로토타입 체인이라도 한다.
// 최상위 프로토타입 [Object.prototype]
// 상위 프로토타입 [Person.prototype]
// 하위 프로토타입 [jonas]
// ! jonas에서 hasOwnProperty()라는 메소드가 없기 떄문에 자바스크립트는 마치
// ! 스코프처럼 상위 프로토타입에서 메소드를 찾고 없으면 최상위 프로토타입까지 거슬러
// ! 올라가서 해당 메서드를 찾아낸다. 그리고 jonas에서 hasOwnPrototype() 을 쓴다.
// 부모를 두고 있는 프로토타입 표시 __proto__
// jonas객체의 부모 프로토타입은 Person.prototype이다
console.log(jonas.__proto__ === Person.prototype);
