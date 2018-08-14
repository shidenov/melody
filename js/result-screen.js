import {createScreenElement, renderScreen} from './kernel';
import {calculateResult, calculateScore, showTimeResult, timerConvertToMinAndSec, convertText} from './data/game-data';
import {resultData} from './data/result-data';
import welcomeScreen from './welcome-screen';

/* Результат игры: проигрыш закончились попытки */
let templateLoseScreen = (data) => `
<h2 class="title">${data.title}</h2>
<div class="main-stat">${data.content}</div>
<span role="button" tabindex="0" class="main-replay">${data.button}</span>
`;

let templateTimeOutScreen = (data) => `
<h2 class="title">${data.title}!</h2>
<div class="main-stat">${data.content}</div>
<span role="button" tabindex="0" class="main-replay">${data.button}</span>
`;

let templateWinScreen = (data, result, score, lives, answers, time) => `
<h2 class="title">${data.title}</h2>
<div class="main-stat">За${time}
  <br>вы&nbsp;набрали ${score} баллов (${answers} быстрых)
  <br>совершив ${lives} ошибки</div>
<span class="main-comparison">${result}</span>
<span role="button" tabindex="0" class="main-replay">${data.button}</span>
`;

export const resultScreen = (game) => {
  game.score = calculateScore(game.answers, game.lives); // запишим текущий счёт в объект с игрой
  const result = calculateResult([4, 12, 8, 11, 5], game);

  let content;
  if (game.score !== -1) {
    const timer = timerConvertToMinAndSec(300 - game.timer);
    const timeText = showTimeResult(timer);
    const lives = (game.lives - 2) * -1;
    const livesDeclination = convertText(lives, `ошибок`, `у`, `и`, ``);
    const livesText = `${lives} ${livesDeclination}`;

    content = templateWinScreen(resultData.win, result, livesText, game.answers.length, timeText);
  }

  if (result === `У вас закончились все попытки. Ничего, повезёт в следующий раз!`) {
    content = templateLoseScreen(resultData.lose).trim();
  }

  if (result === `Время вышло! Вы не успели отгадать все мелодии`) {
    content = templateTimeOutScreen(resultData.lose).trim();
  }

  let resultWrap = `<section class="main main--result"><section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>${content}</section>`;
  resultWrap = createScreenElement(resultWrap);
  renderScreen(resultWrap);

  const playAgainButton = resultWrap.querySelector(`.main-replay`);
  playAgainButton.addEventListener(`click`, () => {
    renderScreen(welcomeScreen);
  });
};
