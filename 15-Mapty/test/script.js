'use strict';

class Workout {
  id = Math.floor(Math.random() * 10000 + 1);
  date = new Date();
  clicks = 0;

  constructor(distance, duration, coords) {
    this.distance = distance;
    this.duration = duration;
    this.coords = coords;
  }

  click() {
    clicks++;
  }

  _setDescription() {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const month = new Date();

    this.description = `${
      this.type.slice(0, 1).toUpperCase() + this.type.slice(1)
    } on ${monthNames[month.getMonth()]} ${month.getDate()}`;
  }
}

class Running extends Workout {
  type = 'running';

  constructor(distance, duration, coords, cadence) {
    super(distance, duration, coords);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';

  constructor(distance, duration, coords, elevationGain) {
    super(distance, duration, coords);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const mapContainer = document.querySelector('#map');

class App {
  #map;
  #mapEvent;
  #mapZoomLevel = 13;
  #workouts = [];

  constructor() {
    this._getPosition();

    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () => {
      alert('Error');
    });
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];
    console.log(coords);
    // this.#mapEvent.latlng;
    console.log(this.#mapEvent, '골떄리네');
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // this.#mapEvent = this.#map;

    this.#map.on('click', this._showForm.bind(this));

    const datas = JSON.parse(localStorage.getItem('workouts'));

    datas.map(data => {
      const type = data.type === 'running' ? 'running' : 'cycling';
      const typeData = data.type === 'running' ? true : false;

      let html = ` 
      <li class="workout workout--${type}" data-id="${data.id}">
        <h2 class="workout__title">${data.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${typeData ? '🏃‍♂️' : '🚴‍♀️'}</span>
          <span class="workout__value">${data.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${data.duration}</span>
          <span class="workout__unit">min</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${
            typeData ? data.cadence : data.elevationGain
          }</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">${typeData ? '🦶🏼' : '⛰'}</span>
          <span class="workout__value">${
            typeData ? data.pace.toFixed(1) : data.speed.toFixed(1)
          }</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>
      `;

      form.insertAdjacentHTML('afterend', html);

      L.marker(data.coords)
        .addTo(this.#map)
        .bindPopup(
          L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `${type}-popup`,
          }).setContent(`${data.description}`)
        )
        .openPopup();
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    console.log(this.#mapEvent, '현상태');

    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    inputDistance.value = '';
    inputDuration.value = '';
    inputCadence.value = '';
    inputElevation.value = '';

    form.classList.add('hidden');
    setTimeout(() => {
      form.style.display = 'grid';
    }, 1000);
  }

  _toggleElevationField() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();

    let result = false;
    const inputList = [...document.querySelectorAll('.form__row')];

    inputList.forEach(inp => {
      const formHidden = inp.classList.contains('form__row--hidden');
      const formType = inp
        .closest('.form__row')
        .querySelector('.form__input--type');

      if (formHidden || formType) return;

      const inputs = inp.querySelectorAll('.form__input');

      inputs.forEach(input => {
        if (+input.value <= 0) {
          alert('0보다 커야됩니다!');
          result = false;
          return;
        }

        if (input.value === '') {
          alert('모든 필드를 채워주세요!');
          input.focus();
          result = false;
          return;
        }

        result = true;
      });
    });

    console.log(result);

    // todo 1. 유효성 검사 Completed!
    // 1-1 : 모든 입력이 적용되었는지 .
    // 1-2 : 모든 입력이 0보다 큰지.

    // todo 2. 새로운 작업 리스트 추가
    // ! 2-1: #workouts = []; 에 추가하기
    // 2-2: 로컬스토리지에 저장하기
    // 2-3: 생성자를 이용하기

    console.log(this.#map);
    console.log(this.#mapEvent);

    const { lat, lng } = this.#mapEvent.latlng;
    const coords = [lat, lng];
    console.log(coords);

    const type = inputType.value === 'running' ? 'running' : 'cycling';

    if (inputType.value === 'running' && result) {
      const running = new Running(
        +inputDistance.value,
        +inputDuration.value,
        coords,
        +inputCadence.value
      );

      console.log(running);
      this.#workouts.push(running);

      console.log(this.#workouts);

      L.marker(coords)
        .addTo(this.#map)
        .bindPopup(
          L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `${type}-popup`,
          }).setContent(`${running.description}`)
        )
        .openPopup();

      let htmlRunning = ` 
      <li class="workout workout--running" data-id="${running.id}">
        <h2 class="workout__title">Running on Aprill 14</h2>
        <div class="workout__details">
          <span class="workout__icon">🏃‍♂️</span>
          <span class="workout__value">${running.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${running.duration}</span>
          <span class="workout__unit">min</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${running.cadence}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${running.pace.toFixed(1)}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>
      `;

      form.insertAdjacentHTML('afterend', htmlRunning);
    }

    if (inputType.value === 'cycling' && result) {
      const cycling = new Cycling(
        +inputDistance.value,
        +inputDuration.value,
        coords,
        +inputElevation.value
      );

      console.log(cycling);
      this.#workouts.push(cycling);
      L.marker(coords)
        .addTo(this.#map)
        .bindPopup(
          L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `${type}-popup`,
          }).setContent(`${cycling.description}`)
        )
        .openPopup();

      let htmlCycling = `
    <li class="workout workout--cycling" data-id="${cycling.id}">
      <h2 class="workout__title">Cycling on April 5</h2>
      <div class="workout__details">
        <span class="workout__icon">🚴‍♀️</span>
        <span class="workout__value">${cycling.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${cycling.duration}</span>
        <span class="workout__unit">min</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${cycling.elevationGain}</span>
        <span class="workout__unit">km/h</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⛰</span>
        <span class="workout__value">${cycling.speed.toFixed(1)}</span>
        <span class="workout__unit">m</span>
      </div>
    </li>
    `;

      form.insertAdjacentHTML('afterend', htmlCycling);
    }

    this._hideForm();

    localStorage.setItem('workouts', JSON.stringify(this.#workouts));

    // 3. 작업 리스트 렌더링
    // 3-1: 로컬스토리지에 들어있는 workouts 가져오기
    // 3-2: insertAdjacentHTML() 메서드를 이용해서 추가하기

    console.log(this.#map);
    console.log(this.#mapEvent);

    // this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution:
    //     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    // }).addTo(this.#map);

    // L.marker(coords)
    //   .addTo(this.#map)
    //   .bindPopup(
    //     L.popup({
    //       maxWidth: 250,
    //       minWidth: 100,
    //       autoClose: false,
    //       closeOnClick: false,
    //       className: `running-popup`,
    //     })
    //   )
    //   .openPopup();
  }

  _renderWorkoutMarker(mapEvent) {
    console.log(mapEvent);
    const { lat, lng } = this.#mapEvent.latlng;
    const coords = [lat, lng];
    return coords;
  }

  _renderWorkout() {}

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');
    console.log(workoutEl);

    if (!workoutEl) return;

    // const workouts = this.#word
    this.#workouts = JSON.parse(localStorage.getItem('workouts'));
    console.log(this.#workouts);

    const workout = this.#workouts.find(
      work => work.id === +workoutEl.dataset.id
    );

    console.log(workout);

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }

  _setLocalStorage() {}

  _getLocalStorage() {}

  _reset() {}
}

const app = new App();
