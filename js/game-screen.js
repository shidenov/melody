import {renderScreen, createScreenElement} from './kernel';
import {GAME, startNewGame} from './data/game-data';
import {getCurrentDataGame} from './data/music-data';

import welcomeScreen from './welcome-screen';
import {headerTemplate} from './game-screen-header';
import {artistTemplate} from './game-screen-artist';
import {genreTemplate} from './game-screen-genre';

import {resultScreen} from './result-screen';

export let currentGame = startNewGame(GAME); // НОВАЯ ИГРА

const changeLevel = (result) => {
  if (!result) {
    currentGame.lives = currentGame.lives - 1;
  }

  const currentAnswerTimer = 29;
  currentGame.timer = currentGame.timer - currentAnswerTimer;
  currentGame.answers.push({result, timer: currentAnswerTimer});//  запишим ответ в массив ответов
  currentGame.currentLevel = currentGame.nextLevel;// назначаем новый текущий уровнь

  const nextLevelGameData = getCurrentDataGame(currentGame.nextLevel);

  if (typeof nextLevelGameData === `undefined`) {
    //  Вывод результатов
    resultScreen(currentGame);
    currentGame = startNewGame(GAME);
    return;
  }

  if (currentGame.lives < 0) {
    //  Вывод результатов
    resultScreen(currentGame);
    currentGame = startNewGame(GAME);
    return;
  }

  const nextGameScreen = gameScreen(nextLevelGameData);
  renderScreen(nextGameScreen);
  currentGame.nextLevel = currentGame.nextLevel + 1;
};

export const gameScreen = (currentGameData) => {
  const gameScreenTemplate = (type) => `<section class="main main--level main--level-${type}"></section>`;

  let screen = gameScreenTemplate(currentGameData.gameType);
  screen = createScreenElement(screen);

  const header = headerTemplate(currentGame);
  screen.insertAdjacentHTML(`afterBegin`, header);

  let content;

  if (currentGameData.gameType === `artist`) {
    content = artistTemplate(currentGameData);//  Вывод игрового экрана с вопрососм
    const inputItems = content.querySelectorAll(`input`);
    for (let input of inputItems) {
      input.addEventListener(`click`, (event) => {
        const target = event.target;

        const currentAnswerIndex = target.value.slice(target.value.length - 1, target.value.length);
        const result = currentGameData.answers[currentAnswerIndex].result();

        const track = content.querySelector(`audio`);
        track.pause();

        changeLevel(result);
      });
    }
  }

  if (currentGameData.gameType === `genre`) {
    content = genreTemplate(currentGameData);

    const submitButton = content.querySelector(`.genre-answer-send`);
    submitButton.disabled = true;

    const resultAnswers = {};
    const answerItems = [...content.querySelectorAll(`.genre-answer-check`)];

    for (let item of answerItems) {
      item.addEventListener(`click`, (event) => {
        const e = event;
        const target = e.target;

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

      changeLevel(genreResult);
      e.preventDefault();
    });
  }

  screen.insertAdjacentElement(`beforeEnd`, content);
  const playAgainButton = screen.querySelector(`.play-again`);
  playAgainButton.addEventListener(`click`, () => {
    currentGame = startNewGame(GAME);
    renderScreen(welcomeScreen);
  });

  return screen;
};
