export const GAME = Object.freeze({
  lives: 2,
  timer: 300, // 1000 * 60 * 5 = 5 min
  score: 0,
  currentLevel: 0,
  nextLevel: 1
});

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
    timer: time,
    tick() {
      if (this.timer !== 0) {
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

export const convertText = (number, word, one, many, multi) => {
  const checkNumber = (num) => {
    return (num > 21) ? +(num.toString()[1]) : num;
  };

  number = checkNumber(number);
  if (number === 1) {
    return word + one;
  }

  if (number > 1 && number < 5) {
    return word + many;
  }
  return (number > 1 && number < 5) ? word + many : word + multi;
};

export const showTimeResult = (time) => {
  let {min, sec} = time;

  const minutes = convertText(+min, `минут`, `у`, `ы`, ``);
  const seconds = convertText(+sec, `секунд`, `у`, `ы`, ``);
  sec = (sec[0] === `0`) ? sec[1] : sec;
  return `${min} ${minutes} и ${sec} ${seconds}`;
};

export const timerConverToMinAndSec = (timer) => {
  const minutes = Math.floor(timer / 60);
  const seconds = ((timer % 60) / 1).toFixed(0);
  const convertSeconds = (seconds < 10) ? `0${seconds}` : seconds;

  return {
    min: minutes.toString(),
    sec: convertSeconds
  };
};

export const getRadius = (relation, radius) => {
  const stroke = +(2 * Math.PI * radius).toFixed();
  const offset = +((1 - relation) * stroke).toFixed();
  return {stroke, offset};
};
