import AbstractView from './abstract-view';

export default class ArtistView extends AbstractView {
  constructor(game) {
    super();
    this.game = game;
  }

  get template() {
    const answers = [];
    for (let i = 0; i < this.game.answers.length; i++) {
      const item = `
      <div class="main-answer-wrapper">
        <input class="main-answer-r" type="radio" id="answer-${i}" name="answer" value="val-${i}"/>
        <label class="main-answer" for="answer-${i}">
          <img class="main-answer-preview" src="${this.game.answers[i].image}" alt="${this.game.answers[i].artist}" width="134" height="134">
          ${this.game.answers[i].artist}
        </label>
      </div>
    `;
      item.trim();
      answers.push(item);
    }

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

  onResult() {
  }

  bind() {
    const player = this.element.querySelector(`.player`);
    const track = new Audio(this.game.correct[0].src);
    player.appendChild(track);
    track.autoplay = true;

    const buttonControl = this.element.querySelector(`.player-control`);
    buttonControl.addEventListener(`click`, (event) => {
      const target = event.target;

      if ([...target.classList].indexOf(`player-control--pause`) !== -1) {
        target.classList.remove(`player-control--pause`);
        target.classList.add(`player-control--play`);
        track.pause();
      } else {
        target.classList.remove(`player-control--play`);
        target.classList.add(`player-control--pause`);
        track.play();
      }
    });

    const inputItems = this.element.querySelectorAll(`input`);
    for (let input of inputItems) {
      input.addEventListener(`click`, (event) => {
        const target = event.target;
        const currentAnswerIndex = target.value.slice(target.value.length - 1, target.value.length);
        const result = this.game.answers[currentAnswerIndex].result();

        // stop audio
        this.element.querySelector(`audio`).pause();
        this.onResult(result);
      });
    }
  }
}
