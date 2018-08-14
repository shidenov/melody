import {createScreenElement} from './kernel';

/* content template genre */
export const genreTemplate = (game) => {
  const answers = [];
  for (let i = 0; game.answers.length > i; i++) {
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

  let wrap = `
  <div class="main-wrap">
    <h2 class="title">${game.title}</h2>
    <form class="genre">
      ${answers.join(``)}
      <button class="genre-answer-send" type="submit">Ответить</button>
    </form>
  </div>
  `;

  wrap = createScreenElement(wrap);
  const players = wrap.querySelectorAll(`.player`);

  // audio
  const audioTracks = [];
  game.answers.forEach((answer, i) => {
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

  return wrap;
};
