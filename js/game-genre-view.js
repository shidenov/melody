import AbstractView from './abstract-view';

export default class GenreView extends AbstractView {
  constructor(game) {
    super();
    this.game = game;
  }

  get template() {
    const answers = [];
    for (let i = 0; i < this.game.answers.length; i++) {
      const item = `
      <div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <button class="player-control player-control--play"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="answer-${i}" id="a-${i}">
        <label class="genre-answer-check" for="a-${i}"></label>
      </div>
      `;
      item.trim();
      answers.push(item);
    }

    return `
      <section class="main main--level main--level-${this.game.gameType}">
        <div class="main-wrap">
          <h2 class="title">${this.game.title}</h2>
          <form class="genre">
            ${answers.join(``)}
            <button class="genre-answer-send" type="submit">Ответить</button>
          </form>
        </div>
      </section>
    `;
  }

  onResult() {}

  bind() {
    const players = this.element.querySelectorAll(`.player`);

    // audio
    const audioTracks = [];
    this.game.answers.forEach((answer, i) => {
      const track = new Audio(answer.src);
      audioTracks.push(track);

      players[i].insertAdjacentElement(`afterBegin`, track);
      const buttonControl = players[i].querySelector(`.player-control`);

      if (i === 0) {
        track.autoplay = true;
        buttonControl.classList.remove(`player-control--play`);
        buttonControl.classList.add(`player-control--pause`);
      }

      buttonControl.addEventListener(`click`, (event) => {
        const e = event || window.event;
        const target = e.target || e.srcElement;

        // отключать все треки и включать выбранный
        audioTracks.forEach((item) => {
          if (target !== item.nextElementSibling) {
            item.nextElementSibling.classList.remove(`player-control--pause`);
            item.nextElementSibling.classList.add(`player-control--play`);
            item.pause();
          }
        });

        if ([...target.classList].indexOf(`player-control--pause`) !== -1) {
          target.classList.remove(`player-control--pause`);
          target.classList.add(`player-control--play`);
          track.pause();
        } else {
          target.classList.remove(`player-control--play`);
          target.classList.add(`player-control--pause`);
          track.play();
        }

        e.preventDefault();
      });
    });

    const submitButton = this.element.querySelector(`.genre-answer-send`);
    submitButton.disabled = true;

    const resultAnswers = {};
    const answerItems = [...this.element.querySelectorAll(`.genre-answer-check`)];

    for (let item of answerItems) {
      item.addEventListener(`click`, (event) => {
        const e = event || window.event;
        const target = e.target || e.srcElement;

        const currentAnswerIndex = target.control.value.slice(target.control.value.length - 1, target.control.value.length);
        const result = this.game.answers[currentAnswerIndex].result();

        if (!target.control.checked) {
          resultAnswers[currentAnswerIndex] = result;
        } else {
          delete resultAnswers[currentAnswerIndex];
        }

        if (Object.keys(resultAnswers).length > 0) {
          submitButton.disabled = false;
        } else {
          submitButton.disabled = true;
        }
      });
    }

    submitButton.addEventListener(`click`, (e) => {
      let result = true;
      for (let key in resultAnswers) {
        if (!resultAnswers[key]) {
          result = false;
          break;
        }
      }

      this.onResult(result);

      e.preventDefault();
    });
  }
}
