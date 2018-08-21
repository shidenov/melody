import {
  calculateScore,
  calculateResult,
  createTimer,
  timerConverToMinAndSec,
  showTimeResult,
  convertText,
  getRadius
} from './game-data';

import {assert} from 'chai';

describe(`Функция подсчёта набранных баллов игрока`, () => {
  it(`Проверка на количество ответов меньше десяти`, () => {
    assert.equal(calculateScore([
      {result: false, timer: 60},
      {result: false, timer: 60},
      {result: false, timer: 60}
    ], -1), -1);

    assert.equal(calculateScore([
      {result: true, timer: 60},
      {result: true, timer: 60},
      {result: false, timer: 60},
      {result: false, timer: 60},
      {result: false, timer: 60}
    ], -1), -1);

    assert.equal(calculateScore([
      {result: true, timer: 30},
      {result: false, timer: 31},
      {result: true, timer: 30},
      {result: true, timer: 60},
      {result: true, timer: 60},
      {result: false, timer: 28},
      {result: true, timer: 60},
      {result: true, timer: 60},
      {result: true, timer: 60},
      {result: false, timer: 20}
    ], -1), -1);
  });

  it(`Проверка результатов - ответы даны за время больше 30 секунд`, () => {
    assert.equal(calculateScore([
      {result: true, timer: 60},
      {result: true, timer: 60},
      {result: true, timer: 60},
      {result: true, timer: 60},
      {result: true, timer: 60},
      {result: true, timer: 60},
      {result: true, timer: 60},
      {result: true, timer: 60},
      {result: true, timer: 60},
      {result: true, timer: 60}
    ], 2), 10);

    assert.equal(calculateScore([
      {result: true, timer: 60},
      {result: true, timer: 60},
      {result: true, timer: 60},
      {result: true, timer: 60},
      {result: true, timer: 60},
      {result: true, timer: 60},
      {result: false, timer: 60},
      {result: true, timer: 60},
      {esult: true, timer: 60},
      {result: true, timer: 60}
    ], 1), 7);

    assert.equal(calculateScore([
      {result: false, timer: 60},
      {result: true, timer: 60},
      {result: true, timer: 60},
      {result: true, timer: 60},
      {result: false, timer: 60},
      {result: true, timer: 60},
      {result: true, timer: 60},
      {result: true, timer: 60},
      {result: true, timer: 60},
      {result: true, timer: 60}
    ], 0), 4);
  });

  it(`Проверка результатов - разные варианты ответов`, () => {
    assert.equal(calculateScore([
      {result: true, timer: 30},
      {result: true, timer: 31},
      {result: true, timer: 30},
      {result: true, timer: 60},
      {result: true, timer: 60},
      {result: true, timer: 28},
      {result: true, timer: 60},
      {result: true, timer: 60},
      {result: true, timer: 60},
      {result: true, timer: 20}
    ], 2), 14);

    assert.equal(calculateScore([
      {result: true, timer: 24},
      {result: true, timer: 60},
      {result: true, timer: 30},
      {result: true, timer: 62},
      {result: false, timer: 58},
      {result: true, timer: 30},
      {result: true, timer: 64},
      {result: true, timer: 40},
      {result: true, timer: 60},
      {result: true, timer: 15}
    ], 1), 11);

    assert.equal(calculateScore([
      {result: true, timer: 27},
      {result: true, timer: 65},
      {result: true, timer: 30},
      {result: true, timer: 60},
      {result: false, timer: 60},
      {result: true, timer: 30},
      {result: true, timer: 40},
      {result: true, timer: 70},
      {result: true, timer: 55},
      {result: false, timer: 10}
    ], 0), 7);
  });
});

