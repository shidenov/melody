export const GAME = {
  lives: 2,
  timer: 300,
  score: 0,
  currentLevel: 0,
  nextLevel: 1,
  answers: []
};

const POINT = {
  correctAswer: 1,
  correcrfastAnswer: 2,
  live: 2
};

export const startNewGame = (game) => {
  game.answers = [];
  return Object.assign({}, game);
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
    timer: time,
    tick() {
      if (this.timer !==0) {
        this.timer = this.timer - 1;
      }
      this._timeout(this.timer);
    },

    _timeout(timer) {
      if (timer === 0) {
        this.state = `timeout`;
      }
    }
  };
};
