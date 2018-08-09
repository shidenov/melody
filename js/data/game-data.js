export const GAME = {
  lives: 2,
  timer: 300,
  score: 0
};

const POINT = {
  correctAswer: 1,
  correcrfastAnswer: 2,
  live: 2
};

export const calculateScore = (answers, lives) => {
  const rightAnswers = answers.filter((item) => item !== false);
  if (answers.length !== 10 || rightAnswers.length < 8) return -1;

  const fastAnswers = rightAnswers.filter((item) => item.timer <= 30);
  const pointAnswers = (rightAnswers.length - fastAnswers.length) * POINT.correctAswer + fastAnswers.length * POINT.correcrfastAnswer;
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

  results.push(currentGame.score);
  const sortResults = results.sort((a, b) => b - a);
  const place = sortResults.indexOf(currentGame.score) + 1;
  const totalGamers = sortResults.length;
  const winPercent = ((totalGamers - place) / totalGamers * 100).toFixed(0);

  return `Вы заняли ${place} место из ${totalGamers}. Это лучше чем у ${winPercent}% игроков`;
};

export const createTimer = (time) => {
  if (typeof time === `undefined`) {
    throw new Error(`Не указан аргумент`);
  }
  if (typeof time !== `number`) {
    throw new Error(`Не верный тип данных, аргументом функции может быть только число`);
  }

  return {
    totalTme: time,
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