describe(`Функция подсчёта результатов игры`, () => {
  const timeout = `Время вышло! Вы не успели отгадать все мелодии`;
  const attemptsEnd = `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;

  it(`Подсчёт результатов: Проигрышь - закончилось время`, () => {
    assert.equal(calculateResult([4, 5, 8, 11], {score: 10, lives: 2, timer: {time: 0}}), timeout);
    assert.equal(calculateResult([4, 12, 8, 11, 5], {score: 5, lives: 0, timer: {time: 0}}), timeout);
    assert.equal(calculateResult([10, 5], {score: 8, lives: 1, timer: {time: 0}}), timeout);
  });

  it(`Подсчёт результатов: Проигрышь - закончились все попытки`, () => {
    assert.equal(calculateResult([4, 5, 8, 11], {score: 10, lives: -1, timer: {time: 60}}), attemptsEnd);
    assert.equal(calculateResult([4, 12, 8, 11, 5], {score: 5, lives: -1, timer: {time: 100}}), attemptsEnd);
    assert.equal(calculateResult([10, 5], {score: 8, lives: -1, timer: 120}), attemptsEnd);
  });

  it(`Подсчёт результатов: Проигрышь - закончились все попытки и время`, () => {
    assert.equal(calculateResult([4, 12, 5], {score: 10, lives: -1, timer: {time: 0}}), timeout);
    assert.equal(calculateResult([4, 2, 8, 11], {score: 8, lives: -1, timer: {time: 0}}), timeout);
  });

  it(`Подсчёт результатов: Выигрыш`, () => {
    assert.equal(calculateResult([4, 5, 8, 11], {score: 10, lives: 2, timer: {time: 60}}
    ), `Вы заняли 2 место из 5. Это лучше чем у 60% игроков`);
    assert.equal(calculateResult([4, 12, 8, 11, 5], {score: 5, lives: 0, timer: {time: 360}}
    ), `Вы заняли 4 место из 6. Это лучше чем у 33% игроков`);
    assert.equal(calculateResult([10, 5], {score: 8, lives: 1, timer: {time: 120}}
    ), `Вы заняли 2 место из 3. Это лучше чем у 33% игроков`);
  });
});

describe(`Таймер`, () => {
  it(`Таймер: создание`, () => {
    assert.isObject(createTimer(300));
    assert.throws(() => createTimer(`300`), Error, `Не верный тип данных, аргументом функции может быть только число`);
    assert.throws(() => createTimer({}), Error, `Не верный тип данных, аргументом функции может быть только число`);
    assert.throws(() => createTimer([]), Error, `Не верный тип данных, аргументом функции может быть только число`);
    assert.throws(() => createTimer(), Error, `Не указан аргумент`);
  });

  it(`Таймер: проверка на значения`, () => {
    const timer = createTimer(100);
    assert.equal(timer.time, 100);
  });

  it(`Таймер: метод tick`, () => {
    const timer = createTimer(3);
    timer.tick();
    assert.equal(timer.time, 2);
    timer.tick();
    assert.equal(timer.time, 1);
    timer.tick();
    assert.equal(timer.time, 0);
    assert.equal(timer.state, `timeout`);
  });

  it(`Таймер: проверка tick при timeout`, () => {
    const timer = createTimer(2);
    timer.tick();
    timer.tick();
    timer.tick();
    timer.tick();

    assert.equal(timer.time, 0);
    assert.equal(timer.state, `timeout`);
  });
});

describe(`Жизни, попытки`, () => {
  it(`Жизни, попытки: Проверка формы существительного ошибки`, () => {
    assert.equal(convertText(0, `ошиб`, `ку`, `ки`, `ок`), `ошибок`);
    assert.equal(convertText(1, `ошиб`, `ку`, `ки`, `ок`), `ошибку`);
    assert.equal(convertText(2, `ошиб`, `ку`, `ки`, `ок`), `ошибки`);
    assert.equal(convertText(3, `ошиб`, `ку`, `ки`, `ок`), `ошибки`);
    assert.equal(convertText(4, `ошиб`, `ку`, `ки`, `ок`), `ошибки`);
    assert.equal(convertText(5, `ошиб`, `ку`, `ки`, `ок`), `ошибок`);
    assert.equal(convertText(6, `ошиб`, `ку`, `ки`, `ок`), `ошибок`);
  });
});

describe(`Таймер - конвертация`, () => {
  it(`Таймер: Проверка функции конвертации`, () => {
    assert.deepEqual(timerConverToMinAndSec(300), {min: `5`, sec: `00`});
    assert.deepEqual(timerConverToMinAndSec(22), {min: `0`, sec: `22`});
    assert.deepEqual(timerConverToMinAndSec(150), {min: `2`, sec: `30`});
    assert.deepEqual(timerConverToMinAndSec(48), {min: `0`, sec: `48`});
    assert.deepEqual(timerConverToMinAndSec(188), {min: `3`, sec: `08`});
  });

  it(`Таймер: Проверка формы склонения минут и секунд`, () => {
    const time1 = timerConverToMinAndSec(300);
    assert.equal(showTimeResult(time1), `5 минут и 0 секунд`);

    const time2 = timerConverToMinAndSec(22);
    assert.equal(showTimeResult(time2), `0 минут и 22 секунды`);

    const time3 = timerConverToMinAndSec(150);
    assert.equal(showTimeResult(time3), `2 минуты и 30 секунд`);

    const time4 = timerConverToMinAndSec(48);
    assert.equal(showTimeResult(time4), `0 минут и 48 секунд`);

    const time5 = timerConverToMinAndSec(188);
    assert.equal(showTimeResult(time5), `3 минуты и 8 секунд`);

    const time6 = timerConverToMinAndSec(61);
    assert.equal(showTimeResult(time6), `1 минуту и 1 секунду`);

    const time7 = timerConverToMinAndSec(71);
    assert.equal(showTimeResult(time7), `1 минуту и 11 секунд`);

    const time8 = timerConverToMinAndSec(151);
    assert.equal(showTimeResult(time8), `2 минуты и 31 секунду`);
  });
});

describe(`Function should correctly calculate circle length`, () => {
  describe(`Normal cases`, () => {
    it(`Should return full length and 0 in initial state`, () => {
      // 2 * 3.14 * 100 = 6.28 * 100 = 628
      assert.equal(getRadius(1, 100).stroke, 628);
      assert.equal(getRadius(1, 100).offset, 0);
    });

    it(`Should return 0 and full length in the final state`, () => {
      // 2 * 3.14 * 100 = 6.28 * 100 = 628
      assert.equal(getRadius(0, 100).stroke, 628);
      assert.equal(getRadius(0, 100).offset, 628);
    });

    it(`Offset and length should be equal on a half`, () => {
      // 2 * 3.14 * 100 / 2 = 3.14 * 100 = 314
      assert.equal(getRadius(0.5, 100).stroke, 628);
      assert.equal(getRadius(0.5, 100).offset, 314);
    });
  });
});
