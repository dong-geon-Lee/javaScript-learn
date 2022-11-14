'use strict';

class Workout {
  constructor(distance, duration, coords) {
    this.distance = distance;
    this.duration = duration;
    this.coords = coords;
  }

  click() {
    console.log(this);
    this.clicks = '';
  }

  _setDescription() {
    this.date = '';
  }
}

class Running extends Workout {
  constructor(distance, duration, cadence) {
    super(distance, duration);
    this.cadence = cadence;
  }

  calcPace() {
    return (this.pace = this.cadence * this.distance);
  }
}

class Cycling extends Workout {
  constructor(distance, duration, elevationGain) {
    super(distance, duration);
    this.elevationGain = elevationGain;
  }

  calcSpeed() {
    return (this.speed = this.elevationGain * this.distance);
  }
}

const leftMapEl = document.querySelector('#map');
const selectEl = document.querySelector('.select__type__box');
const cards = document.querySelectorAll('.list__card');
const listContent = document.querySelectorAll('.list__content');
const listContainer = document.querySelectorAll('.list__container');
const inputContainer = document.querySelector('.input__container');
const inputGroup = document.querySelector('.input__group');
const inputBoxEl = document.querySelectorAll('.input__box');
const inputDistanceEl = document.querySelector('.distance__input');
const inputDurationEl = document.querySelector('.duration__input');
const inputCadenceEl = document.querySelector('.cadence__input');
const inputElevateEl = document.querySelector('.elevate__input');
const cadenceEl = document.querySelector('#cadence');
const elevateEl = document.querySelector('#elevate');

class App {
  workouts = [];
  map = [];
  mapEvent;
  mapZoomLevel = 13;

  constructor() {
    this._getPosition();
  }

  _getPosition() {
    navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () => {
      console.error('에러');
    });
  }

  _loadMap(position) {
    console.log(position);
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];
    const map = L.map('map').setView(coords, this.mapZoomLevel);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker(coords)
      .addTo(map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();

    map.on('click', this._showForm);
    selectEl.addEventListener('change', this._toggleElevationField);

    this._renderItemLists();

    inputGroup.addEventListener('submit', e => {
      e.preventDefault();

      console.log('click');

      const distance = inputDistanceEl.value;
      const duration = inputDurationEl.value;
      const cadence = inputCadenceEl.value;
      const coord = this.mapEvent;

      const running = new Running(distance, duration, cadence, coord);
      console.log(running);

      this.workouts.push(running);

      localStorage.setItem('workouts', JSON.stringify(this.workouts));

      console.log(this.workouts);

      inputCadenceEl.value =
        inputElevateEl.value =
        inputDurationEl.value =
        inputDistanceEl.value =
          '';
    });
  }

  _renderItemLists() {
    const items = JSON.parse(localStorage.getItem('workouts'));
    console.log(items);

    const html = items?.map(item => {
      return `
      <div class="list__card">
        <div class="list__line-color1"></div>
        <div class="list__content">
          <h2 class="list__title">Running on November 13</h2>
          <div class="list__property-box">
            <div class="type__running">
              <label>🏃‍♂️ ${item.distance}</label>
              <span> km</span>
            </div>
            <div class="time">
              <label>⏱ ${item.duration}</label>
              <span>min</span>
            </div>
            <div class="duration">
              <label>⚡️ 0.2</label>
              <span>min/km</span>
            </div>
            <div class="distance">
              <label>🦶🏼 ${item.cadence}</label>
              <span>spm</span>
            </div>
          </div>
        </div>
      </div>
    `;
    });

    listContainer.insertAdjacentHTML('afterbegin', html);
  }

  _showForm(mapE) {
    console.log(mapE);
    this.mapEvent = mapE;

    inputContainer.classList.remove('hidden');
    inputDistanceEl.focus();

    inputGroup.style.opacity = 0;
    inputGroup.style.transform = 'translateY(-8rem)';

    setTimeout(() => {
      inputGroup.style.opacity = 1;
      inputGroup.style.transform = 'translateY(0rem)';
      inputGroup.style.transition = 'all 1s';
    }, 10);

    setTimeout(() => {
      cards.forEach(list => {
        list.style.transform = 'translateY(-3rem)';
        list.style.transition = 'all 1s';
      });
    }, 10);
  }

  _toggleElevationField() {
    let selectedValue = selectEl.value;

    if (selectedValue === 'Running') {
      cadenceEl.classList.remove('hidden');
      elevateEl.classList.add('hidden');
    }

    if (selectedValue === 'Cycling') {
      elevateEl.classList.remove('hidden');
      cadenceEl.classList.add('hidden');
    }
  }

  _newWorkout(mapE) {
    const { lat, lng } = mapE.latlng;
    const coords = [lat, lng];
    console.log(coords);
  }
}

const init = new App();
