'use strict';

// Workout은 Running과 Workout의 슈퍼클래스다.
class Workout {
  // this.description에서 사용됨
  date = new Date();

  // 사용자가 클릭한 workout을 구별하기 위해서 사용됨(dataset)
  id = (Date.now() + '').slice(-10);

  // 서브 클래스에 공통적으로 상속하기 위해서 사용한다.
  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }

  // 서브 클래스에 사용하기위한 메서드
  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'];

    // this.type은 Running과 Workout의 public 변수다. 아래의 this들이 사용되는 조건은
    // 서브클래스의 생성자 함수가 호출될때 이고 그 순간은 newWorkout() 메서드 즉, form에서 submit
    // 이 이뤄 질때 호출된다. 그러면 선택받은 서브클래스의 this가 type을 읽고 date를 읽는다(슈퍼클래스에게 상속받았으니까)
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

// Running은 Workout의 서브클래스다.
class Running extends Workout {
  // Running의 public변수다. className의 색깔과 아이콘을 구별할떄 사용한다.
  type = 'running';

  // 상속받은것 외에 cadence 생성자 변수가 있다.
  constructor(coords, distance, duration, cadence) {
    // 상속하기 위해서 반드시 super를 사용한다.
    super(coords, distance, duration);
    this.cadence = cadence;

    // Running의 인스턴스가 new 키워드를 사용해서 Running의 생성자 함수를 호출한다.
    // 그렇게 되면 아래의 calcPace()와 setDescription()은 즉시 호출되어 this.pace와
    // this.description을 구축한다.
    this.calcPace();
    this._setDescription();
  }

  // this.pace라는 결과를 만들기 위해서 this 객체를 조합했다.
  // 왜 this pace를 this.cadence처럼 선언하지 않았는가?
  // 결과값을 계산 하기도 전에 값을 넣어버린다는건 말도 안되니까 그렇다.
  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

// Cycling은 Workout의 서브클래스다.
class Cycling extends Workout {
  // Cycling의 public변수도 html 추가 시, 아이콘과 색을 구별하기 위해서 사용된다.
  // css에서 처리하기로 한 색상 약속과 js에서 삼항연산자로 아이콘 구별을 약속했다.
  type = 'cycling';

