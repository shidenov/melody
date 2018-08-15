import AbstractView from './abstract-view';
import {timerConverToMinAndSec, showTimeResult, convertText} from './data/game-data';

export default class ResultView extends AbstractView {
  constructor(game) {
    super();
    this.game = game;
  }

  get template() {
    let template;
    if (this.game.score !== -1) {
      const timer = timerConverToMinAndSec(300 - this.game.timer);
      const timeText = showTimeResult(timer);

      const lives = (this.game.lives - 2) * -1;
      const livesDeclination = convertText(lives, `ошиб`, `ку`, `ки`, `ок`);
      const livesText = `${lives} ${livesDeclination}`;

      template = `
        <section class="main main--result">
          <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
          <h2 class="title">Вы настоящий меломан!</h2>
          <div class="main-stat">${timeText}
            <br>вы&nbsp;набрали ${this.game.score} баллов (${this.game.fastAnswers.length} быстрых)
            <br>совершив ${livesText}</div>
          <span class="main-comparison">${this.game.resultGame}</span>
          <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
        </section>
      `;
    }

    if (this.game.resultGame === `У вас закончились все попытки. Ничего, повезёт в следующий раз!`) {
      template = `
        <section class="main main--result">
          <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
          <h2 class="title">Какая жалость!</h2>
          <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
          <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
        </section>
      `;
    }

    if (this.game.resultGame === `Время вышло! Вы не успели отгадать все мелодии`) {
      template = `
        <section class="main main--result">
          <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
          <h2 class="title">Увы и ах!</h2>
          <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
          <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
        </section>
      `;
    }

    return template;
  }

  onClick() { }

  bind() {
    const playAgainButton = this.element.querySelector(`.main-replay`);
    playAgainButton.addEventListener(`click`, this.onClick);
  }
}
