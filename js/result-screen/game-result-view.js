import AbstractView from '../abstract-view';
import {ResultGame} from '../data/game-data';

const templates = {
  [ResultGame.WIN]: (data) => `
    <section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
      <h2 class="title">Вы настоящий меломан!</h2>
      <div class="main-stat">${data.time}
        <br>вы&nbsp;набрали ${data.score} баллов (${data.totalFast} быстрых)
        <br>совершив ${data.lives}</div>
      <span class="main-comparison">Подождите, загружаем результаты!</span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`,

  [ResultGame.NOLIVES]: () => `
    <section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
      <h2 class="title">Какая жалость!</h2>
      <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
      <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
    </section>
    `,

  [ResultGame.TIMEOUT]: () => `
    <section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
      <h2 class="title">Увы и ах!</h2>
      <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
      <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
    </section>
  `
};

export default class ResultView extends AbstractView {
  constructor(game) {
    super();
    this.game = game;
  }

  get template() {
    return templates[this.game.status](this.game);
  }

  onClick() { }

  bind() {
    const replayButtonElement = this.element.querySelector(`.main-replay`);
    replayButtonElement.addEventListener(`click`, this.onClick);

    this.scoresElement = this.element.querySelector(`.main-comparison`);
  }
}
