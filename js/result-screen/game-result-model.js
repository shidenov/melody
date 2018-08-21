import {
  ResultGame,
  calculateResult,
  calculateScore,
  timerConverToMinAndSec,
  showTimeResult,
  convertText,
  TIMER
} from '../data/game-data';

export default class ResultModel {
  constructor(gameState) {
    this._gameState = Object.assign({}, gameState);
    this._calculateResult();
  }

  get resultState() {
    if (this._gameState.resultGame === ResultGame.WIN) {
      const timer = timerConverToMinAndSec(TIMER - this._gameState.timer.time);
      const timeText = showTimeResult(timer);

      const lives = (this._gameState.lives - 2) * -1;
      const livesDeclination = convertText(lives, `ошиб`, `ку`, `ки`, `ок`);
      const livesText = `${lives} ${livesDeclination}`;

      // вернем данные для view
      return {
        lives: livesText,
        time: timeText,
        score: this._gameState.score,
        totalFast: this._gameState.fastAnswers,
        status: this._gameState.resultGame
      };
    }
    return {
      status: this._gameState.resultGame
    };
  }

  getPlayerResult() {
    if (this._gameState.resultGame === ResultGame.WIN) {
      return {
        date: new Date(),
        lives: this._gameState.lives,
        time: this._gameState.currentTimer,
        score: this._gameState.score,
        totalfastAnswers: this._gameState.fastAnswers
      };
    }
    return false;
  }

  getScores(data) {
    const scores = [];
    data.forEach((result) => scores.push(result.score));
    return calculateResult(scores, this._gameState);
  }

  _calculateResult() {
    if (this._gameState.resultGame === ResultGame.WIN) {
      this._gameState.score = calculateScore(this._gameState.answers, this._gameState.lives);
      this._gameState.fastAnswers = (this._gameState.answers.filter((item) => item.timer <= 30)).length;
    }
  }
}
