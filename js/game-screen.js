/* Модуль: Игра на выбор исполнителя */
import {renderScreen, createScreenElement} from './kernel';
import {getCurrentDataGame} from './data/music-data';

import welcomeScreen from './welcome-screen';
import {headerTemplate} from './game-screen-header';
import {artistTemplate} from './game-screen-artist';
import {genreTemplate} from './game-screen-genre';

import {resultScreen} from './result-screen';
import {getRadius} from './get-radius';

const changeLevel = (result, game) => {
  let currentGame = Object.assign({}, game);
  if (!result) {
    currentGame.lives = currentGame.lives - 1;
  }

  const randomAnswerTime = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const currentAnswerTimer = randomAnswerTime(5, 40);
  currentGame.timer = currentGame.timer - currentAnswerTimer;
  currentGame.answers.push({result, timer: currentAnswerTimer}); // запишим ответ в массив ответов
  currentGame.currentLevel = currentGame.nextLevel; // назначаем новый текущий уровнь

  const nextLevelGameData = getCurrentDataGame(currentGame.nextLevel);

  if (typeof nextLevelGameData === `undefined`) {
    // вывод результатов закончились все уровни
    resultScreen(currentGame);
    return;
  }

  if (currentGame.lives < 0) {
    // вывод результатов закончились жизни
    resultScreen(currentGame);
    return;
  }

  currentGame.nextLevel = currentGame.nextLevel + 1;

  const nextGameScreen = gameScreen(nextLevelGameData, currentGame);
  renderScreen(nextGameScreen);
};

export const gameScreen = (currentGameData, currentGame) => {
  const gameScreenTemplate = (type) => `<section class="main main--level main--level-${type}"></section>`;

  let screen = gameScreenTemplate(currentGameData.gameType);
  screen = createScreenElement(screen);

  const timeRelation = currentGame.timer / 300;
  const svgOptions = getRadius(timeRelation, 370);
  const header = headerTemplate(currentGame, svgOptions);
  screen.insertAdjacentHTML(`afterBegin`, header);

  let content;
  if (currentGameData.gameType === `artist`) {
    content = artistTemplate(currentGameData); // вывод игрового экрана с вопросом
    const inputItems = content.querySelectorAll(`input`);
    for (let input of inputItems) {
      input.addEventListener(`click`, (event) => {
        const e = event || window.event;
        const target = e.target || e.srcElement;

        const currentAnswerIndex = target.value.slice(target.value.length - 1, target.value.length);
        const artistResult = currentGameData.answers[currentAnswerIndex].result();

        // stop audio
        const track = content.querySelector(`audio`);
        track.pause();

        // меняем состояние GAME
        changeLevel(artistResult, currentGame);
      });
    }
  }

  if (currentGameData.gameType === `genre`) {
    content = genreTemplate(currentGameData); // вывод игрового экрана с вопросом

    const submitButton = content.querySelector(`.genre-answer-send`);
    submitButton.disabled = true;

    const resultAnswers = {};
    const answerItems = [...content.querySelectorAll(`.genre-answer-check`)];

    for (let item of answerItems) {
      item.addEventListener(`click`, (event) => {
        const e = event || window.event;
        const target = e.target || e.srcElement;

        const currentAnswerIndex = target.control.value.slice(target.control.value.length - 1, target.control.value.length);
        const result = currentGameData.answers[currentAnswerIndex].result();

        if (!target.control.checked) {
          resultAnswers[currentAnswerIndex] = result;
        } else {
          delete resultAnswers[currentAnswerIndex];
        }

        if (Object.keys(resultAnswers).length > 0) {
          submitButton.disabled = false;
        } else {
          submitButton.disabled = true;
        }
      });
    }

    submitButton.addEventListener(`click`, (e) => {
      let genreResult = true;
      for (let key in resultAnswers) {
        if (!resultAnswers[key]) {
          genreResult = false;
          break;
        }
      }

      changeLevel(genreResult, currentGame);
      e.preventDefault();
    });
  }

  screen.insertAdjacentElement(`beforeEnd`, content);

  const playAgainButton = screen.querySelector(`.play-again`);
  playAgainButton.addEventListener(`click`, () => {
    renderScreen(welcomeScreen);
  });

  return screen;
};
