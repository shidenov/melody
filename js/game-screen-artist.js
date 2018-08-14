
import {createScreenElement} from './kernel';

/* content template artist */
export const artistTemplate = (game) => {
  const answers = [];
  for (let i = 0; game.answers.length > i; i++) {
    const item = `
    <div class="main-answer-wrapper">
      <input class="main-answer-r" type="radio" id="answer-${i}" name="answer" value="val-${i}"/>
      <label class="main-answer" for="answer-${i}">
        <img class="main-answer-preview" src="${game.answers[i].image}" alt="${game.answers[i].artist}" width="134" height="134">
        ${game.answers[i].artist}
      </label>
    </div>
    `;

    item.trim();
    answers.push(item);
  }

  let wrap = `
  <div class="main-wrap">
    <h2 class="title main-title">${game.title}</h2>
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
  `;

  wrap = createScreenElement(wrap);

  const player = wrap.querySelector(`.player`);
  const track = new Audio(game.correct[0].src);
  player.appendChild(track);
  track.autoplay = true;

  const buttonControl = wrap.querySelector(`.player-control`);
  buttonControl.addEventListener(`click`, (event) => {
    const e = event || window.event;
    const target = e.target || e.srcElement;

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

  return wrap;
};
