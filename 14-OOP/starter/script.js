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

// ! 211 강 - 프로토타입 built-in object
// Person 생성자 함수
console.log(jonas.__proto__);

// 최상위 프로토타입 (Object.proptotype)
console.log(jonas.__proto__.__proto__);

// null이 나온다. 이 위의 프로토타입이 없으므로
console.log(jonas.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

// 배열의 부모 프로토타입을 콘솔로 조회하면
// concat, fill, find, map 등등 배열 메서드들이 나열된다.
// 그래서 사용이 가능했던 것이다. 배열은 메서드를 상속한다.
// 배열 리스트를 만들 때마다 실제로 배열 생성자(new Array)에 의해 생성되는 것과 같다.

const arr = [3, 6, 6, 5, 6, 9, 9]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

// 최상위 프로토타입 (Object.proptotype)을 가진다.
console.log(arr.__proto__.__proto__);

// 모든 배열은 배열 생성자의 프로토타입 속성에 있다
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

// DOM에는 6~7단계의 거대한 프로토타입 체인으로 연결되어 있다
const h1 = document.querySelector('h1');
console.dir(h1);

// ! 212 강 - 코딩 test
// test 파일 확인하기.

// ! 213 강 - ES6 Class
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  // PersonCl.prototype.greet = function () {
  //   console.log(`Hey ${this.fullName}`);
  // };
  // 프로토타입으로 만든 것과 정확히 같이 동작한다.
  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  // get의 사용
  get age() {
    return 2000 - this.birthYear;
  }

  // set의 사용
  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name!`);
    }
  }

  get fullName() {
    return this._fullName;
  }

  hey() {
    console.log('OOP 오늘 꼭 할 수 있다');
  }

  static hey() {
    console.log('Hey there');
    console.log(this);
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.greet();
jessica.calcAge();
console.log(jessica.__proto__ === PersonCl.prototype);

console.log(jessica.age);
console.log(jessica.fullName);
jessica.fullName = 'lee dongGun';
console.log(jessica.fullName);

const walter = new PersonCl('Walter White', 1965);

// 1. Classes are NOT hoisted (클래스는 호이스팅 되지 않는다)
// 2. Class are first-class citizes (함수에 반환 및 전달할 수 있다)
// 3. Classes are executed in strict mode (엄격 모드에서 실행된다)

// ! 214 강 - Setter & Getter
// setter와 getter는 기본적으로 함수다.
// class도 동일한 방식으로 작동한다.
const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get lastest() {
    return this.movements.slice(-1).pop();
  },

  // set에서는 매개변수가 1개 이상은 있어야 된다.
  set lastest(mov) {
    this.movements.push(mov);
  },
};

// 메서드 앞에다가 get을 사용하면 속성자까지만 작성해도 함수가 호출된다.
console.log(account.lastest);

// set을 사용하고 싶으면 메서드에 값을 할당한다. (set의 동작 방식)
account.lastest = 50;

// 확인결과 리스트에 새로운 배열이 추가되었다.
console.log(account.movements);

// ! 215 강 - Static Methods
// Person.hey = function () {
// ? 클래스 PersonCl에서 직접 메서드를 호출하는 방법으로
// ? 정적 메서드가 사용 된다. walter와 같은 인스턴스는
// hey 메서드 앞에 static이 붙어있으면 이름이 같아도
// 읽을 수 없다. 따라서 static이 없는 다른 메서드를 읽는다.(hey)
PersonCl.hey();
walter.hey();

// ! 216강 - Object create
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// Object.create() 메서드를 이용해서 객체의
// 프로토타입을 수동으로 설정할 수 있다.
// 프로토타입 상속을 구현하는 방법이다.(실제로는 적게 쓰이는 기법)
const steven = Object.create(PersonProto);
console.log(steven);
steven.birthYear = 2022;
steven.calcAge();
console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

// ! 217강 - class 코딩 테스트

// ! 218강 - 클래스 간의 상속 : 생성자 함수
const PersonJS = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

PersonJS.prototype.calcAge = function () {
  console.log(2027 - this.birthYear);
};

// 자식 클래스에서 추가 속성을 만든다.
const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes (상속)
Student.prototype = Object.create(PersonJS.prototype);

// 절대 작동하지 않는다!!
// Student.prototype = PersonJS.prototype

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge();
console.log(mike);
console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);
console.log(mike.__proto__.__proto__.__proto__);
console.log(mike instanceof Student);
console.log(mike instanceof PersonJS);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

// ! 219강 - 코딩 테스트

// ! 220강 - 클래스 상속 ES6

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Always needs to happen first!
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  // 메서드명이 같은 경우(부모 메서드랑) 다형성에 의해서 새로 오버라이드가 되어 덮어쓰기 됨.
  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
console.log(martha);

martha.introduce();
martha.calcAge();
