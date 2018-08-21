/* Модуль: Игра на выбор исполнителя */
import {renderScreen} from '../render-screen';
import Application from '../application';
import HeaderView from './game-header-view';
import ArtistView from './game-artist-view';
import GenreView from './game-genre-view';
import ModalConfirmView from '../modal-window/modal-confirm-view';
import Music from '../data/music-data';
import {QuestionType, ResultGame} from '../data/game-data';

const ONE_SECOND = 1000;

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.header = null;
    this.screen = null;
    this._intervalId = null;
  }

  startGame() {
    const currentGameData = this.model.getLevelGameData();
    this.gameScreen(currentGameData);
    this._tickTimer();
    renderScreen(this.screen.element);
  }

  gameScreen(currentGameData) {
    this.header = new HeaderView(this.model.gameState);
    this.modalConfirm = new ModalConfirmView();

    this.modalConfirm.onClickOk = (event) => {
      const e = event || window.event;
      this._stopTimer();
      Music.stopPlayAllTracks();
      Application.showWelcome();
      document.body.removeChild(this.modalConfirm.element);
      e.preventDefault();
    };

    this.modalConfirm.onClickCancel = (event) => {
      const e = event || window.event;
      document.body.removeChild(this.modalConfirm.element);
      e.preventDefault();
    };

    this.header.onClick = () => {
      document.body.appendChild(this.modalConfirm.element);
    };

    if (currentGameData.gameType === QuestionType.ARTIST) {
      this.screen = new ArtistView(currentGameData);
      this.screen.onResult = (result) => this._changeLevel(result, this.model.gameState);
    }

    if (currentGameData.gameType === QuestionType.GENRE) {
      this.screen = new GenreView(currentGameData);
      this.screen.onResult = (result) => this._changeLevel(result, this.model.gameState);
    }

    this.screen.element.appendChild(this.header.element);
  }

  _changeLevel(result, game) {
    Music.stopPlayAllTracks();
    this.model.gameState = game;

    if (!result) {
      this.model.lossLive();
    }

    this._stopTimer();
    this.model.addResultAnswer(result);
    this.model.changeCurrentLevel(); // назначаем новый текущий уровнь

    const nextLevelGameData = this.model.getLevelGameData();
    const noLives = this.model.checkLives();

    if (!nextLevelGameData) {
      // вывод результатов закончились все уровни
      this._stopGame(ResultGame.WIN);
      return;
    }

    if (noLives) {
      // вывод результатов закончились жизни
      this._stopGame(ResultGame.NOLIVES);
      return;
    }

    this.model.nextLevel(); // следующий уровень

    this.gameScreen(nextLevelGameData);
    renderScreen(this.screen.element);
    this._tickTimer(); // запуск таймера
  }

  _updateHeader() {
    const time = this.header.convertTime();
    this.header.minElement.textContent = time.min;
    this.header.secElement.textContent = time.sec;

    const svg = this.header.getSvgAttrOptions();
    this.header.circleElement.setAttribute(`stroke-dashoffset`, svg.offset);

    if (+time.sec <= 30 && +time.sec % 2 === 0 && +time.min === 0) {
      this.header.timerElement.style.color = `red`;
    } else {
      this.header.timerElement.style.color = ``;
    }
  }

  _stopGame(status) {
    this.model.resultGame(status);
    Application.showResult(this.model.gameState);
  }

  _tickTimer() {
    const timeout = this.model.checkTimerStatus();
    if (timeout) {
      this._stopTimer();
      this._stopGame(ResultGame.TIMEOUT);
      Music.stopPlayAllTracks();
      return;
    }

    this._intervalId = setTimeout(() => {
      this.model.tick();
      this._tickTimer();
      this._updateHeader();
    }, ONE_SECOND);
  }

  _stopTimer() {
    clearTimeout(this._intervalId);
  }
}
