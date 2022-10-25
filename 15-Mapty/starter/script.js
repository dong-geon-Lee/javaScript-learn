'use strict';

// ! 231강 - 웹 프로젝트를 계획하는 방법

// 1. User stories - Description of the application's functionality from the user's perspective.
// - Who? : As a [type of user]
// - What? : I want [an action]
// - Why? : so that [a benefit]
// 1-1. 필요한 데이터를 정의하라.
// ex) running: location,distance,time,pace and steps/minute (cadence)
// ex) cycling: location, distance, time, speed and elevation gain
// 1-2. 데이터 아키텍처 (236강 - 2분 10초 부분 확인) 만들기 (상속 관계도)
// 부모 클래스와 자식 클래스의 변수 구조 및 생성자 함수 관계도를 박스로 표현

// 2. Features - 지금은 기능에 대해서 생각하지 맙시다
// 3. Flow-chart - WHAT we will build - 간단하게 스케치를 한다. 절대로 전체에 매달리지마라
// 4. Architecture - HOW we will build it - 데이터를 관리하는 방법

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng] 위도, 경도
    this.distance = distance; // in km
    this.duration = duration; // in min
  }
}

class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }

  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1, cycling1);

///////////////////////////////////////////////////////////
// Application ARCHITECTURE
class App {
  // private keyword setting
  #map;
  #mapEvent;

  // 클래스에서 새로운 객체가 생성될 떄 생성자 함수는 즉시 호출됩니다.
  constructor() {
    console.log(this, '{}');
    console.log('즉시 호출');
    this._getPosition();

    // 항상 실제로 반복되는 작업 중에 하나이다.
    // bind로 감싸지 않으면 this는 form 요소를 가리키기 때문이다.
    form.addEventListener('submit', this._newWorkout.bind(this));

    // 여기서 this는 inputType을 가리키며 this가 App일 이유가 없어서 bind 사용안함.
    inputType.addEventListener('change', this._toggleElevationField);
  }

  // todo bind를 사용했다는걸 인지할것
  // 일반 함수에서 this 는 undefined 다.
  // getCurrentPosition()은 일반 함수처럼 작동했기 떄문에
  // this를 bind로 감싸서 this를 설정해야 합니다.
  // bind는 단순히 새로운 함수를 반환합니다.
  // 그래서 우리는 "loadMap" 메소드 내부의 "this" 키워드를 새로 생성된 객체 "app"에
  // 바인딩하는 것을 의미하는 "this._loadMap.bind(this)"를 사용합니다.
  _getPosition() {
    console.log(this, 'bind 이전 App의 this');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        }
      );
    }
  }

  // ? getCurrentPosition() 함수는 객체 GeolocationPosition
  // ? 을 _loadMap 함수에 전달합니다. 따라서 인자 positon를 콘솔로
  // ? 찍어보면 객체를 조회할 수 있습니다.
  _loadMap(position) {
    console.log(position, 'po');
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    // Leaflet 라이브러리에서 제공하는 L 네임스페이스는 매우 다양한 기능들을 제공한다. (L은 전역변수이다)
    // {Browser: {…}, CRS: {…}, Bounds: ƒ, Canvas: ƒ, Circle: ƒ, …}
    // setView는 배열을 받는다([경도,위도])
    // 숫자가 높아질수록 지도가 더 확대된다.
    // 상수 map에 이벤트 리스너를 추가 할 수있다.
    this.#map = L.map('map').setView(coords, 13);

    // 방대한 메서드들을 확인 할 수 있다.
    console.log(this.#map);

    // tileLayer : 지도의 타일을 실제로 정의해야 하는 위치
    // openstreetmap 오픈소스
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // 라이브러리 leaflet 메서드 on()
    // addEventListener()를 대신하고 있다.
    // 여기서 on은 addEventListener와 동등하다.
    // Handling clicks on map
    console.log(this, '왜?');
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    // 왜 mapE 인자가 this.#mapEvent가 된걸까??
    console.log(this, '디스');
    // ! mapE 매개변수가 왜 this.#mapEvent 를 가리키는 거지?
    // ? this.#map 에서 .on 이벤트로 이어지는 리스너를 사용할 경우
    // ? 마치 e.preventDefault() 사용하듯이 이벤트 객체를 메서드에 전달
    // ? 해줄수 있는데, 여기 leaflet 라이브러리에서 사용할 떄는 매개변수 mapE가
    // ? 동일한 역할을 해주고 있다. 그래서 처음에 아무것도 할당되어 있지 않았던
    // ? this.#mapEvent가 on 이벤트리스너에 의해서 얻어진 이벤트 객체에 의해
    // ? 할당 받음으로서 전역 변수인 this.#mapEvent는 값을 할당받게된다.
    console.log(mapE, '맵이');
    console.log(this.#mapEvent, '#map');
    // ! 할당 안하면 142번 줄에서 this.#mapEvent를 읽지 못한다.
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();
    // console.log(this);
    // Clear input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    console.log(e, 'event');
    console.log(this, 'this');
    console.log(this.#map);
    const { lat, lng } = this.#mapEvent.latlng;
    console.log(lat, lng); // 위치 / 경도

    // 1. L.marker() : 마커를 지도에 추가합니다 (위치와 경도를 넣는다)
    // 2. addTo() : marker를 지도에 추가합니다.(상수 map의 위치정보를 넣는다)
    // 3. bindPopup : 팝업을 생성하는 메서드이다. (문자열 및 객체를 넣는다)
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('Workout')
      .openPopup();
  }
}

const app = new App();
console.log(app);
