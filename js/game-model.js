import {
  GAME,
  createTimer,
  calculateScore,
  calculateResult
} from './data/game-data';

export default class GameModel {
  constructor(data) {
    this.data = data;
    this.newGame();
  }

  get gameState() {
    return this._gameState;
  }

  set gameState(gameState) {
    this._gameState = Object.assign({}, gameState);
  }

  newGame() {
    this._gameState = Object.assign({}, GAME);
    this._gameState.answers = [];
    this._gameState.timer = createTimer(this._gameState.currentTimer); // 300
  }

  gameResult() {
    this._gameState.score = calculateScore(this._gameState.answers, this._gameState.lives); // запишим текущий счёт в объект с игрой
    this._gameState.resultGame = calculateResult([4, 12, 8, 11, 5], this._gameState);
    this._gameState.fastAnswers = this._gameState.answers.filter((item) => item.timer <= 30);
  }

  lossLive() {
    this._gameState.lives = this._gameState.lives - 1;
  }

  nextLevel() {
    this._gameState.nextLevel = this._gameState.nextLevel + 1;
  }

  changeCurrentLevel() {
    this._gameState.currentLevel = this._gameState.nextLevel; // назначаем новый текущий уровнь
  }

  addResultAnswer(result) {
    const currentAnswerTime = this._gameState.currentTimer - this._gameState.timer.time;
    this._gameState.answers.push({result, timer: currentAnswerTime}); // запишим ответ в массив ответов
    this._gameState.currentTimer = this._gameState.timer.time;
  }

  getLevelGameData() {
    const gameData = this.data[this._gameState.currentLevel];
    return gameData !== undefined ? gameData : false;
  }

  checkLives() {
    return this._gameState.lives < 0;
  }

  checkTimerStatus() {
    return this._gameState.timer.state === `timeout`;
  }

  tick() {
    this._gameState.timer.tick();
  }
}
