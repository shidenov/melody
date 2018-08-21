import AbstractView from '../abstract-view';
import Music from '../data/music-data';
import {development} from '../main';

export default class ArtistView extends AbstractView {
  constructor(game) {
    super();
    this.game = game;
  }

  get template() {
    const answers = [];
    this.game.answers.forEach((answer, i) => {
      const status = (development) ? `<span style="color: black">${answer.result()}</span>` : ``;
      const item = `
        <div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-${i}" name="answer" value="val-${i}"/>
          <label class="main-answer" for="answer-${i}">
            <img class="main-answer-preview" src="${answer.image}" alt="${answer.artist}" width="134" height="134">
            ${answer.artist}
            ${status}
          </label>
        </div>
      `;

      item.trim();
      answers.push(item);
    });

    return `
    <section class="main main--level main--level-${this.game.gameType}">
      <div class="main-wrap">
        <h2 class="title main-title">${this.game.title}</h2>
        <div class="player-wrapper">
          <div class="player">
            <button class="player-control player-control--pause"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
            </div>
          </div>
        <form class="main-list">
        ${answers.join(``)}
        </form>
      </div>
    </section>
  `;
  }

  onResult() { }

  bind() {
    let track;
    for (let answer of this.game.answers) {
      if (answer.result()) {
        track = Music.getAudioTrack(answer.src);
        track.play();
      }
    }

    const buttonControlElement = this.element.querySelector(`.player-control`);
    buttonControlElement.addEventListener(`click`, (event) => {
      const e = event || window.event;
      const target = e.target || e.srcElement;

      track.pause();

      if ([...target.classList].indexOf(`player-control--pause`) !== -1) {
        target.classList.remove(`player-control--pause`);
        target.classList.add(`player-control--play`);
      } else {
        target.classList.remove(`player-control--play`);
        target.classList.add(`player-control--pause`);
        track.play();
      }
    });

    const inputElements = this.element.querySelectorAll(`input`);
    for (let input of inputElements) {
      input.addEventListener(`click`, (event) => {
        const e = event || window.event;
        const target = e.target || e.srcElement;

        const currentAnswerIndex = target.value.slice(target.value.length - 1, target.value.length);
        const result = this.game.answers[currentAnswerIndex].result();

        this.onResult(result);
      });
    }
  }
}
