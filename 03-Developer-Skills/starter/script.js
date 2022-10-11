// Remember, we're gonna use strict mode in all scripts now!
"use strict";

const measureKelvin = () => {
  const measurment = {
    type: "temp",
    unit: "celsius",
    value: 10,
  };

  // B) 버그 찾기
  console.table(measurment);

  // C) 버그 고치기5
  const kelvin = Number(measurment.value) + 273;
  return kelvin;
};

// A) 버그 인지하기
console.log(measureKelvin());

// 디버깅 하는 순서
// 1. 소스 텝으로 이동해라
// 2. script.js 파일을 눌러라
// 3. 중단점의 시작과 끝을 누르고 새로고침을 눌러라.

const calcTempAmplitudeBug = function (t1, t2) {
  const temps = t1.concat(t2);
  console.log(temps);

  let max = 0;
  let min = 0;

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== "number") continue;

    debugger;
    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};
const amplitudeBug = calcTempAmplitudeBug([3, 5, 1], [9, 4, 5]);
// A) IDENTIFY
console.log(amplitudeBug);
