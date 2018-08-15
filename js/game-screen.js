import {renderScreen} from "./render-screen";
import {getCurrentDataGame} from "./data/music-data";
import {GAME, calculateResult, calculateScore} from './data/game-data';

import WelcomeView from './game-welcome-view';
import HeaderView from './game-header-view';
import ArtistView from './game-artist-view';
import GenreView from './game-genre-view';
import ResultView from './game-result-view';

export const welcomeScreen = new WelcomeView();
welcomeScreen.onClick = () => {
  const currentGameData = getCurrentDataGame(0);
  const newGame = Object.assign({}, GAME);
  newGame.answers = [];

  const game = gameScreen(currentGameData, newGame);
  renderScreen(game);
};

export const startGame = () => renderScreen(welcomeScreen.element);

const stopGame = (currentGame) => {
  currentGame.score = calculateScore(currentGame.answers, currentGame.lives);
  currentGame.resultGame = calculateResult([4, 12, 8, 11, 5], currentGame);
  currentGame.fastAnswers = currentGame.answers.filter((item) => item.timer <= 30);

  const resultScreen = new ResultView(currentGame);
  resultScreen.onClick = () => renderScreen(welcomeScreen.element);

  renderScreen(resultScreen.element);
};

const changeLevel = (result, game) => {
  const currentGame = Object.assign({}, game);

  if (!result) {
    currentGame.lives = currentGame.lives - 1;
  }

  const randomAnswerTime = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const currentAnswerTimer = randomAnswerTime(5, 40);
  currentGame.timer = currentGame.timer - currentAnswerTimer;
  currentGame.answers.push({result, timer: currentAnswerTimer}); // запишим ответ в массив ответов
  currentGame.currentLevel = currentGame.nextLevel;

  const nextLevelGameData = getCurrentDataGame(currentGame.nextLevel);

  if (typeof nextLevelGameData === `undefined`) {
    stopGame(currentGame);
    return;
  }

  if (currentGame.lives < 0) {
    stopGame(currentGame);
    return;
  }

  currentGame.nextLevel = currentGame.nextLevel + 1;

  const nextGameScreen = gameScreen(nextLevelGameData, currentGame);
  renderScreen(nextGameScreen);
};

export const gameScreen = (currentGameData, currentGame) => {
  const header = new HeaderView(currentGame);
  header.onClick = () => renderScreen(welcomeScreen.element);

  let screen;
  if (currentGameData.gameType === `artist`) {
    screen = new ArtistView(currentGameData);
    screen.onResult = (result) => changeLevel(result, currentGame);
  }

  if (currentGameData.gameType === `genre`) {
    screen = new GenreView(currentGameData);
    screen.onResult = (result) => changeLevel(result, currentGame);
  }

  screen.element.appendChild(header.element);
  return screen.element;
};
