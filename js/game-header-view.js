import AbstractView from './abstract-view';
import {getRadius} from './data/game-data';

/* header template */
export default class HeaderView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const timerRelation = this.state.timer / 300;
    const svg = getRadius(timerRelation, 370);

    return `
      <a class="play-again play-again__wrap" href="#">
          <img class="play-again__img" src="/img/melody-logo-ginger.png" alt="logo" width="177" height="76">
      </a>
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle cx="390" cy="390" r="370" class="timer-line" stroke-dasharray="${svg.stroke}" stroke-dashoffset="${svg.offset}" style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
        <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
          <span class="timer-value-mins">05</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">00</span>
        </div>
      </svg>
      <div class="main-mistakes">
        ${new Array((this.state.lives - 2) * -1).fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`).join(``)}
      </div>
    `;
  }

  onClick() { }

  bind() {
    const playAgainButton = this.element.querySelector(`.play-again`);
    playAgainButton.addEventListener(`click`, this.onClick);
  }
}
