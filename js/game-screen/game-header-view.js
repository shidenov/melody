import AbstractView from '../abstract-view';
import {getRadius, timerConverToMinAndSec, TIMER} from '../data/game-data';

/* header template */
export default class HeaderView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const svg = this.getSvgAttrOptions();
    const timer = this.convertTime();

    return `
      <a class="play-again play-again__wrap" href="#">
          <img class="play-again__img" src="/img/melody-logo-ginger.png" alt="logo" width="177" height="76">
      </a>
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle cx="390" cy="390" r="370" class="timer-line" stroke-dasharray="${svg.stroke}" stroke-dashoffset="${svg.offset}" style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
        <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
          <span class="timer-value-mins">${timer.min}</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">${timer.sec}</span>
        </div>
      </svg>
      <div class="main-mistakes">
        ${new Array((this.state.lives - 2) * -1).fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`).join(``)}
      </div>
    `;
  }

  onClick() { }

  bind() {
    this.minElement = this.element.querySelector(`.timer-value-mins`);
    this.secElement = this.element.querySelector(`.timer-value-secs`);
    this.circleElement = this.element.querySelector(`circle`);
    this.timerElement = this.element.querySelector(`.timer-value`);
    const playAgainButton = this.element.querySelector(`.play-again`);
    playAgainButton.addEventListener(`click`, this.onClick);
  }

  // публичный метод, используется в game-screen
  convertTime() {
    return timerConverToMinAndSec(this.state.timer.time);
  }

  // публичный метод, используется в game-screen
  getSvgAttrOptions() {
    const timerRelation = this.state.timer.time / TIMER;
    return getRadius(timerRelation, 370);
  }
}
