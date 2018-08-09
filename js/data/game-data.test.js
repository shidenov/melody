export const GAME = {
  lives: 2,
  timer: 300, // 1000 * 60 * 5 = 5 min
  score: 0
};

const POINT = {
  correctAnswer: 1,
  correctfastAnswer: 2,
  live: 2
};

export const calculateScore = (answers, lives) => {
  const trueAnswers = answers.filter((item) => item.result !== false);
  if (answers.length !== 10 || trueAnswers.length < 8) {
    return -1;
  }

  const fastAnswers = trueAnswers.filter((item) => item.timer <= 30);
  const pointAnswers = ((trueAnswers.length - fastAnswers.length) * POINT.correctAnswer) + (fastAnswers.length * POINT.correctfastAnswer);
  const pointLives = (GAME.lives > lives) ? (GAME.lives - lives) * POINT.live : 0;

  return pointAnswers - pointLives;
};

export const calculateResult = (results, currentGame) => {
  if (currentGame.timer <= 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  }

  if (currentGame.lives < 0) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  }

  // добавим результат игры в массив
  results.push(currentGame.score);
  const sortResults = results.sort((a, b) => b - a);
  const place = sortResults.indexOf(currentGame.score) + 1; // место которое занял игрок
  const totalGamers = sortResults.length;
  const winPercent = ((totalGamers - place) / totalGamers * 100).toFixed(0);

  return `Вы заняли ${place} место из ${sortResults.length}. Это лучше чем у ${winPercent}% игроков`;
};


export const createTimer = (time) => {
  if (typeof time === `undefined`) {
    throw new Error(`Не указан аргумент`);
  }

  if (typeof time !== `number`) {
    throw new Error(`Не верный тип данных, аргументом функции может быть только число`);
  }

  return {
    totalTime: time,
    timer: time,
    tick() {
      this._interval = setInterval(() => {
        this.timer = this.timer - 1;
        if (this.timer === 0) {
          clearInterval(this._interval);
          this.timeout();
        }
      }, 1000);
    },

    timeout() {
      this.state = `timeout`;
    }
  };
};

const timer = createTimer(10);
timer.tick();

const assert = require(`chai`).assert;

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
      {result: false, timer: 60},
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
    assert.equal(calculateResult([4, 5, 8, 11], {score: 10, lives: 2, timer: 0}),timeout);
    assert.equal(calculateResult([4, 12, 8, 11, 5], {score: 5, lives: 0, timer: 0}), timeout);
    assert.equal(calculateResult([10, 5], {score: 8, lives: 1, timer: 0}), timeout);
  });

  it(`Подсчёт результатов: Проигрышь - закончились все попытки`, () => {
    assert.equal(calculateResult([4, 5, 8, 11], {score: 10, lives: -1, timer: 60}), attemptsEnd);
    assert.equal(calculateResult([4, 12, 8, 11, 5], {score: 5, lives: -1, timer: 100}), attemptsEnd);
    assert.equal(calculateResult([10, 5], {score: 8, lives: -1, timer: 120}), attemptsEnd);
  });

  it(`Подсчёт результатов: Проигрышь - закончились все попытки и время`, () => {
    assert.equal(calculateResult([4, 12, 5], {score: 10, lives: -1, timer: 0}), timeout);
    assert.equal(calculateResult([4, 2, 8, 11], {score: 8, lives: -1, timer: 0}), timeout);
  });

  it(`Подсчёт результатов: Выигрыш`, () => {
    assert.equal(calculateResult([4, 5, 8, 11], {score: 10, lives: 2, timer: 60}), `Вы заняли 2 место из 5. Это лучше чем у 60% игроков`);
    assert.equal(calculateResult([4, 12, 8, 11, 5], {score: 5, lives: 0, timer: 360}
    ), `Вы заняли 4 место из 6. Это лучше чем у 33% игроков`);
    assert.equal(calculateResult([10, 5], {score: 8, lives: 1, timer: 120}
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
    assert.equal(timer.timer, 100);
    assert.equal(timer.totalTime, 100);
  });

  it(`Таймер: проверка ассинхронности, метод tick`, function (done) {
    const timer = createTimer(1);
    timer.tick();
    setTimeout(() => {
      assert.equal(timer.timer, 0);
      assert.equal(timer.state, `timeout`);
      done();
    }, 1000);
  });
});