  // 상속 3개 객체 외에 elevationGain 추가
  constructor(coords, distance, duration, elevationGain) {
    // super을 이용해서 슈퍼 클래스 객체 상속처리
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    // new Cycling(값,값,값,값) 을 넣어서 Cycling의 생성자 함수 constructor()을 호출하는 순간
    // 아래 메서드 this.calcSpeed()와 this._setDescription() 메서드 2개가 호출되어
    // this.speed 객체와 this.description을 추가로 가지게 된다.

    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// 입력 양식
const form = document.querySelector('.form');

// workout이 아예 없거나 여러개가 있는 경우를 고려하여 workouts를 element로 정했다.
// closest을 이용해서 workout이 있는 경우에 사용자에 입력에 반응에서 movePopup()을
// 이용하기 위해서다. workout을 .querySelectorAll 형태로 잡아둔것보다 더 에러를 피하
// 는데 용이하다. workout이 없으면 애초에 클릭 할 수 없게끔 만들었기 떄문에 잘 계산된 선택.
const containerWorkouts = document.querySelector('.workouts');

// 어떤 타입인지 select option의 value를 받는다.
const inputType = document.querySelector('.form__input--type');

// form의 Distance value
const inputDistance = document.querySelector('.form__input--distance');

// form의 Duration value
const inputDuration = document.querySelector('.form__input--duration');

// form의 Cadence value
const inputCadence = document.querySelector('.form__input--cadence');

// form의 Elevation value
const inputElevation = document.querySelector('.form__input--elevation');

// 클래스 App은 위에 슈퍼클래스(Workout)와 서브클래스(Running & Cycling)를 이용한다.
// 앱의 모든 작동에 관련된 메서드들의 집합이다. DOM element와 상호작용하는 장이다.
class App {
  #map; // leaf의 실제 map UI를 담는 private 변수다. 마커는 #map에 의해서 좌우된다.
  #mapEvent; // leaf의 .on 이벤트 객체를 담는 private 변수다. 좌표는 #mapEvent에 담는다.
  #mapZoomLevel = 13; // leaf의 map의 Zoom정도를 결정하는 역할이다. setView()의 특정 지점에 private 변수가 사용된다.
  #workouts = []; // 추가된 리스트들을 담는 private 변수다.

  constructor() {
    /**
     * 1. new App()을 통해서 클래스 App의 생성자 함수 constructor()을 호출하면 가장먼저 _getPosition 메서드가 호출된다.
     * 1-1. navigator.geolocation API(비동기)함수에 의해서 위치정보를 _loadMap(콜백함수)에 넘긴다. error는 2번쨰 인자에 alert 처리.
     * 2. 실행컨텍스트는 _loadMap()으로 넘어온 상태고 geoAPI에 받은 인자로 콘솔을 출력하면 coords(좌표)를 얻는다.
     * 3. Leaf에서 map을 보여주는 메서드를 사용하고(L:네임스페이스) setView() 메서드에 첫번쨰 인자에는 coords 두번쨰 인자에 #mapZoomLevel
     * 을 넣는다. 일단 .map('map')은 div id='map' 을 의미한다. 그 위치에 내가 얻은 coords(좌표),줌(지도)을 설정하는 것이다.
     * 3-1. 이어서 tileLayer 메서드를 사용해서 지도 정보를 입력하고(leaf 제공) addTo 메서드에 내 정보가 담긴 this.#map을 넣는다.
     * 3-2. 이렇게 앱이 실행되면 내 집 근처의 좌표가 찍히게 된다. 애초에 geoAPI가 내 정보를 position 인자에 넘겨주는 형태로 값을 받아오기떄문이다.
     * 4. 현재 실행컨텍스트에서 this.#map.on('click',메서드)의 'click' 이벤트는 수신대기상태이다.
     * 4-1 클릭 버튼을 누르면 메서드 showForm()이 호출되는데 bind를 사용한다. .bind(this)를 해줘야 App을 가리키고 showForm() 메서드 내부의
     * this도 App으로 유지된다. 그런데 bind를 안써주고 그냥 this._showForm 을 써버리면 그 메서드 안에서의 this 는 this.#map을 가리키게 된다.
     * this._showForm은 this.#mapEvent에 접근해서 showForm메서드가 확보한 라이브러리 전용 mapEvent 객체를 품고있는 상태인데 이벤트를 전달할
     * 객체에 접근이 불가능해진다. 왜냐하면 this.#변수는 App의 private(비공개) 변수들이고 오직 App에서만 접근이 가능하기 떄문인데 bind를 사용하지
     * 않으면 this는 this.#map을 가리키므로 App의 this.#mapEvent에 접근이 불가능하다. 그래서 bind를 써준것이다.
     * 5. 그 아래에 있는 renderWorkoutMarker() 메서드는 나중에 수행되는 메서드인데 App의 생성자 함수 밖에 있는 이유는 특별하다.
     * 5-1. leaf 라이브러리에서 얻는 좌표값은 오직 this.#map에서 얻는다. 그러니까 this.#map이 있는 순간은 _loadMap()메서드가 실행되어서
     * this.#map의 값이 있는 상태고 그 순간에 네임스페이스 L에 대한 정보가 this.#map에 담기기 떄문에 _renderWorkoutMarker() 메서드에서
     * L.marker(workout.coords).addTo(this.#map).bindPopup(....) 와 같은 마커를 만드는데 필요한 L에 접근 할 수 있다.
     * 정리하면 App() 생성자 함수 내부에서 getLocalStorage() 메서드가 호출되어 workout 리스트를 렌더링 하고 this.#workout에 data가 할당되면
     * 그쯤에 _getPosition() 메서드로 인해 _loadMap() 메서드 호출이 되고 아래에 _renderWorkoutMarker() 메서드에 this.#workouts에 정보
     * 에 의해서 coords(좌표)값을 이용해 (work.coords 형태로) L로 시작되는 과정에 연결되어 마커를 만들어 낸다.
     * 6. inputType은 말그대로 type value를 받는다. select에서 option이 변경됨을 감지하는 이벤트가 'change' 이벤트이다. 여기서
     * 6-1. _toggleElevationField() 메서드는 bind 함수를 쓸 필요가 없다. 왜냐하면 이 함수 내부에서 this를 쓸 일이 없기 떄문이다. 
     * 6-2. 여기서 this._toggleElevationField에서 앞에 this. 의미는 그냥 App 클래스 내부에서 메서드를 가지고 오기 위한 규칙이다. 
     * 6-3. 토글 함수 내부로 들어가면 this는 inputType의 DOM element를 가리킨다. 
     * 7. newWorkout에서는 bind(this)함수를 사용했다. 왜냐하면 메서드 내부에서 App을 가리키는 this를 사용하기 위해서다. 즉 App과
     * 연결된 private변수를 사용할 필요가 있다. ==> this.#workouts.push(workout);

     */

    this._getPosition();
    this._getLocalStorage();
    inputType.addEventListener('change', this._toggleElevationField);
    form.addEventListener('submit', this._newWorkout.bind(this));
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () => {
        alert('Could not get your position');
      });
    }
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));
    this.#workouts.forEach(work => this._renderWorkoutMarker(work));
  }

  _showForm(mapE) {
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

    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;

    const validInputs = (...inputs) => inputs.every(inp => isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    let workout;

    if (type === 'running') {
      const cadence = +inputCadence.value;

      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      ) {
        return alert('Inputs have to be positive numbers!');
      }

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      ) {
        return alert('Inputs have to be positive numbers!');
      }

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    this.#workouts.push(workout);

    this._renderWorkout(workout);
    this._renderWorkoutMarker(workout);
    this._hideForm();
    this._setLocalStorage();
  }

  _renderWorkout(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>

    `;

    if (workout.type === 'running') {
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>
      `;
    }

    if (workout.type === 'cycling') {
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>
      `;
    }

    form.insertAdjacentHTML('afterend', html);
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  _hideForm() {
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    form.getElementsByClassName.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;
    this.#workouts = data;
    this.#workouts.forEach(work => this._renderWorkout(work));
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');
    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: { duration: 1 },
    });
  }

  _reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

const app = new App();
