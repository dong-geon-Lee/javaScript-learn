'use strict';

class Workout {}

class Running extends Workout {}

class Cycling extends Workout {}

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  constructor() {}

  _getPosition() {}

  _loadMap() {}

  _showForm() {}

  _hideForm() {}

  _toggleElevationField() {}

  _newWorkout() {}

  _renderWorkoutMarker() {}

  _renderWorkout() {}

  _moveToPopup() {}

  _setLocalStorage() {}

  _getLocalStorage() {}

  _reset() {}
}
